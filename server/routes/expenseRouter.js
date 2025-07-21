const express = require("express");
const { createExpense, getExpenses,updateExpense, deleteExpense } = require("../controllers/expCont");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, createExpense);
router.get("/:listId", protect, getExpenses);
router.put("/:id", protect, updateExpense);
router.delete("/:id", protect, deleteExpense);

module.exports = router;
