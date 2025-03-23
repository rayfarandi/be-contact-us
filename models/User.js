const { DataTypes } = require('sequelize');
const bcrypt = require('bcryptjs');
const validator = require('validator');
const sequelize = require('../config/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
        notEmpty:{ // Validasi email tidak boleh kosong dari squelize
            msg:"Email is required"
        },
        isValidEmail(value){ // Validasi email menggunakan validator
            if(!validator.isEmail(value)){ // Jika email tidak valid
                throw new Error("Email Format Invalid!, Please add a valid email!")
            }
        }
    },
  },
  password: {
    type: DataTypes.STRING, // Tipe data string untuk password (setelah di-hash)
    allowNull: false ,// Password tidak boleh null
    validate:{ // Validasi password
        notEmpty:{ // Validasi password tidak boleh kosong dari squelize
            msg:"Password is required"
        },
        isAlphanumeric(value){ // Validasi password harus mengandung huruf dan angka
            const huruf = /[a-zA-Z]/.test(value);
            const angka = /[0-9]/.test(value);

            if (!angka || !huruf) {
                throw new Error("Password must contain at least one letter and one number");
            }
            if(!validator.isLength(value, { min: 6, max: 100 })){
                throw new Error("Password must be between 6 and 20 characters")
            }
        }
    }
  },
  role: {
    type: DataTypes.ENUM('admin', 'user'), // Menggunakan ENUM untuk membatasi nilai yang diizinkan
    defaultValue: 'user' // Default role adalah 'user'
  }
}, {
  timestamps: true, // Otomatis membuat kolom createdAt dan updatedAt
  hooks: {
    // Hook sebelum user dibuat
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await bcrypt.genSalt(10); // Generate salt dengan cost factor 10
        user.password = await bcrypt.hash(user.password, salt); // Hash password dengan salt
      }
    },
    // Hook sebelum user diupdate
    beforeUpdate: async (user) => {
      if (user.changed('password')) { // Hanya hash password jika diubah
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      }
    }
  }
});

// Method untuk verifikasi password
User.prototype.matchPassword = async function(enteredPassword) {
  // Membandingkan password yang dimasukkan dengan password yang di-hash
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = User;