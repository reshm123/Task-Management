import jwt from 'jsonwebtoken';
import User from '../models/User.js';

const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (
      !authHeader ||
      !authHeader.startsWith('Bearer ')
    ) {
      const error = new Error('Authentication required');
      error.statusCode = 401;
      error.name = 'AuthenticationError';

      return next(error);
    }

    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const user = await User.findById(decoded.id);

    if (!user) {
      const error = new Error('User not found');
      error.statusCode = 404;

      return next(error);
    }

    req.user = user;

    next();

  } catch (error) {
    next(error);
  }
};

export default protect;