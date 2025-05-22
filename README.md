# Blog API

A RESTful API for a blogging platform, built with Node.js, Express, and Sequelize (PostgreSQL). This API supports user authentication and CRUD operations for users, posts, and comments.

## Features

- User registration and authentication using JWT.
- Create, read, update, and delete blog posts.
- Add and manage comments on posts.
- Secure password storage with bcrypt.
- Environment configuration using dotenv.
- Database integration via Sequelize ORM (PostgreSQL).
- Organized code structure: models, controllers, routes, and middleware.

## Tech Stack

- **Node.js** (Express.js)
- **Sequelize** (PostgreSQL)
- **JWT** for authentication
- **bcryptjs** for password hashing
- **dotenv** for environment variables

## Getting Started

### Prerequisites

- Node.js (v14+ recommended)
- PostgreSQL database
- npm (Node package manager)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/igwed93/blog-api.git
   cd blog-api
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment**
   - Create a `.env` file in the root directory.
   - Add your database credentials and JWT secret, for example:
     ```
     DB_HOST=localhost
     DB_USER=your_db_user
     DB_PASS=your_db_password
     DB_NAME=blogdb
     JWT_SECRET=your_jwt_secret
     ```

4. **Set up the database**
   - Ensure your PostgreSQL server is running and the database defined in `.env` exists.
   - The database schema will be synced automatically on server start.

5. **Run the server**
   ```bash
   npm start
   ```
   By default, the API runs at: [http://localhost:3030](http://localhost:3030)

## Project Structure

```
.
├── app.js               # Entry point of the application
├── package.json
├── config/              # Configuration files (e.g., database config)
├── controllers/         # Route handlers
├── middleware/          # Custom middleware
├── models/              # Sequelize models (User, Post, Comment, etc.)
├── routes/              # API route definitions
└── .gitignore
```

## API Endpoints

| Route            | Method | Description                  |
|------------------|--------|------------------------------|
| `/users`         | CRUD   | Manage users                 |
| `/posts`         | CRUD   | Manage blog posts            |
| `/comments`      | CRUD   | Manage comments              |
| `/auth`          | POST   | User authentication/login    |

*For detailed route information, see the `routes/` directory.*

## Scripts

- `npm start` — Starts the server with nodemon.
- `npm test` — Placeholder for tests.

## Dependencies

- `express` — Web framework
- `sequelize`, `pg`, `pg-hstore` — ORM and PostgreSQL drivers
- `jsonwebtoken` — JWT authentication
- `bcryptjs` — Password hashing
- `dotenv` — Environment variable management
- `nodemon` — Development server auto-reload

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

ISC License.

---

> **Author:** [igwed93](https://github.com/igwed93)