const bcryptjs = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User', // Use uppercase here
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'comment',
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: true,
        comment: 'comment',
      },
      email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        comment: 'comment',
      },
      phone: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: 'comment',
      },
      isSuperAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        comment: 'comment',
      },
      gender: {
        type: DataTypes.ENUM({
          values: ['Male', 'Female'],
        }),
        allowNull: false,
        comment: 'comment',
      },
      acceptTerms: { type: DataTypes.BOOLEAN },

      verificationToken: { type: DataTypes.STRING, allowNull: false },
      refreshToken: { type: DataTypes.STRING, allowNull: false },
      verified: { type: DataTypes.DATE },
      resetToken: { type: DataTypes.STRING },
      resetTokenExpires: { type: DataTypes.DATE },
      passwordReset: { type: DataTypes.DATE },
    },
    {
      timestamps: true,
      sequelize,
      modelName: 'User',
    }
  );
  User.beforeCreate(async (user) => {
    // Hash the password using bcrypt
    const hashedPassword = await bcryptjs.hash(user.password, 10);
    user.password = hashedPassword;
  });

  User.associate = function (models) {
    // ... associations ...
  };

  return User;
};
