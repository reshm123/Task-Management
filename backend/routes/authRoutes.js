
import express from 'express';
import { register, login, getProfile,logout } from '../controllers/authController.js';
import { validateRegister, validateLogin } from '../validators/authValidator.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', validateRegister, register);
router.post('/login', validateLogin, login);
router.get('/profile', protect, getProfile);
router.post('/logout', protect, logout);

export default router;