const express = require("express");
const bodyParser = require("body-parser");

const intents = require("./routes/intents");
const webhooks = require("./routes/webhooks");
const admin = require("./routes/admin");
const errorHandler = require("./middleware/error");

const app = express();
app.use(bodyParser.json({ limit: "1mb" }));

app.get("/healthz", (_req, res) => res.json({ ok: true }));
app.use("/intents", intents);
app.use("/webhooks", webhooks);
app.use("/internal/admin", admin);

app.use(errorHandler);

if (require.main === module) {
  app.listen(3000, () => console.log("quaylink-payments listening on :3000"));
}

module.exports = app;
