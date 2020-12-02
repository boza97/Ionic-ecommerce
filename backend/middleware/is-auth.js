const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  let token = req.get('Authorization');

  if(!token) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }

  if(token.startsWith('Bearer ')) {
    token = token.slice(7, token.length);
  }
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    error.statusCode = 500;
    throw error;
  }

  if(!decoded) {
    const error = new Error('Not authenticated.');
    error.statusCode = 401;
    throw error;
  }
  
  req.user = {
    userId: decoded.userId,
    email: decoded.email,
    firstname: decoded.firstname,
    lastname: decoded.lastname,
  }
  next();
};