const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const app = express();
const cors = require("cors"); // Import cors
// Enable CORS for all routes
app.use(cors());
require("dotenv").config();

app.use(express.json());

// MongoDB connection
// const mongoURI = "mongodb+srv://adarshraut493:Aadarsh%4012345@cluster0.yalle.mongodb.net/E-learning?retryWrites=true&w=majority&appName=Cluster0";
// const mongoURI = "mongodb+srv://amanmotghare2024:GnxhBuWlhAGrA1F8@inotebook-assessment.bcu40.mongodb.net/quizApp?retryWrites=true&w=majority";
const mongoURI =  "mongodb://localhost:27017/quiz"

const connectToMongo = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to Mongo successfully");
  } catch (error) {
    console.error("Error connecting to Mongo:", error);
    process.exit(1); // Exit process with failure
  }
};

// Call MongoDB connection
connectToMongo();

// Importing routes
const usersRoute = require("./routes/usersRoute");
const examsRoute = require("./routes/examsRoute");
const reportsRoute = require("./routes/reportsRoute");

// Use routes
app.use("/api/users", usersRoute);
app.use("/api/exams", examsRoute);
app.use("/api/reports", reportsRoute);

// Default route for testing
app.get("/", (req, res) => {
  res.send("Welcome to the Quiz App API!");
});

// Serving static files in production
__dirname = path.resolve();

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
