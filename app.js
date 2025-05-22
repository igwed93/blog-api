const express = require('express');
const db = require('./models');

const app = express();
app.use(express.json());

// Import routes
app.use('/users', require('./routes/users'));
app.use('/posts', require('./routes/posts'));
app.use('/comments', require('./routes/comments'));
app.use('/auth', require('./routes/auth'));

// Sync DB and start server
const PORT = 3030;
db.sequelize.sync({ force: false }).then(() => {
    console.log('Database synced');
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}).catch(err => console.error('Failed to sync db:', err));