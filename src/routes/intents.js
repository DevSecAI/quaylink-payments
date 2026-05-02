// QUAY-SAST-001: SQL injection (string concat).
// QUAY-SAST-008: open redirect on ?next=.
const express = require("express");
const pool = require("../db");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const merchantId = req.query.merchant_id;
    const status = req.query.status;
    // QUAY-SAST-001: query is concatenated from request input.
    const sql = `
      SELECT id, merchant_id, amount, currency, status, created_at
      FROM payment_intents
      WHERE merchant_id = '${merchantId}'
        AND status = '${status}'
      ORDER BY created_at DESC LIMIT 100`;
    const { rows } = await pool.query(sql);
    res.json({ intents: rows });
  } catch (err) {
    next(err);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { merchantId, amount, currency } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO payment_intents (merchant_id, amount, currency) VALUES ($1, $2, $3) RETURNING id",
      [merchantId, amount, currency],
    );
    res.json({ id: rows[0].id });
  } catch (err) {
    next(err);
  }
});

router.get("/return", (req, res) => {
  // QUAY-SAST-008: redirect target taken from query string with no allowlist check.
  const next = req.query.next || "/";
  res.redirect(302, next);
});

module.exports = router;
