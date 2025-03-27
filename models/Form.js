"use strict";
const { DataTypes } = require("sequelize");
const validator = require("validator");

module.exports = (sequelize) => {
  const Form = sequelize.define(
    "Form",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Name is required" },
          isFullName(value) {
            if (!/^[a-zA-Z\s]+$/.test(value)) {
              throw new Error(
                "Name must be a sentence with spaces, no numbers or special characters, just full name"
              );
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Email is required" },
          isEmail(value) {
            if (!validator.isEmail(value)) {
              throw new Error("Email is not valid");
            }
          },
        },
      },
      subject: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Subject is required" },
          len: {
            args: [3, 100],
            msg: "Subject must be between 3 and 100 characters",
          },
        },
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Message is required" },
          len: {
            args: [10, 1000],
            msg: "Message must be between 10 and 1000 characters",
          },
          isClean(value) {
            const bannedWords = [
              "spam",
              "scam",
              "fraud",
              "http",
              "<script",
              "<iframe",
              "drop table",
              "--",
            ];
            const lower = value.toLowerCase();

            for (const word of bannedWords) {
              if (lower.includes(word)) {
                throw new Error(`Message contains unsafe content: "${word}"`);
              }
            }
          },
        },
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Users", // Sesuai dengan nama tabel Users di database
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      status: {
        type: DataTypes.ENUM("pending", "in-progress", "resolved"),
        defaultValue: "pending",
      },
    },
    { timestamps: true }
  );

  Form.associate = (models) => {
    Form.belongsTo(models.User, { foreignKey: "userId", as: "user" });
  };

  return Form;
};