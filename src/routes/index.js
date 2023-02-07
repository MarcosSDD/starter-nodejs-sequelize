const express = require('express')
const users = require('./userRouter')

const router = express.Router();  

router.use("/user",users)

module.exports = router
