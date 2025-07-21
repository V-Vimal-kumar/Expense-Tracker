const express=require('express')
const{createBoard,getBoard,deleteBoard,updateBoard}=require("../controllers/boardCont")
const {protect}=require("../middleware/auth");

const router=express.Router();

router.post('/',protect,createBoard);
router.get('/',protect,getBoard);
router.put("/:id", protect, updateBoard);
router.delete('/:id',protect,deleteBoard);

module.exports = router;
