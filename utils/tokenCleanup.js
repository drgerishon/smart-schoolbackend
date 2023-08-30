const { dbRepo } = require('../db/models');
const { db } = require('../config/index');
const { Op } = require('sequelize');
const cron = require('node-cron');

const deleteExpiredTokens = async () => {
  const User = dbRepo[db.database].User;

  if (!User) {
    console.error('User model not found or not properly imported');
    return;
  }

  try {
    await User.destroy({
      where: {
        [Op.or]: [
          { verificationToken: { [Op.lt]: new Date() } },
          { refreshToken: { [Op.lt]: new Date() } },
        ],
      },
    });
    console.log('Expired tokens deleted successfully');
  } catch (error) {
    console.error('Error deleting expired tokens:', error);
  }
};

// Export a function to set up the scheduled task
module.exports = () => {
  // Schedule the task
  cron.schedule('0 0 * * *', () => {
    deleteExpiredTokens();
  });
};
