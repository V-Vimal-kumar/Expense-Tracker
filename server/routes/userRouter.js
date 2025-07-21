const express=require('express')
const router=express.Router();
const {login,register}=require('../controllers/userCont')

//login
router.post('/register',register);

//register
router.post('/login',login)

module.exports = router;