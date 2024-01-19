const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGODB;
const DB_NAME = process.env.DB_NAME;

mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to MongoDB", err));
