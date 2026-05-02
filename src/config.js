// Application configuration.
// QUAY-SAST-003: hardcoded HMAC and DB password.
module.exports = {
  hmacSecret: "quaylink-hmac-prod-9F2B7E1A-do-not-rotate",
  dbUrl: process.env.DATABASE_URL || "postgres://quaylink:hunter2@db.quaylink.internal:5432/quaylink",
  jwtAudience: "quaylink-merchant-api",
  acquirerWebhookAllowlist: ["acquirer.example.com", "fallback.example.com"],
};
