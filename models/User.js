"use strict";
const bcrypt = require("bcryptjs");
const validator = require("validator");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: { type: DataTypes.STRING, allowNull: false },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Email is required" },
          isEmail: { msg: "Email format is invalid!" },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Password is required" },
          len: {
            args: [6, 20],
            msg: "Password must be between 6 and 20 characters",
          },
        },
      },
      role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
      },
    },
    {
      timestamps: true,
      hooks: {
        // Hook sebelum user dibuat
        beforeCreate: async (user) => {
          if (user.password) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
        // Hook sebelum user diupdate
    beforeUpdate: async (user) => {
      if (user.changed('password')) { // Hanya hash password jika diubah
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
      },
    }
  );

  // Method untuk verifikasi password
  User.prototype.matchPassword = async function (enteredPassword) {
    // Membandingkan password yang dimasukkan dengan password yang di-hash
    return await bcrypt.compare(enteredPassword, this.password);
  };
  User.associate = (models) => {
    User.hasMany(models.Form, { foreignKey: "userId", as: "forms" });
  };

  return User;
};
