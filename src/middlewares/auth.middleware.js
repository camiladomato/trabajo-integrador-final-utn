const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;


  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    return res.status(401).json({ status: 'fail', message: 'No estás autorizado, token no encontrado' });
  }

  try {
   
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
   
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ status: 'fail', message: 'Token inválido o expirado' });
  }
};


const restrictTo = (...roles) => {
  return (req, res, next) => {
 
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        status: 'fail', 
        message: 'No tenés permisos para realizar esta acción' 
      });
    }
    next();
  };
};

module.exports = { protect, restrictTo };