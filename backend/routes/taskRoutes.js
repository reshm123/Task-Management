import express from 'express';
import {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getDashboardStats,updateTaskStatus,updateTaskPriority,setDueDate
} from '../controllers/taskController.js';
import { validateTask } from '../validators/taskValidator.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect); // Secure all task routes

router.get('/dashboard', getDashboardStats);
router.route('/').post(validateTask, createTask).get(getTasks);
router.route('/:id').get(getTaskById).put(validateTask, updateTask).delete(deleteTask);
router.patch('/:id/status', updateTaskStatus);
router.patch('/:id/priority', updateTaskPriority);
router.patch('/:id/due-date', setDueDate);


export default router;