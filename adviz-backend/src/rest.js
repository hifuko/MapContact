// EXPRESS SETTINGS
const express = require("express");
const app = express();
// BODY PARSER SETTINGS
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// MORGAN HTTP LOGGING SETTINGS
const morgan = require("morgan");
app.use(morgan("dev"));
// CONNECT MONGOOSE TO MONGODB
const mongoose = require("mongoose");
const dbConnectionString = 'mongodb+srv://admin:ivanaleo@adviz.u98a9.mongodb.net/adviz?retryWrites=true&w=majority';
mongoose.connect(dbConnectionString, { useMongoClient: true, useNewUrlParser: true } );
let dbConnection = mongoose.connection;
// checks
dbConnection.once('open', () => console.log('connected to the database'));
dbConnection.on('error', console.error.bind(console, 'MongoDB connection error:'));
// BASIC ROUTING SETTINGS
const userRoutes = require('./api/routes/users');
const addressRoutes = require('./api/routes/addresses');
// CORS HEADER SETTINGS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
app.use('/auth', userRoutes);
app.use('/addresses', addressRoutes);
// ERROR HANDLING
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

module.exports = app;