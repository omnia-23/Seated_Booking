// permissions.routes.mjs
import express from "express";
const router = express.Router();
import {
  createPermission,
  getAllPermissions,
  getPermissionById,
  updatePermission,
  deletePermission,
} from "../middlewares/permissions.middleware.js";

// Create a new permission
router.post("/:userId", createPermission);

// Get all permissions
router.get("/:userId/all", getAllPermissions);

// Get permission by ID
router.get("/:id", getPermissionById);

// Update permission by ID
router.put("/:userId/:id", updatePermission);

// Delete permission by ID
router.delete("/:userId/:id", deletePermission);

export default router;
