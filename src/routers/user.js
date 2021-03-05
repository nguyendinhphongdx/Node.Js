const express = require("express");
const router = express.Router();
const multer = require("multer");
const userRouter = require("../app/controllers/UserController");
const verifyToken = require("../app/helpers/tokenCheker");

router.post("/add", userRouter.create);
router.get("/queryAll", verifyToken, userRouter.queryAll);


module.exports = router;
