const Form = require('./Form');
const User = require('./User');
const sequelize = require('../config/db');


User.hasMany(Form, { foreignKey: 'userId', as: 'forms' });
Form.belongsTo(User, { foreignKey: 'userId', as: 'user' });




module.exports = {
  sequelize,
  User,
  Form,
};