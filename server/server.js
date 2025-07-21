const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");

// Route imports
const userRoutes = require("./routes/userRouter");
const boardRoutes = require("./routes/boardRouter");
const listRoutes = require("./routes/listRouter");
const expenseRoutes = require("./routes/expenseRouter");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());

// CORS Configuration
app.use(cors({
  origin: 'https://expense-tracker-x72x.vercel.app',  
  credentials: true,
}));

// Routes
app.use("/api/auth", userRoutes);
app.use("/api/boards", boardRoutes);
app.use("/api/lists", listRoutes);
app.use("/api/expenses", expenseRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB connected"))
.catch((err) => console.error("❌ MongoDB connection error:", err));

// Default route
app.get("/", (req, res) => {
  res.send("📦 Expense Tracker API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
