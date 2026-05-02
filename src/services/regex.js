// QUAY-SAST-009: ReDoS — catastrophic backtracking on adversarial input.
const SUSPICIOUS_HOST = /^(([a-z]+)+\.)+[a-z]+$/;

function isSuspiciousHost(host) {
  return SUSPICIOUS_HOST.test(host);
}

module.exports = { isSuspiciousHost };
