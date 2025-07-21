const mongoose = require("mongoose");

const listSchema = new mongoose.Schema({
  boardId: { type: mongoose.Schema.Types.ObjectId, ref: "Board", required: true },
  userId: { type: mongoose.Schema.Types.ObjectId,ref: 'User',required: true},
  title: { type: String, required: true },
}, { timestamps: true });

module.exports = mongoose.model("List", listSchema);
