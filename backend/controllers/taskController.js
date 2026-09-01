import taskService from '../services/taskService.js';
import { sendSuccess } from '../utils/apiResponse.js';

const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(req.user.id, req.body);
    return sendSuccess(res, 201, 'Task created successfully', task);
  } catch (error) {
    next(error);
  }
};

const getTasks = async (req, res, next) => {
  try {
    const result = await taskService.getTasks(req.user.id, req.query);
    return sendSuccess(res, 200, 'Tasks retrieved successfully', result);
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(req.user.id, req.params.id);
    return sendSuccess(res, 200, 'Task details retrieved successfully', task);
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(req.user.id, req.params.id, req.body);
    return sendSuccess(res, 200, 'Task updated successfully', task);
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    await taskService.deleteTask(req.user.id, req.params.id);
    return sendSuccess(res, 200, 'Task deleted successfully', {});
  } catch (error) {
    next(error);
  }
};

const getDashboardStats = async (req, res, next) => {
  try {
    const stats = await taskService.getDashboardStats(req.user.id);
    return sendSuccess(res, 200, 'Dashboard statistics fetched successfully', stats);
  } catch (error) {
    next(error);
  }
};

const updateTaskStatus = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(
      req.user.id,
      req.params.id,
      { status: req.body.status }
    );

    return sendSuccess(
      res,
      200,
      'Task status updated successfully',
      task
    );
  } catch (error) {
    next(error);
  }
};
const updateTaskPriority = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(
      req.user.id,
      req.params.id,
      { priority: req.body.priority }
    );

    return sendSuccess(
      res,
      200,
      'Task priority updated successfully',
      task
    );
  } catch (error) {
    next(error);
  }
};

const setDueDate = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(
      req.user.id,
      req.params.id,
      { dueDate: req.body.dueDate }
    );

    return sendSuccess(
      res,
      200,
      'Due date updated successfully',
      task
    );
  } catch (error) {
    next(error);
  }
};


export {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getDashboardStats,updateTaskStatus,updateTaskPriority,setDueDate
};