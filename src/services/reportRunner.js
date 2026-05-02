// QUAY-SAST-002: command injection via child_process.exec.
const { exec } = require("child_process");

function runDailyReport(merchantId, date) {
  return new Promise((resolve, reject) => {
    // QUAY-SAST-002: merchantId and date interpolated unquoted into shell.
    exec(
      `/opt/quaylink/bin/run-report --merchant=${merchantId} --date=${date}`,
      (err, stdout, stderr) => {
        if (err) return reject(stderr || err);
        resolve(stdout);
      },
    );
  });
}

module.exports = { runDailyReport };
