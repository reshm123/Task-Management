import authService from '../services/authService.js';
import { sendSuccess, sendError } from '../utils/apiResponse.js';

const register = async (req, res, next) => {
  try {
    console.log(req.body)
    const result = await authService.registerUser(req.body);
    return sendSuccess(res, 201, 'User registered successfully', result);
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);
    return sendSuccess(res, 200, 'Login successful', result);
  } catch (error) {
    res.status(401);
    next(error);
  }
};

const getProfile = async (req, res, next) => {
  try {
    const user = await authService.getUserProfile(req.user.id);
    return sendSuccess(res, 200, 'Profile fetched successfully', user);
  } catch (error) {
    next(error);
  }
};

const logout = async (req, res) => {
  return sendSuccess(
    res,
    200,
    'Logout successful',
    {}
  );
};

export { register, login, getProfile,logout };