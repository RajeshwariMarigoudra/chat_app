const express = require('express');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes');

const app = express();

// Body parser middleware
app.use(express.json());

// Routes
app.use('/users', userRoutes);
app.use('/messages', messageRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

