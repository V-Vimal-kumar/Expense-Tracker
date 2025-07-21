const express = require("express");
const { createList, getLists, updateList ,deleteList} = require("../controllers/listCont");
const { protect } = require("../middleware/auth");

const router = express.Router();

router.post("/", protect, createList);
router.get("/:boardId", protect, getLists);
router.put("/:id", protect, updateList);
router.delete('/:id', protect, deleteList);

module.exports = router;
