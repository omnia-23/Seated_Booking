// users.routes.mjs
import express from "express";
const router = express.Router();
import {
  createOrgAdmin,
  signup,
  signin,
  getAllUsers,
  getUserById,
  getAdminByOrgID,
  updateUser,
  deleteUser,
} from "../middlewares/users.middleware.js";

// Create a new org admin
router.post("/orgAdmin", createOrgAdmin);

// Sign up new user
router.post("/signup", signup);

// Sign in user
router.post("/signin", signin);

// Get all users
router.get("/all", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

// Get admin by org ID
router.get("/orgAdmin/:id", getAdminByOrgID);

// Update user by ID
router.put("/", updateUser);

// Delete user by ID
router.delete("/", deleteUser);

export default router;
