# Auth & Transaction API

A simple backend REST API built with Node.js and Express that implements
JWT-based authentication and basic transaction logic.

This project focuses on backend fundamentals such as:
- Authentication & authorization
- Layered architecture (Repository, Service, Controller)
- PostgreSQL with raw SQL
- Middleware-based security

---

## Tech Stack

- Node.js
- Express.js
- PostgreSQL
- JWT (jsonwebtoken)
- bcrypt
- dotenv

---

## Project Structure

```
src/
├── controllers/     # Handle HTTP requests & responses
├── services/        # Business logic
├── repositories/    # Database queries (raw SQL)
├── routes/          # API routes
├── middlewares/     # Auth middleware (JWT)
├── config/          # Database configuration
├── app.js
└── server.js
```

---

## Authentication Flow

1. User registers with email and password
2. Password is hashed using bcrypt
3. User logs in and receives a JWT token
4. Token is sent via Authorization header
5. Protected routes use auth middleware to verify token

---

## API Endpoints

### Auth
- POST /auth/register
- POST /auth/login
- GET  /auth/me (protected)

### Orders (protected)
- POST /orders
- GET  /orders

---

## Authorization

Protected endpoints require a valid JWT token sent in the request header:

```
Authorization: Bearer <token>
```

---

## Environment Variables

Create a `.env` file in the root directory:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=auth_transaction_db
JWT_SECRET=your_secret_key
```

---

## How to Run

1. Install dependencies
```
npm install
```

2. Run database schema manually (SQL)

3. Start the server
```
npm run dev
```

---

## Project Goal

This project was built as a learning project to strengthen backend
fundamentals, especially authentication, authorization, and transaction
handling using raw SQL.
