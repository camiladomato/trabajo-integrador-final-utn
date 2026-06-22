const validateSchema = (schema) => (req, res, next) => {
  try {

    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params
    });
    next(); 
  } catch (error) {
    return res.status(400).json({
      status: 'fail',
      errors: error.errors.map(err => ({
        campo: err.path[1], 
        mensaje: err.message 
      }))
    });
  }
};

module.exports = validateSchema;