const express = require("express");
const connectDB = require("./config/db"); // Import the database connection
const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");
const cors = require("cors");
const path = require("path"); // Import path module
const app = express();

// Use CORS
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
  })
);

// Connect to MongoDB
connectDB();

// Middleware
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/items", itemRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something went wrong!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
