// users.routes.mjs
import express from "express";
const router = express.Router();
import {
  createOrgAdmin,
  signup,
  signin,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../middlewares/users.middleware.js";

// Create a new org admin
router.post("/:userId/orgAdmin", createOrgAdmin);

// Sign up new user
router.post("/signup", signup);

// Sign in user
router.post("/signin", signin);

// Get all users
router.get("/:userId/all", getAllUsers);

// Get user by ID
router.get("/:id", getUserById);

// // Get permission for a user by permission ID
// router.get("/:id/permissions", getPermissionsForUser);

// // Get organization for a user by org ID
// router.get("/:id/organization", getOrganizationForUser);

// Update user by ID
router.put("/:userId", updateUser);

// Delete user by ID
router.delete("/:userId", deleteUser);

export default router;
