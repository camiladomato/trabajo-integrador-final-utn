const Task = require('../models/Task');

exports.getMyTasks = async (req, res, next) => {
  try {
   
    let query = { user: req.user.id };

    if (req.query.filter) {
      const [field, value] = req.query.filter.split(':');
      if (field && value) {
       
        query[field] = { $regex: value, $options: 'i' };
      }
    }

   
    let apiQuery = Task.find(query);

  
    if (req.query.sort) {
      const sortOrder = req.query.sort === 'desc' ? -1 : 1;
      apiQuery = apiQuery.sort({ createdAt: sortOrder });
    } else {

      apiQuery = apiQuery.sort({ createdAt: -1 });
    }

  
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    apiQuery = apiQuery.skip(skip).limit(limit);


    const tasks = await apiQuery;
    
   
    const totalTasks = await Task.countDocuments({ user: req.user.id });

    res.json({
      status: 'success',
      results: tasks.length,
      pagination: {
        totalItems: totalTasks,
        currentPage: page,
        totalPages: Math.ceil(totalTasks / limit),
        limit
      },
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};


exports.createTask = async (req, res, next) => {
  try {
    const newTask = await Task.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json({
      status: 'success',
      data: newTask
    });
  } catch (error) {
    next(error);
  }
};


exports.updateTask = async (req, res, next) => {
  try {
    const { id } = req.params;

   
    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ status: 'fail', message: 'Tarea no encontrada' });
    }

    
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ status: 'fail', message: 'No tenés permisos para editar esta tarea' });
    }

    const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
      new: true, 
      runValidators: true 
    });

    res.json({
      status: 'success',
      data: updatedTask
    });
  } catch (error) {
    next(error);
  }
};


exports.deleteTask = async (req, res, next) => {
  try {
    const { id } = req.params;

    const task = await Task.findById(id);
    if (!task) {
      return res.status(404).json({ status: 'fail', message: 'Tarea no encontrada' });
    }

   
    if (task.user.toString() !== req.user.id) {
      return res.status(403).json({ status: 'fail', message: 'No tenés permisos para eliminar esta tarea' });
    }

    await Task.findByIdAndDelete(id);

    res.json({
      status: 'success',
      message: 'Tarea eliminada correctamente'
    });
  } catch (error) {
    next(error);
  }
};



exports.getAllTasksAdmin = async (req, res, next) => {
  try {
    let apiQuery = Task.find().populate('user', 'name email role'); 

    if (req.query.sort) {
      const sortOrder = req.query.sort === 'desc' ? -1 : 1;
      apiQuery = apiQuery.sort({ createdAt: sortOrder });
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const skip = (page - 1) * limit;

    apiQuery = apiQuery.skip(skip).limit(limit);

    const tasks = await apiQuery;
    const totalTasks = await Task.countDocuments();

    res.json({
      status: 'success',
      results: tasks.length,
      pagination: { totalItems: totalTasks, currentPage: page, limit },
      data: tasks
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteTaskAdmin = async (req, res, next) => {
  try {
    const { id } = req.params;

    const deletedTask = await Task.findByIdAndDelete(id);
    if (!deletedTask) {
      return res.status(404).json({ status: 'fail', message: 'Tarea no encontrada' });
    }

    res.json({
      status: 'success',
      message: 'Tarea eliminada por el Administrador con éxito'
    });
  } catch (error) {
    next(error);
  }
};