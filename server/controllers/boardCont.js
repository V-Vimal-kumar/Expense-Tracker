const Board = require("../models/board");

exports.createBoard = async (req, res) => {
  try {
    const board = await Board.create({
      userId: req.user.id,
      title: req.body.title,
    });
    res.status(201).json(board);
  } catch (err) {
    res.status(500).json({ msg: "Server error!" });
  }
};

exports.getBoard = async (req, res) => {
  try {
    const boards = await Board.find({ userId: req.user.id });
    res.status(200).json(boards);
  } catch (err) {
    res.status(500).json({ msg: "Server error!" });
  }
};

exports.updateBoard = async (req, res) => {
  try {
    const updated = await Board.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      { title: req.body.title },
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: "Board not found or unauthorized" });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Server error!" });
  }
};

exports.deleteBoard = async (req, res) => {
  try {
    const deleted = await Board.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!deleted) return res.status(404).json({ msg: "Board not found or unauthorized" });
    res.json({ msg: "Board deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error!" });
  }
};
