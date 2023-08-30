const express = require('express');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit')
const deleteExpiredTokens = require('./utils/tokenCleanup');
const dbConnector = require('./db/index'); // Import the dbConnector module
const dbConfig = require('./config/index'); // Import your database configuration
const routes = require('./app/routes/index');
const cors = require('cors');
const cookieParser = require('cookie-parser');

// const prefix = require("./config/index").prefix;

const app = express();



app.use(express.json({limit: "10kb"}));

const limiter = rateLimit({
  max: 100,
  window: 60 * 60 * 1000,
  message: "Too many request from this IP. Please try again later in one hour"
})
app.use(helmet());

app.use(cors({
  origin: 'http://localhost:5173', // replace with your frontend application's URL
  credentials: true,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(cookieParser());

const port = 3001;
app.use("/api/", limiter);


// API Routes
app.use('/api/v1/', routes);

// Handle /favicon.ico route
app.get('/favicon.ico', (req, res) => {
  res.status(204).end();
});

// Your other routes
app.get('/', (req, res) => {
  res.send('running docker');
});

// Configure a single database connection and models
const dbRepo = {}; // Create a repository for Sequelize connections and models

// Attempt to connect to the database and populate dbRepo
dbConnector
  .addSequelizeConnectionToRepo(dbRepo, dbConfig.db) // Pass dbConfig.db as an argument
  .then(() => {
    // Start the token cleanup task
    deleteExpiredTokens();

    // Start the server once the database connection is established

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });
