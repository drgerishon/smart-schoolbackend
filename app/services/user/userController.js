const responder = require('../../../utils/responder');
const userService = require('./userService');

const userController = {
  createUser: async (request, response, next) => {
    try {
      const body = request.body;
      const userResponse = await userService.createUser(body);

      responder.sendResponse(
        response,
        200,
        'success',
        { userResponse },
        'User created successfully.'
      );
    } catch (error) {
      if (error.message === "User already exists with the provided email") {
        return responder.sendResponse(
          response,
          400,
          'error',
          null,
          'User already exists with the provided email.'
        );
      }
      return next(error);
    }
  },
  loginUser : async (req, res) => {
    try {
      const { email, password } = req.body;
      const { user, accessToken, refreshToken } = await userService.loginUser(email, password);
      

      const userData = {
        email: user.email,
        // ... other non-sensitive fields
      };

      
      // Set tokens as cookies
      res.cookie('accessToken', accessToken, {
        expires: new Date(Date.now() + 3600000), // 1 hour
        httpOnly: true,
        secure: true // set to true if your app is running on HTTPS
      });
  
      res.cookie('refreshToken', refreshToken, {
        expires: new Date(Date.now() + 7 * 24 * 3600000), // 7 days
        httpOnly: true,
        secure: true // set to true if your app is running on HTTPS
      });
  
      res.status(200).json({ status: 'success', user: userData, message: 'User logged in successfully' });  
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
  
};

module.exports = userController;
