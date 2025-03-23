const Form = require("./Form");
const User = require("./User");
const sequelize = require("../config/db");

User.hasMany(Form, { foreignKey: "userId", as: "forms" }); // satu user bisa punya banyak form
Form.belongsTo(User, { foreignKey: "userId", as: "user" }); //setiap form dimiliki satu user


// Fungsi untuk menyinkronkan semua model dengan database
const syncDatabase = async () => {
    try {
      // Mencoba menghubungkan ke database
      await sequelize.authenticate();
      console.log('Database connection has been established successfully.');
      
      // Menyinkronkan semua model dengan database
      // force: true -> akan menghapus tabel yang sudah ada (development)
      // force: false -> tidak menghapus tabel yang sudah ada (production)
      // alter: true -> mengubah struktur tabel sesuai dengan model
      await sequelize.sync({ force: false });
      console.log('All models were synchronized successfully.');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  };
  
 
module.exports = {
  sequelize,
  User,
  Form,
  syncDatabase
};