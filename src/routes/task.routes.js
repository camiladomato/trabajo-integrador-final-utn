const express = require('express');
const router = express.Router();
const taskController = require('../controllers/task.controller');
const validateSchema = require('../middlewares/validate.middleware');
const { createTaskSchema } = require('../schemas/task.schema');
const { protect, restrictTo } = require('../middlewares/auth.middleware');

router.use(protect); 

router.route('/')
  .get(restrictTo('user'), taskController.getMyTasks)
  .post(restrictTo('user'), validateSchema(createTaskSchema), taskController.createTask);

router.route('/:id')
  .patch(restrictTo('user'), taskController.updateTask)
  .delete(restrictTo('user'), taskController.deleteTask);

router.get('/all', restrictTo('admin'), taskController.getAllTasksAdmin);
router.delete('/admin/:id', restrictTo('admin'), taskController.deleteTaskAdmin);

module.exports = router;