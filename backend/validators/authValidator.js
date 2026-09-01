import { sendError } from '../utils/apiResponse.js';

const validateRegister = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return sendError(res, 400, 'Please provide all required fields: name, email, password');
  }
  if (password.length < 6) {
    return sendError(res, 400, 'Password must be at least 6 characters long');
  }
  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return sendError(res, 400, 'Please provide both email and password');
  }
  next();
};

export { validateRegister, validateLogin };