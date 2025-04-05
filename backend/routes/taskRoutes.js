const express = require("express");
const {
  protect,
  admin,
} = require("../middleware/authMiddleware");

const {
  getDashboardData,
  getUserDashboardData,
  getTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
  updateTaskStatus,
  updateTaskChecklist,
} = require("../controllers/taskController");

const router = express.Router();

// Task Management Routes
router.get("/dashboard-data", protect, getDashboardData);
router.get("/user-dashboard-data", protect, getUserDashboardData); // ✅ typo fixed
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);
router.post("/", protect, admin, createTask);
router.put("/:id", protect, updateTask); // or add `admin` here if needed
router.delete("/:id", protect, admin, deleteTask);
router.put("/:id/status", protect, updateTaskStatus);
router.put("/:id/todo", protect, updateTaskChecklist);

module.exports = router;
