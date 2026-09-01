import Task from '../models/Task.js';
import mongoose from 'mongoose';

const createTask = async (userId, data) => {
  return await Task.create({ ...data, userId });
};

const getTasks = async (userId, query) => {
  const { page = 1, limit = 10, status, priority, search, sortBy = 'dueDate', order = 'asc' } = query;

  const filter = { userId: new mongoose.Types.ObjectId(userId) };

  if (status) filter.status = status;
  if (priority) filter.priority = priority;
  if (search) {
    filter.title = { $regex: search, $options: 'i' };
  }

  const pageNum = parseInt(page, 10);
  const limitNum = parseInt(limit, 10);
  const skip = (pageNum - 1) * limitNum;
  const sortOrder = order === 'desc' ? -1 : 1;

  const tasks = await Task.find(filter)
    .sort({ [sortBy]: sortOrder })
    .skip(skip)
    .limit(limitNum);

  const totalTasks = await Task.countDocuments(filter);

  return {
    tasks,
    pagination: {
      total: totalTasks,
      page: pageNum,
      limit: limitNum,
      totalPages: Math.ceil(totalTasks / limitNum),
    },
  };
};

const getTaskById = async (userId, taskId) => {
  const task = await Task.findOne({ _id: taskId, userId });
  if (!task) throw new Error('Task not found');
  return task;
};

const updateTask = async (userId, taskId, data) => {
  const task = await Task.findOneAndUpdate({ _id: taskId, userId }, data, {
    new: true,
    runValidators: true,
  });
  if (!task) throw new Error('Task not found');
  return task;
};

const deleteTask = async (userId, taskId) => {
  const task = await Task.findOneAndDelete({ _id: taskId, userId });
  if (!task) throw new Error('Task not found');
  return task;
};

const getDashboardStats = async (userId) => {
  const userObjectId = new mongoose.Types.ObjectId(userId);
  const now = new Date();

  const stats = await Task.aggregate([
    { $match: { userId: userObjectId } },
    {
      $group: {
        _id: null,
        totalTasks: { $sum: 1 },
        pendingTasks: { $sum: { $cond: [{ $eq: ['$status', 'Pending'] }, 1, 0] } },
        inProgressTasks: { $sum: { $cond: [{ $eq: ['$status', 'In Progress'] }, 1, 0] } },
        completedTasks: { $sum: { $cond: [{ $eq: ['$status', 'Completed'] }, 1, 0] } },
        overdueTasks: {
          $sum: {
            $cond: [
              { $and: [{ $ne: ['$status', 'Completed'] }, { $lt: ['$dueDate', now] }] },
              1,
              0,
            ],
          },
        },
      },
    },
  ]);

  return (
    stats[0] || {
      totalTasks: 0,
      pendingTasks: 0,
      inProgressTasks: 0,
      completedTasks: 0,
      overdueTasks: 0,
    }
  );
};

const taskService = {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getDashboardStats,
};

export {
  createTask,
  getTasks,
  getTaskById,
  updateTask,
  deleteTask,
  getDashboardStats,
};

export default taskService;