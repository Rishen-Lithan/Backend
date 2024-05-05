require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const verifyJWT = require('./middlewares/verifyJWT');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 3500;
const connectDB = require('./config/dbConn');

// Connect backend to the Database
connectDB();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
app.use(cors({
    origin: 'http://localhost:3000', // Allow requests from this origin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow these methods
    allowedHeaders: ['Content-Type', 'Authorization'] // Allow these headers
}));

// Middleware to verify JWT
app.use(verifyJWT);

// Routes
app.use('/register', require('./routes/registerRoute'));
app.use('/login', require('./routes/loginRoutes'));
app.use('/refresh', require('./routes/refreshRoute'));
app.use('/logout', require('./routes/logoutRoutes'));

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
});

app.get("/", (req, res) => {
    res.send("Helloo");
})
