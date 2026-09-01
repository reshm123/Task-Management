const sendSuccess = (
  res,
  statusCode,
  message,
  data = {}
) => {
  return res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const sendError = (
  res,
  statusCode,
  message,
  error = {}
) => {
  return res.status(statusCode).json({
    success: false,
    message,
    error
  });
};

export {
  sendSuccess,
  sendError
};