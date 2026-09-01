import { sendError } from '../utils/apiResponse.js';

export const validateTask = (req, res, next) => {
  const { title, dueDate, status, priority } = req.body;

  if (req.method === 'POST' && (!title || !dueDate)) {
    return sendError(res, 400, 'Title and Due Date are required fields');
  }

  if (status && !['Pending', 'In Progress', 'Completed'].includes(status)) {
    return sendError(res, 400, 'Invalid status value');
  }

  if (priority && !['Low', 'Medium', 'High'].includes(priority)) {
    return sendError(res, 400, 'Invalid priority value');
  }

  next();
};

export default validateTask;