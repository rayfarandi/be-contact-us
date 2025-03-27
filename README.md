# 📬 Contact Form API

This is a RESTful Contact Form API built with **Node.js 14**, **Express.js**, **Sequelize ORM**, **JWT authentication**, and **role-based access control**.
Users can register, log in, and submit contact messages. Admin users can view and manage all messages.

---

## 📦 Features

- ✅ User Registration and Login (with JWT authentication)
- 🔐 Role-based access control (`user`, `admin`)
- 📨 Contact form submission by authenticated users
- 👀 Admin access to view and update form statuses
- 🧾 Sequelize ORM for PostgreSQL, MySQL, or SQLite
- 🔄 Auto password hashing with bcrypt
- 🌍 CORS and environment variable support
- 🧾 Request logging using `morgan`
- 🧪 API tested via Postman

---

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/contact-form-api.git
cd contact-form-api
```
 
 ## Install Dependencies
 ```bash
 npm install
```
 
## Create `.env` File
 
 #### Create a .env file in the root directory and fill in your environment variables:
 
 ```
# Database Configuration
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD="your pass db"
DB_NAME=sequelize "name on your DB"
DB_HOST=localhost

# Server Configuration
PORT=3001


# JWT Secret
JWT_SECRET="test"
JWT_EXPIRE=1d

 ```
 
 ## Run Migrations or Sync Models
 ```
Create Db first, name is "sequelize"

Run on your terminal project
node seed.js
```
 
 ### If you're using Sequelize sync:
 
 ```
 await sequelize.sync({ force: false }); // in index.js
 ```
### Or, if you're using Sequelize CLI:
 ```
 npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

 ```
 ## Start the Server
 
 ```
npm start

```

## 🛠️ API Endpoints
 🔐 Auth Routes

 | Method | Endpoint     | Description                |
 | :-------- | :------- | :------------------------- |
 | `POST` | `/api/auth/register` | Register a new user |
 | `POST` | `/api/auth/login` | Login and receive JWT |
 | `GET` | `/api/auth/me` | Get current user info (protected) |


## 📬 Form Routes


 | Method | Endpoint     | Description                | Endpoint     |
 | :-------- | :------- | :------------------------- | :------- 
 | `POST` | `/api/forms` | Submit a new contact form |Auth User|
 | `GET` | `/api/forms` | Login and receive JWT |Admin|
 | `GET` | `/api/forms/mine` | Get current user’s submitted forms |Auth User|
 | `PATCH` | `/api/forms/:id` | Update form status (e.g. approve) |Admin|
 | `DELETE` | `/api/forms/:id` | Delete a form |Admin|

 ## 👥 User Roles
- User: Can register, log in, and submit/view their own forms.
- Admin: Can view, update, and delete all user forms.

## 🧰 Tech Stack
- Node.js + Express.js
- Sequelize ORM
- PostgreSQL / MySQL / SQLite
- JWT for Authentication
- bcryptjs for Password Hashing
- morgan for Request Logging
- dotenv for Config Management

## 📂 Project Structure
```
.
├── controllers/
│   ├── authController.js
│   └── formController.js
├── models/
│   ├── index.js
│   ├── User.js
│   └── Form.js
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
├── routes/
│   ├── authRoutes.js
│   └── formRoutes.js
├── config/
│   └── db.js
├── .env
├── server.js
├── seed.js
└── README.md
```
## 🔒 Authorization
Make sure to add the JWT token as a Bearer Token in your Postman headers:
```
Authorization: Bearer <your_token_here>
```

## Contributing

Contributions are always welcome!

## Authors

- [@rayfarandi](https://github.com/rayfarandi)

## Feedback

If you have any feedback, please reach out to us at rayfarandi1994@gmail.com
