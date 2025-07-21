const List = require("../models/list");
const Expense = require("../models/expense");
const mongoose = require("mongoose");

exports.createList = async (req, res) => {
  try {
    const list = await List.create({
      userId: req.user.id,
      boardId: req.body.boardId,
      title: req.body.title,
    });
    res.status(201).json(list);
  } catch (err) {
    res.status(500).json({ msg: "Server error!" });
  }
};

exports.getLists = async (req, res) => {
  try {
    const lists = await List.find({ boardId: req.params.boardId, userId: req.user.id });
    res.json(lists);
  } catch (err) {
    res.status(500).json({ msg: "Server error!" });
  }
};

exports.updateList = async (req, res) => {
  try {
    const updated = await List.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title: req.body.title },
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: "List not found or unauthorized" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Server error!" });
  }
};

exports.deleteList = async (req, res) => {
  try {
    await Expense.deleteMany({ listId: req.params.id, userId: req.user.id });
    const deleted = await List.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ msg: "List not found or unauthorized" });
    res.json({ msg: "List and associated expenses deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error!" });
  }
};

