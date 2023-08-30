const { Router } = require("express");

const userRouter = require("./user");
// const prefix = require("../../config/index").prefix; // Import the prefix from config

const router = Router();

router.use('/user', userRouter); // Concatenate prefix with route path

module.exports = router;
