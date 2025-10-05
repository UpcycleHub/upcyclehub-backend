const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Base route (for quick Render check)
app.get("/", (req, res) => {
  res.send("UpcycleHub Backend is Running Successfully!");
});

// Routes
const userRoutes = require("./routes/userRoutes");
const orderRoutes = require("./routes/orderRoutes");

app.use("/api/users", userRoutes);
app.use("/api/orders", orderRoutes);

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log(" MongoDB connected"))
  .catch((err) => console.error(" MongoDB connection error:", err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
