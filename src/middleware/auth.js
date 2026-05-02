// QUAY-SAST-006: JWT alg=none accepted because verify is called with no algorithms allowlist.
const jwt = require("jsonwebtoken");
const { hmacSecret } = require("../config");

function authMiddleware(req, _res, next) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return next();

  try {
    // QUAY-SAST-006: no `algorithms` option — `none` is accepted in jsonwebtoken@8.5.1.
    const decoded = jwt.verify(token, hmacSecret);
    req.user = decoded;
  } catch {
    /* swallowed */
  }
  next();
}

module.exports = authMiddleware;
