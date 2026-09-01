import { sendError } from '../utils/apiResponse.js';

export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Invalid ObjectId
  if (
    err.name === 'CastError' &&
    err.kind === 'ObjectId'
  ) {
    statusCode = 400;
    message = 'Invalid ID format';
  }

  // Mongoose validation
  if (err.name === 'ValidationError') {
    statusCode = 400;

    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(', ');
  }

  // Duplicate email / duplicate key
  if (err.code === 11000) {
    statusCode = 409;

    const field = Object.keys(err.keyValue || {})[0];

    if (field === 'email') {
      message = 'User already exists with this email';
    } else {
      message = `Duplicate value for ${field}`;
    }
  }

  // Invalid JWT
  if (err.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid authentication token';
  }

  // Expired JWT
  if (err.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Authentication token has expired';
  }

  // Authentication
  if (err.name === 'AuthenticationError') {
    statusCode = 401;
    message = 'Authentication required';
  }

  // Database error
  if (err.name === 'MongoServerError' && err.code !== 11000) {
    statusCode = 500;
    message = 'Database error';
  }

  if (process.env.NODE_ENV === 'development') {
    console.error(err);
  }

  // return sendError(
  //   res,
  //   statusCode,
  //   message,
  //   process.env.NODE_ENV === 'development'
  //     ? { stack: err.stack }
  //     : {}
  // );

  return sendError( res, statusCode, message, {} );
};

export default errorHandler;