'use strict';
/** @type {import('sequelize').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "comment",
      },
      lastName: {
        type: Sequelize.STRING,
        allowNull: true,
        comment: "comment",
      },
      email: {
        type: Sequelize.STRING,
        allowNull: true,
        unique: true,
        comment: "comment",
      },
      phone: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        comment: "comment",
      },
      isSuperAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
        comment: "comment",
      },
      gender: {
        type: Sequelize.ENUM({
          values: ["Male", "Female"],
        }),
        allowNull: false,
        comment: "comment",
      },
      acceptTerms: { type: Sequelize.BOOLEAN },
      verificationToken: { type: Sequelize.STRING },
      refreshToken: { type: Sequelize.STRING }, //save refresh token in db to revalidate the cookie on refresh
      verified: { type: Sequelize.DATE },
      resetToken: { type: Sequelize.STRING },
      resetTokenExpires: { type: Sequelize.DATE },
      passwordReset: { type: Sequelize.DATE },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};
