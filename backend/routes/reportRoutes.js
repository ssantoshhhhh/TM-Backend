const express = require("express");
const { route } = require("./authRoutes");
const { protect, admin } = require("../middleware/authMiddleware");
const { exportTasksReport, exportUsersReport } = require("../controllers/reportController");

const router = express.Router();

router.get("/export/tasks",protect,admin,exportTasksReport);
router.get("/export/users",protect,admin,exportUsersReport);


module.exports = router;