# Blog API

A RESTful API for a blogging platform, built with Node.js, Express, and Sequelize (PostgreSQL). This API supports user authentication and CRUD operations for users, posts, and comments, with JWT-based authentication, logging, and Swagger documentation.

## Features

- User registration and authentication using JWT.
- Secure password storage with bcrypt.
- CRUD operations for users, posts, and comments.
- Role-based access for updating/deleting posts and comments (only owners can modify/delete).
- Logging of HTTP requests and errors using Winston and Morgan.
- Environment configuration using dotenv.
- Database integration via Sequelize ORM (PostgreSQL).
- Organized code structure: models, controllers, routes, and middleware.
- API documentation with Swagger (available at `/api-docs`).

## Tech Stack

- **Node.js** (Express.js)
- **Sequelize** (PostgreSQL)
- **JWT** for authentication
- **bcryptjs** for password hashing
- **dotenv** for environment variables
- **winston** and **morgan** for logging
- **swagger-jsdoc** and **swagger-ui-express** for API docs

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
     DB_PASSWORD=your_db_password
     DB_NAME=blogdb
     DB_PORT=5432
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

6. **API Documentation**
   - Visit [http://localhost:3030/api-docs](http://localhost:3030/api-docs) for Swagger UI.

## Project Structure

```
.
├── app.js               # Entry point of the application
├── package.json
├── .env
├── .gitignore
├── config/              # Configuration files (e.g., database, logger, swagger)
│   ├── config.js
│   ├── logger.js
│   └── swaggerOptions.js
├── controllers/         # Route handlers
│   ├── auth.controller.js
│   ├── comment.controller.js
│   ├── post.controller.js
│   └── user.controller.js
├── logs/                # Log files (auto-generated)
│   ├── app.log
│   ├── combined.log
│   └── error.log
├── middleware/          # Custom middleware
│   └── authMiddleware.js
├── models/              # Sequelize models (User, Post, Comment)
│   ├── comment.model.js
│   ├── index.js
│   ├── post.model.js
│   └── user.model.js
├── routes/              # API route definitions
│   ├── auth.js
│   ├── comments.js
│   ├── posts.js
│   └── users.js
└── README.md
```

## API Endpoints

| Route            | Method | Description                  | Auth Required |
|------------------|--------|------------------------------|--------------|
| `/auth/register` | POST   | Register a new user          | No           |
| `/auth/login`    | POST   | Login and get JWT token      | No           |
| `/users`         | GET    | List all users               | No           |
| `/users/:id`     | GET    | Get user by ID               | No           |
| `/posts`         | POST   | Create a new post            | Yes          |
| `/posts`         | GET    | List all posts               | No           |
| `/posts/:id`     | GET    | Get post by ID               | No           |
| `/posts/:id`     | PUT    | Update a post (owner only)   | Yes          |
| `/posts/:id`     | DELETE | Delete a post (owner only)   | Yes          |
| `/comments`      | POST   | Create a comment             | No           |
| `/comments/post/:postId` | GET | Get comments for a post | No           |
| `/comments/user/:userId` | GET | Get comments by user   | No           |
| `/comments/:id`  | PUT    | Update comment (owner only)  | Yes          |
| `/comments/:id`  | DELETE | Delete comment (owner only)  | Yes          |

*For detailed route information, see the `routes/` directory and Swagger docs.*

## Logging

- All HTTP requests and errors are logged using Winston and Morgan.
- Log files are stored in the `logs/` directory.

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
- `winston`, `morgan` — Logging
- `swagger-jsdoc`, `swagger-ui-express` — API documentation

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

ISC License.

---

> **Author:** [igwed93](https://github.com/igwed93)