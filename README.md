# Auth & Transaction API

Backend REST API menggunakan Node.js dan Express dengan fitur Authentication, Authorization (USER & ADMIN),
serta Transaction management. Project ini dibuat dengan fokus pada clean architecture dan best practice backend.

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
├── controllers/
├── services/
├── repositories/
├── routes/
├── middlewares/
│   ├── authMiddleware.js
│   └── authorizeRole.js
├── config/
├── app.js
└── server.js
```

---

## Database Schema (PostgreSQL)

### Enum
```sql
CREATE TYPE user_role AS ENUM ('USER', 'ADMIN');
CREATE TYPE order_status AS ENUM ('PENDING', 'SUCCESS', 'FAILED');
```

### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(100) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  role user_role NOT NULL DEFAULT 'USER',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

### Orders Table
```sql
CREATE TABLE orders (
  id SERIAL PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES users(id),
  amount NUMERIC NOT NULL,
  status order_status NOT NULL DEFAULT 'PENDING',
  created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);
```

---

## Authentication Flow
1. Register user (password di-hash)
2. Login → JWT token
3. Token dikirim via Authorization header
4. Middleware validasi JWT
5. Role-based access (ADMIN / USER)

---

## Middleware

### Auth Middleware
- Validasi JWT
- Inject user ke `req.user`

### Admin Middleware
- Pastikan `req.user.role === 'ADMIN'`
- Digunakan untuk endpoint terbatas

---

## API Endpoints

### Auth
- POST `/auth/register`
- POST `/auth/login`
- GET `/auth/me` (protected)

### Orders 
- POST `/orders` (USER)
- GET `/orders` (USER)
- GET `/orders/all` (ADMIN)

---

## Authorization Header
```
Authorization: Bearer <token>
```

---

## Environment Variables
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_password
DB_NAME=auth_transaction_db
JWT_SECRET=your_secret_key
```

---

## How to Run
```bash
npm install
npm run dev
```

---

## Project Goal
Project ini dibuat untuk menunjukkan pemahaman backend fundamental:
- Auth & Authorization
- Database enum & relational design
- Clean architecture
- Middleware security

---

## Project Status

✅ Authentication & Authorization (Completed)
- Register & Login
- JWT-based authentication
- Role-based authorization (USER & ADMIN)

🕒 Transaction / Orders Module (Planned)
- Create order
- Get user orders
- Get all orders (ADMIN only)
- Order status management (PENDING / SUCCESS / FAILED)

> Orders module akan ditambahkan pada update berikutnya sebagai pengembangan lanjutan.

---

## 👤 Author

Rifqi Pratama