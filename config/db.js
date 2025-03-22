const { Sequelize } = require('sequelize'); // Import Sequelize dari package sequelize
require('dotenv').config(); // Import dotenv

// Konfigurasi koneksi ke database
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,                   // Maksimum koneksi dalam pool
      min: 0,                   // Minimum koneksi dalam pool
      acquire: 30000,           // Waktu maksimum (ms) mencoba mendapatkan koneksi
      idle: 10000               // Waktu maksimum (ms) koneksi bisa idle sebelum dilepas
    }
  }
);

// Tes koneksi saat aplikasi di-load
sequelize
  .authenticate()
  .then(() => {
    console.log('Database connection established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = sequelize;