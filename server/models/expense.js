const mongoose = require("mongoose");

const expenseSchema = new mongoose.Schema({
  listId: { type: mongoose.Schema.Types.ObjectId, ref: "List", required: true },
  userId: {type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
  title: { type: String, required: true },
  amount: { type: Number, required: true },
  date: { type: Date, default: Date.now },
  description: String,
  category: String,
}, { timestamps: true });

module.exports = mongoose.model("Expense", expenseSchema);
