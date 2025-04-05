const express = require("express");
const { route } = require("./authRoutes");
const { admin, protect } = require("../middleware/authMiddleware");
const { getUsers, getUserById,} = require("../controllers/userController");
const router = express.Router();

//User Management
router.get("/",protect,admin,getUsers);
router.get("/:id",protect,getUserById);

module.exports = router;