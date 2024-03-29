const notFound = (req, res, next) => {
  const error = new Error("Nor found ${req.originUrl");
  next(error);
};

const errorHandler = (error, req, res, next) => {
  const statusCode = (res.statusCode = 200 ? 500 : res.statusCode);
  res.status(statusCode);
  res.json({
    msg: error.message,
    stack: process.env.NODE_ENV === "production" ? "err" : error.stack,
  });
};

module.exports = {
  notFound,
  errorHandler,
};
