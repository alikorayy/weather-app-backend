# Weather App Backend

A robust backend service for a weather application that provides weather information, user authentication, and admin functionalities. Built with Node.js, Express, and TypeScript.

## 🚀 Technologies Used

- **Node.js & Express**: Backend runtime and web framework
- **TypeScript**: Programming language
- **Prisma**: ORM for database operations
- **Redis**: Caching layer for weather data
- **JWT**: Authentication
- **OpenWeather API**: Weather data provider
- **Jest**: Testing framework
- **Docker**: Containerization

## 📋 Prerequisites

### For Docker Installation (Recommended For Easy run)
- Docker
- Docker Compose

### For Local Development
- Node.js (v14 or higher)
- Redis server
- PostgreSQL database
- OpenWeather API key

## 🔧 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
PORT=5000

POSTGRES_DB=weatherdb
POSTGRES_USER=weatheruser
POSTGRES_PASSWORD=weatherpass

PGADMIN_DEFAULT_EMAIL=admin@admin.com
PGADMIN_DEFAULT_PASSWORD=admin123

DATABASE_URL=postgresql://weatheruser:weatherpass@postgres:5432/weatherdb?schema=public

JWT_SECRET=your_jwt_secret_here
OPENWEATHER_API_KEY=your_openweather_api_key_here

REDIS_URL=redis://redis:6379

```

## 🛠️ Installation

### Quick Start with Docker (Recommended For Easy run)

1. Clone the repository:
```bash
git clone https: https://github.com/alikorayy/weather-app-backend.git
cd weather-app-backend
```

2. Create the `.env` file with the required environment variables (as shown above)

3. Start the application:
```bash
docker-compose up --build
```

That's it! The application will be available at `http://localhost:5000`

### Local Development Setup

1. Clone the repository:
```bash
git clone https://github.com/alikorayy/weather-app-backend.git
cd weather-app-backend
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npx prisma migrate dev
```

4. Start the development server:
```bash
npm run dev
```

## 🚀 Getting Started Guide

After running `docker-compose up --build`, follow these steps to start using the application:

### 1. Access pgAdmin
- Open `http://localhost:5050/browser/` in your browser
- Login with the credentials from your `.env` file:
  - Email: `admin@admin.com`
  - Password: `admin123`

### 2. Connect to the Database
In pgAdmin, create a new server connection with these details:
- Name: `weather_db`
- Host: `weatherapp-postgres`
- Port: `5432`
- Database: `weatherdb` (or your POSTGRES_DB value)
- Username: `weatheruser` (or your POSTGRES_USER value)
- Password: `weatherpass` (or your POSTGRES_PASSWORD value)

### 3. Create Admin User
1. Open the Query Tool in pgAdmin
2. Run the following SQL:
```sql
INSERT INTO "User" (id, email, password, role, "createdAt", "updatedAt")
VALUES (
  gen_random_uuid(),
  'admin@example.com',
  '$2a$12$DJnupeojZLBhRiQ47Ki8HOafkBNO8AvKHvWkPw8UyNiZcJy1gnrxC', -- password: Admin123
  'ADMIN',
  NOW(),
  NOW()
);
```

### 4. Get Admin Access Token
Send a POST request to the login endpoint:
```bash
curl -X POST http://localhost:5000/api/auth/login \
-H "Content-Type: application/json" \
-d '{
  "email": "admin@example.com",
  "password": "Admin123"
}'
```
✅ Save the JWT token from the response.

### 5. Using the API
Add the token to your requests:
```
Authorization: Bearer <your_token>
```

#### Available Actions:

1. **Create New Users** (Admin only)
```bash
curl -X POST http://localhost:5000/api/admin/create-user \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{
  "email": "newuser@example.com",
  "password": "password123",
  "role": "USER"
}'
```

2. **Search Weather**
```bash
curl -X POST http://localhost:5000/api/weather/search \
-H "Authorization: Bearer <your_token>" \
-H "Content-Type: application/json" \
-d '{
  "city": "London"
}'
```

3. **View Your Weather Queries**
```bash
curl -X GET http://localhost:5000/api/weather/user/my-queries \
-H "Authorization: Bearer <your_token>"
```

4. **View All Weather Queries** (Admin only)
```bash
curl -X GET http://localhost:5000/api/weather/admin/all-queries \
-H "Authorization: Bearer <your_token>"
```

## 📚 API Documentation

### Authentication Endpoints

#### Register User
- **POST** `/api/auth/register`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```

#### Login
- **POST** `/api/auth/login`
- **Body**:
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response**: JWT token for authentication

### Weather Endpoints

#### Search Weather
- **POST** `/api/weather/search`
- **Headers**: `Authorization: Bearer <jwt-token>`
- **Body**:
  ```json
  {
    "city": "London"
  }
  ```
- **Rate Limit**: 10 requests per minute per user

#### Get User's Weather Queries
- **GET** `/api/weather/user/my-queries`
- **Headers**: `Authorization: Bearer <jwt-token>`

### Admin Endpoints

#### Create User (Admin Only)
- **POST** `/api/admin/create-user`
- **Headers**: `Authorization: Bearer <jwt-token>`
- **Body**:
  ```json
  {
    "email": "newuser@example.com",
    "password": "password123",
    "role": "USER"
  }
  ```

#### Get All Weather Queries (Admin Only)
- **GET** `/api/weather/admin/all-queries`
- **Headers**: `Authorization: Bearer <jwt-token>`

## 🔒 Authentication

All protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <jwt-token>
```

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📦 Docker Support

Build and run the application using Docker:
```bash
docker-compose up --build
```

## 🔄 Rate Limiting

- Weather search is rate-limited to 10 requests per minute per user
- Rate limit headers are included in the response

## 🗄️ Caching

- Weather data is cached in Redis for 15 minutes
- Cache is automatically invalidated after expiration

## 📝 Error Handling

The API uses standard HTTP status codes and returns errors in the following format:
```json
{
  "data": {
    "errorDetails": "Error message"
  }
}
```

## 🔐 Security Features

- JWT-based authentication
- Password hashing using bcrypt
- Rate limiting
- Input validation using Zod
- CORS enabled
- Environment variable protection


