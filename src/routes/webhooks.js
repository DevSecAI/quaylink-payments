// QUAY-SAST-007: SSRF — caller-controlled callback URL fetched server-side.
const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/acquirer", async (req, res, next) => {
  try {
    const { callbackUrl, payload } = req.body;
    // QUAY-SAST-007: arbitrary URL (callback) fetched without allowlist check.
    const echo = await axios.get(callbackUrl, { timeout: 5000 });
    res.json({ status: echo.status, payloadEcho: payload });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
