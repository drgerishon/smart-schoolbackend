const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/index');

const validateToken = (req, res, next) => {
    const accessToken = req.cookies['accessToken'];

    if (!accessToken) {
      return res.status(401).send('Access denied. No token provided.');
    }
    
    try {
        const decoded = jwt.verify(accessToken, jwtSecret);
        req.user = decoded;
        next();
    } catch (error) {
        // console.log('Verification error:', error);
        res.status(400).send('Invalid token. Please login');
    }
    
  };

  module.exports = validateToken