const Form = require('./Form');
const User = require('./User');
const sequelize = require('../config/db');

User.hasMany(Form, { foreignKey: 'userId', as: 'forms' }); // satu user bisa punya banyak form
Form.belongsTo(User, { foreignKey: 'userId', as: 'user' }); //setiap form dimiliki satu user


module.exports = {
  sequelize,
  User,
  Form,
};