# Quaylink — Seeded Findings Inventory

Total: **27 findings** (11 SAST + 7 IaC + 5 SCA + 4 pipeline).

## SAST (11)

| ID | CWE | File | Severity | Description |
|---|---|---|---|---|
| QUAY-SAST-001 | CWE-89  | `src/routes/intents.js` | High | SQL injection — string concat into pg query |
| QUAY-SAST-002 | CWE-78  | `src/services/reportRunner.js` | High | Command injection via `child_process.exec` on user input |
| QUAY-SAST-003 | CWE-798 | `src/config.js` | Critical | Hardcoded HMAC and DB password |
| QUAY-SAST-004 | CWE-327 | `src/services/crypto.js` | Medium | DES/MD5 used for token signing |
| QUAY-SAST-005 | CWE-1321| `src/services/merge.js` | High | Prototype pollution via recursive merge |
| QUAY-SAST-006 | CWE-347 | `src/middleware/auth.js` | High | JWT `alg: none` accepted |
| QUAY-SAST-007 | CWE-918 | `src/routes/webhooks.js` | High | SSRF via `axios.get` on user URL |
| QUAY-SAST-008 | CWE-601 | `src/routes/intents.js` | Medium | Open redirect on `?next=` |
| QUAY-SAST-009 | CWE-1333| `src/services/regex.js` | Medium | Catastrophic backtracking ReDoS |
| QUAY-SAST-010 | CWE-200 | `src/middleware/error.js` | Low | Stack trace leaked in error response |
| QUAY-SAST-011 | CWE-352 | `src/routes/admin.js` | High | No CSRF protection on state-changing routes |

## IaC (7)

| ID | Class | File | Severity | Description |
|---|---|---|---|---|
| QUAY-IAC-001 | KMS misconfig    | `infra/terraform/kms.tf`         | High   | Customer-managed key allows `kms:*` from `*` |
| QUAY-IAC-002 | RDS misconfig    | `infra/terraform/rds.tf`         | High   | RDS `iam_database_authentication_enabled=false`, plain auth |
| QUAY-IAC-003 | ALB misconfig    | `infra/terraform/alb.tf`         | Medium | Listener accepts HTTP/80 with no redirect to 443 |
| QUAY-IAC-004 | IAM misconfig    | `infra/terraform/iam.tf`         | High   | Role with `Action: *` on `Resource: *` |
| QUAY-IAC-005 | SG misconfig     | `infra/terraform/main.tf`        | High   | SG ingress 0.0.0.0/0 on 5432 |
| QUAY-IAC-006 | Container        | `Dockerfile`                     | Medium | Runs as root, uses `:latest` base, no healthcheck |
| QUAY-IAC-007 | K8s misconfig    | `infra/k8s/deployment.yaml`      | High   | `runAsNonRoot:false`, no resource limits, hostNetwork |

## SCA (5)

| ID | Package | Pinned version | CVE |
|---|---|---|---|
| QUAY-SCA-001 | `lodash`       | 4.17.15  | CVE-2020-8203 (prototype pollution) |
| QUAY-SCA-002 | `axios`        | 0.21.0   | CVE-2020-28168 (SSRF), CVE-2021-3749 (ReDoS) |
| QUAY-SCA-003 | `jsonwebtoken` | 8.5.1    | CVE-2022-23529, CVE-2022-23541 |
| QUAY-SCA-004 | `marked`       | 1.1.1    | CVE-2022-21680 (ReDoS) |
| QUAY-SCA-005 | `minimist`     | 1.2.0    | CVE-2021-44906 (prototype pollution) |

## Pipeline misconfigurations (4)

| ID | File | Severity | Description |
|---|---|---|---|
| QUAY-CI-001 | `.github/workflows/ci.yml` | Critical | Stripe API key hardcoded in env |
| QUAY-CI-002 | `.github/workflows/ci.yml` | High     | `actions/checkout@v2` (vulnerable, very old) |
| QUAY-CI-003 | `.github/workflows/ci.yml` | Medium   | `permissions:` missing |
| QUAY-CI-004 | `.github/workflows/ci.yml` | High     | `script-injection` via unquoted `${{ github.event.head_commit.message }}` in run block |
