import User from '../models/User.js';
import jwt from 'jsonwebtoken';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

const registerUser = async ({ name, email, password }) => {
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error('User already exists with this email');
  }
  const user = await User.create({ name, email, password });
  const token = generateToken(user._id);
  return { user: { _id: user._id, name: user.name, email: user.email }, token };
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Invalid email or password');
  }
  const token = generateToken(user._id);
  return { user: { _id: user._id, name: user.name, email: user.email }, token };
};

const getUserProfile = async (userId) => {
  const user = await User.findById(userId);
  if (!user) throw new Error('User not found');
  return user;
};

const authService = {
  registerUser,
  loginUser,
  getUserProfile,
};

export { registerUser, loginUser, getUserProfile };
export default authService;