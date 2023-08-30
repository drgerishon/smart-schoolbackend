const jwt = require('jsonwebtoken');
const dbRepo = require('../../../db/models');
const { db, jwtSecret, jwtRefreshSecret } = require('../../../config/index');
const dbConnector = require('../../../db/index');
const Joi = require('joi');
const bcryptjs = require('bcryptjs');

const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string(),
    email: Joi.string().email().required(),
    phone: Joi.string(),
    password: Joi.string().required(),
    isSuperAdmin: Joi.boolean(),
    gender: Joi.string().valid('Male', 'Female').required(),
});

// Assuming dbConnector.addSequelizeConnectionToRepoPromise is already defined
dbConnector.addSequelizeConnectionToRepoPromise(dbRepo, db)
  .catch((error) => {
    console.error("Error while setting up database connection:", error);
  });

// Define the userProvider object
let userProvider = {
    createUser: async (body) => {
      const { error } = userSchema.validate(body);
      if (error) {
        return Promise.reject(error.details[0].message);
      }
      const User = dbRepo[db.database].User;
  
      if (!User) {
        console.error("User model not found or not properly imported");
        return Promise.reject(new Error("User model not available"));
      }
      const existingUser = await User.findOne({
        where: { email: body.email },
      });
  
      if (existingUser) {
        throw new Error("User already exists with the provided email");
      }
      // Generate tokens first
      const accessToken = jwt.sign(
        { email: body.email }, // Use the provided email for the token payload
        jwtSecret,
        { expiresIn: '1h' }
      );
  
      const refreshToken = jwt.sign(
        { email: body.email }, // Use the provided email for the token payload
        jwtRefreshSecret,
        { expiresIn: '7d' }
      );
  
      // Create the user record with tokens
      return User.create({
        ...body,
        verificationToken: accessToken,
        refreshToken: refreshToken,
      })
      .then((data) => {
        console.log('User data after creation:', data);
  
        const response = {
          status: 'success',
          data: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            isSuperAdmin: data.isSuperAdmin,
            gender: data.gender,
          },
          Token: accessToken,      // jwtToken added here
          refreshToken: refreshToken, // refreshToken added here
          message: 'User created successfully.',
        };
  
        return response;
      })
      .catch((err) => {
        console.error('Error creating user:', err);
        return Promise.reject(err);
      });
    },

    loginUser : async (email, password) => {
      const User = dbRepo[db.database].User;

      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        throw new Error('User not found with the provided email');
      }
      
      const validPassword = await bcryptjs.compare(password, user.password);
      if (!validPassword) {
        throw new Error('Invalid password');
      }
      
      return user;
    },
    
    
  };
  
module.exports = userProvider;
