const mongoose = require("mongoose");
const mongoURI = "mongodb://localhost:27017/tracker";

const connectToMongo = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    console.log("Connected to MongoDB successfully!");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    // Exit the process if connection fails
    process.exit(1);
  }
}; 

module.exports = connectToMongo;