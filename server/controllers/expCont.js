const Expense = require("../models/expense");
const mongoose = require("mongoose");

exports.createExpense = async (req, res) => {
  try {
    const expense = await Expense.create({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json({ msg: "Server error!" });
  }
};

exports.getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find({
      listId: req.params.listId,
      userId: req.user.id,
    });
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ msg: "Server error!" });
  }
};

exports.updateExpense = async (req, res) => {
  try {
    const updated = await Expense.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      {
        title: req.body.title,
        amount: req.body.amount,
        date: req.body.date,
        description: req.body.description,
        category: req.body.category,
      },
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: "Expense not found or unauthorized" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Server error!" });
  }
};

exports.deleteExpense = async (req, res) => {
  try {
    const deleted = await Expense.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!deleted) return res.status(404).json({ msg: "Expense not found or unauthorized" });
    res.json({ msg: "Expense deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error!" });
  }
};
