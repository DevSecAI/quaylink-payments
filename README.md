# Quaylink Payments

> ⚠️ **ARKO Benchmark Application — contains intentional vulnerabilities. Do not deploy.**

Card-not-present payment intent service for the (fictional) **Quaylink** payment facilitator. Part of the [ARKO Coverage Benchmarks](https://github.com/DevSecAI/arko-benchmarks) suite.

Stack: Node 20 · Express 4 · Postgres · AWS (Terraform) · Kubernetes.

## What this app pretends to do

- Issue payment intents and capture authorisations (`/intents`)
- Receive webhooks from upstream acquirers (`/webhooks/acquirer`)
- Provide a merchant-facing reporting API (`/merchants/:id/transactions`)
- Expose an internal console for ops users (`/internal/admin`)

## What this app actually does

- **11 seeded SAST findings** — SQLi, command injection, NoSQL injection, prototype pollution, JWT none-alg, hardcoded secrets, weak crypto, insecure regex, open redirect, XXE, ReDoS.
- **7 seeded IaC findings** — Terraform (KMS, RDS, ALB, IAM), Dockerfile, K8s.
- **5 vulnerable npm dependencies** — historical CVEs across `lodash`, `axios`, `jsonwebtoken`, `marked`, `minimist`.
- **4 seeded GitHub Actions misconfigurations**.

See [`BENCHMARK.md`](./BENCHMARK.md) for the full inventory.

## Regulatory frameworks exercised

- **PCI DSS 4.0** Requirements 3, 4, 6, 8
- **SOC 2** CC6.1, CC6.6, CC7.2

## Running a scan

```bash
arko scan --tenant=benchmarks --report=json > report.json
arko benchmark verify --expected=benchmark.yaml --actual=report.json
```
