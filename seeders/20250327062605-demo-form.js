"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Forms", [
      {
        id: "323e4567-e89b-12d3-a456-426614174002",
        name: "user",
        email: "user@example.com",
        subject: "Kerjasama",
        message: "Saya ingin bekerja sama dengan perusahaan Anda.",
        userId: "223e4567-e89b-12d3-a456-426614174001", // ID User yang sudah dibuat
        status: "pending",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: "423e4567-e89b-12d3-a456-426614174003",
        name: "user",
        email: "user@example.com",
        subject: "Pemesanan",
        message: "Saya ingin memesan produk dari perusahaan Anda.",
        userId: "123e4567-e89b-12d3-a456-426614174000", // ID Admin
        status: "in-progress",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Forms", null, {});
  },
};
