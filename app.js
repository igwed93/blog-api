const express = require('express');
const db = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./config/swaggerOptions');
const morgan = require('morgan');
const logger = require('./config/logger');

const app = express();

// Morgan setup to log HTTP requests
app.use(morgan('combined', {
    stream: {
        write: (message) => logger.info(message.trim())
    }
}));

// Middleware to parse JSON requests
app.use(express.json());

// Import  and use routes
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));
app.use('/comments', require('./routes/comments'));
app.use('/auth', require('./routes/auth'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handler to log errors
app.use((err, req, res, next) => {
    logger.error(`${err.status || 500} - ${err.message}`);
    res.status(err.status || 500).json({
        error: {
            message: err.message,
            status: err.status || 500
        }
    });
});

// test route to check if logging works
app.get('/test', (req, res) => {
    logger.info('Test logging route hit');
    res.json({ message: 'Logging works!' });
});

// Sync DB and start server
const PORT = 3030;
db.sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => {
        console.log(`Server running on http://localhost:${PORT}`);
        console.log('Swagger docs at http://localhost:3030/api-docs');
    });
}).catch(err => console.error('Failed to sync db:', err));