const userProvider = require('./userProvider');
const jwt = require('jsonwebtoken');
const { jwtSecret, jwtRefreshSecret } = require('../../../config/index');


let userService = {
  createUser: async (body) => {
    const user = await userProvider.createUser(body);
    return user;
  },
  loginUser : async (email, password) => {
    const user = await userProvider.loginUser(email, password);
  
    // Generate tokens
    const accessToken = jwt.sign(
      { email },
      jwtSecret,
      { expiresIn: '2m' }
    );
    
    const refreshToken = jwt.sign(
      { email },
      jwtRefreshSecret,
      { expiresIn: '7d' }
    );
    
    return { user, accessToken, refreshToken };
  }
};

module.exports = userService;
