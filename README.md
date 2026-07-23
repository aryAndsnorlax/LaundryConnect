# 🧺 LaundryConnect Backend

A secure and scalable RESTful backend for the **LaundryConnect** platform. This backend provides user authentication, role-based authorization, laundry order management, payment integration, and automated email notifications using modern backend technologies.

---

## 🚀 Features

- 🔐 JWT-based Authentication & Authorization
- 👥 Role-Based Access Control (Customer, Provider, Admin)
- 🧺 Laundry Order Management
- 💳 Payment Integration
- 📧 Automated Email Notifications
- 🔒 Password Hashing with bcrypt
- ☁️ MongoDB Atlas Database
- 🌐 Deployed on Render

---

## 🛠️ Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB Atlas**
- **Mongoose**
- **JWT (JSON Web Token)**
- **bcrypt**
- **Nodemailer**
- **Validator**
- **Render**

---

## 📂 Project Structure

```
LaundryConnect
│
├── config/
│   └── db.js
│
├── controllers/
│   ├── authController.js
│   ├── orderController.js
│   ├── adminController.js
│   ├── providerController.js
│   └── paymentController.js
│
├── middleware/
│   ├── authMiddleware.js
│   └── roleMiddleware.js
│
├── models/
│   ├── User.js
│   ├── Order.js
│   └── Payment.js
│
├── routes/
│   ├── authRoutes.js
│   ├── orderRoutes.js
│   ├── adminRoutes.js
│   ├── providerRoutes.js
│   └── paymentRoutes.js
│
├── utils/
│   └── sendEmail.js
│
├── .env
├── server.js
├── package.json
└── README.md
```

---

## ⚙️ Installation

### Clone the repository

```bash
git clone https://github.com/<your-username>/<repository-name>.git
```

### Navigate to the project

```bash
cd LaundryConnect
```

### Install dependencies

```bash
npm install
```

### Create a `.env` file

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
EMAIL_USER=your_email
EMAIL_PASS=your_email_app_password
```

### Start the server

Development

```bash
npm run dev
```

Production

```bash
npm start
```

---

## 🌍 Live Backend

```
https://laundryconnect-backend.onrender.com
```

---

## 🔑 Authentication

Protected APIs require a JWT token.

Example Header

```
Authorization: Bearer <JWT_TOKEN>
```

---

# 📌 API Endpoints

## Authentication

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | User Login |
| GET | `/api/auth/profile` | Get Logged-in User Profile |

---

## Orders

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/orders` | Create Laundry Order |
| GET | `/api/orders` | Get User Orders |
| GET | `/api/orders/:id` | Get Order by ID |
| PUT | `/api/orders/:id` | Update Order Status |

---

## Admin

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/admin/orders` | View All Orders |
| GET | `/api/admin/users` | View All Users |

---

## Provider

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | `/api/provider/orders` | View Assigned Orders |
| PUT | `/api/provider/orders/:id` | Update Assigned Order |

---

## Payment

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/payment` | Process Payment |

---

## 📧 Email Notifications

The backend automatically sends:

- Welcome Email after successful registration
- Order Confirmation Email
- Payment Confirmation Email

---

## 🔒 Security Features

- Password Hashing using bcrypt
- JWT Authentication
- Role-Based Authorization
- Input Validation
- Protected Routes
- Environment Variable Management

---

## 📦 HTTP Status Codes

| Code | Meaning |
|------|---------|
| 200 | Success |
| 201 | Resource Created |
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Internal Server Error |

---

## 🧪 Testing

The APIs can be tested using:

- Postman
- Thunder Client
- cURL
- REST Client

---

## 👨‍💻 Author

**Aryan Jasrotia**

Backend Developer

---

## 📜 License

This project is developed for educational and learning purposes.
