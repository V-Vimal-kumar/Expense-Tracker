const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectdb = require("./config/db");
const cookieParser = require("cookie-parser");
const path = require("path");

dotenv.config();
connectdb();

const app = express();

// Allowed frontend domains (Vercel + local dev)
const allowedOrigins = [
  "https://expense-tracker-x72x.vercel.app", // your frontend (vercel)
  "http://localhost:5173",                   // dev frontend (vite)
];

// Enable CORS with credentials
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

// Middleware
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/api/auth", require("./routes/userRouter"));
app.use("/api/boards", require("./routes/boardRouter"));
app.use("/api/lists", require("./routes/listRouter"));
app.use("/api/expenses", require("./routes/expenseRouter"));

// Optional: Serve frontend if deployed together
app.get("/", (req, res) => {
  res.send("API is running...");
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
