const express = require("express");
const dotenv = require("dotenv");
const cors = require('cors');
const connectdb = require("./config/db");
const cookieParser = require("cookie-parser");

dotenv.config();
connectdb();

const app = express();
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", require("./routes/userRouter")); // from your existing login/register
app.use("/api/boards", require("./routes/boardRouter"));
app.use("/api/lists", require("./routes/listRouter"));
app.use("/api/expenses", require("./routes/expenseRouter"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

