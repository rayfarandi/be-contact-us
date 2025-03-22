const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const validator = require('validator');

const Form = sequelize.define('Form', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate:{
      notEmpty:{ // Validasi name tidak boleh kosong dari squelize
        msg:"Name is required"
      },
      isFullName(value){ // Validasi name harus mengandung huruf dan spasi [full name]
        if(!/^[a-zA-Z\s]+$/.test(value)){
          throw new Error("Name must be a sentence with spaces, no numbers or special characters, just full name");
        }
      }
    }
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty:{ // Validasi email tidak boleh kosong dari squelize
        msg:"Email is required"
      },
      isEmail(value){ // Validasi email harus valid dengan validator
        if(!validator.isEmail(value)){
          throw new Error("Email is not valid");
        }
      }
    }
  },
  subject: { // berisi subjek dari form[kerjasama, pemesanan, dll]
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty:{ // Validasi subject tidak boleh kosong dari squelize
        msg:"Subject is required"
      },
      len:{
        args: [3, 100],
        msg: "Subject must be between 3 and 100 characters"
      }
    }
  },
  message: { // validasi message mencegah spam
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty:{
        msg:"Message is required"
      },
      isClean(value){ // Validasi message mencegah spam
        const bannedWords = ['spam', 'scam', 'fraud', 'http','<script','<iframe','drop table','--'];
        const lower = value.toLowerCase();

        for(const word of bannedWords) { // jika message mengandung kata spam di atas
          if(lower.includes(word)){
            throw new Error(`Message contain unsafe content : "${word}"`);
          }
        }
        if (value.length > 1000) { // Jika message lebih dari 1000 karakter
          throw new Error("Message must be less than 1000 characters");
        }
      },
      len: {
        args: [10, 1000],
        msg: "Message must be between 10 and 1000 characters"
      }
    }
  },
  status: {
    type: DataTypes.ENUM('pending', 'in-progress', 'resolved'),
    defaultValue: 'pending'
  }
}, {
  timestamps: true
});

module.exports = Form;