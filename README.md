# Web Matcha Backend

A modern C++ backend service built with Crow framework, providing authentication and profile management functionality.

## Features

- RESTful API endpoints for user authentication and profile management
- JWT-based authentication
- PostgreSQL database integration
- Secure password hashing
- CORS support
- Modern C++17 codebase

## Prerequisites

- C++17 compatible compiler
- CMake 3.15 or higher
- OpenSSL
- PostgreSQL
- libpqxx
- jwt-cpp
- Crow (header-only, included in the project)

## Dependencies Installation

### macOS (using Homebrew)

```bash
brew install openssl postgresql libpqxx cmake
```

### JWT-CPP Installation

```bash
git clone https://github.com/Thalhammer/jwt-cpp.git
cd jwt-cpp
mkdir build && cd build
cmake ..
make
sudo make install
```

## Project Structure

```
backend/
├── include/           # Header files
│   └── crow/         # Crow framework headers
├── src/
│   ├── controllers/  # Request handlers
│   ├── db/          # Database connection management
│   ├── routes/      # API route definitions
│   ├── services/    # Business logic
│   ├── utils/       # Utility functions
│   └── main.cpp     # Application entry point
└── CMakeLists.txt   # Build configuration
```

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-email` - Verify user email
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Profile Management

- `GET /api/profile` - Get user profile
- `PUT /api/profile` - Update user profile
- `POST /api/profile/picture` - Upload profile picture

## Building the Project

1. Create a build directory:
```bash
cd backend
mkdir build
cd build
```

2. Configure and build:
```bash
cmake ..
make
```

3. Run the server:
```bash
./web_matcha
```

## Database Setup

1. Create a PostgreSQL database:
```sql
CREATE DATABASE web_matcha;
```

2. Create the users table:
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    username VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Environment Configuration

The application uses the following default database connection settings:
- Host: localhost
- Port: 5432
- Database: web_matcha
- User: postgres
- Password: postgres

To modify these settings, update the connection string in `src/main.cpp`.

## Security Features

- Password hashing using OpenSSL
- JWT-based authentication
- CORS protection
- Input validation
- SQL injection prevention using parameterized queries

## Error Handling

The API uses standard HTTP status codes:
- 200: Success
- 201: Created
- 400: Bad Request
- 401: Unauthorized
- 500: Internal Server Error

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request
