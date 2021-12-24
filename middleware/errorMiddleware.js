const AppError = require('../utils/AppError')

const sendErrorDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

const sendErrorProd = (err, res) => {
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  } else {
    console.error(err);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error!',
    });
  }
};

const handleApiError = (err) => {
    return new AppError(err.message, err.cod)
}

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || 'error';
  if(err.response.data.cod === '404') err = handleApiError(err.response.data, res)
  if (process.env.NODE_ENV === 'DEVELOPMENT') {
    sendErrorDev(err, res);
  } else if (process.env.NODE_ENV === 'PRODUCTION') {
    sendErrorProd(err, res);
  }
};