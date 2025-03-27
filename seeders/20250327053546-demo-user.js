"use strict";
const bcrypt = require('bcryptjs');

module.exports = {
  
  async up(queryInterface, Sequelize) {
    const hashedPassword = await bcrypt.hash('admin123',10);
    await queryInterface.bulkInsert("Users", [
      {
        id: "123e4567-e89b-12d3-a456-426614174000", // UUID statis untuk admin
        name: "John Doe",
        email: "johndoe@example.com",
        password: hashedPassword,
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "223e4567-e89b-12d3-a456-426614174001", // UUID statis untuk user
        name: "User",
        email: "user@example.com",
        password: hashedPassword,
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
