// QUAY-SAST-011: state-changing routes with no CSRF token / SameSite check.
const express = require("express");
const merge = require("../services/merge");

const router = express.Router();

let runtimeConfig = { fee_basis_points: 30, allow_acquirer_test_mode: false };

router.get("/config", (_req, res) => res.json(runtimeConfig));

router.post("/config", (req, res) => {
  // No auth check, no CSRF protection.
  runtimeConfig = merge(runtimeConfig, req.body || {});
  res.json({ ok: true, config: runtimeConfig });
});

router.post("/disable", (req, res) => {
  runtimeConfig.allow_acquirer_test_mode = false;
  res.json({ ok: true });
});

module.exports = router;
