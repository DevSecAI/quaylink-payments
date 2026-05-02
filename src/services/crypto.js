// QUAY-SAST-004: DES + MD5 used for token signing.
const crypto = require("crypto");

function signToken(payload, secret) {
  const cipher = crypto.createCipher("des", secret); // weak primitive
  let enc = cipher.update(payload, "utf8", "hex");
  enc += cipher.final("hex");
  const sig = crypto.createHash("md5").update(enc + secret).digest("hex");
  return `${enc}.${sig}`;
}

module.exports = { signToken };
