const express = require('express');
const connectDB = require('./config/db');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables
dotenv.config();

// Initialize the app
const app = express();

// Connect to database
connectDB();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }))

// Basic route
app.get('/', (req, res) => {
    res.send('Here I am your first running API YOPTA!'); // <<< this line has been modified for testing purposes
});
app.use(cors());
// app.post('/api/auth/login', async (req, res) => {
//     console.log("atempt to login!<<<<<<<<<<<<<<<<<<")
//   });
// Define routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/reset-password', require('./routes/resetPassword'));

// Set up the server to listen on a specific port
const PORT = 5000;
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
});