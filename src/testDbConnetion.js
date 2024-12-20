const mongoose = require("mongoose");
require("dotenv").config();

const testConnection = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("Successfully connected to MongoDB Atlas!");
  } catch (error) {
    console.error("Error connecting to MongoDB Atlas:", error);
  } finally {
    mongoose.disconnect();
  }
};

testConnection();