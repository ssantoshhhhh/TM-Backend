const { json } = require('express');
const Task  = require('../models/Task');
const User = require('../models/User');
const bcrypt = require('bcryptjs');

//@desc get all users
//@route GET /api/users
//private access
const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");

    // Add task counts to each user
    const usersWithTaskCounts = await Promise.all(users.map(async (user) => {
      const pendingTasks = await Task.countDocuments({ assignedTo: user._id, status: "pending" });
      const inProgresTasks = await Task.countDocuments({ assignedTo: user._id, status: "in-progress" });
      const completedTasks = await Task.countDocuments({ assignedTo: user._id, status: "completed" });

      return {
        ...user._doc,
        pendingTasks,
        inProgresTasks,
        completedTasks,
      };
    }));

    res.status(200).json(usersWithTaskCounts);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//@desc get user by id
//@route GET /api/users/:id
//private access
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
      res.json(user);
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};

//@desc delete user
//@route DELETE /api/users/:id
//private access


module.exports = {
  getUsers,
  getUserById,

};
