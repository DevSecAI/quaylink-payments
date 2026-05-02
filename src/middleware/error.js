// QUAY-SAST-010: full stack trace echoed to client in error responses.
module.exports = function errorHandler(err, _req, res, _next) {
  const status = err.status || 500;
  res.status(status).json({
    error: err.message,
    stack: err.stack,           // leaked to client
    cause: err.cause || null,
  });
};
