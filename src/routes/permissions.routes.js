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
router.post("/", createPermission);

// Get all permissions
router.get("/all", getAllPermissions);

// Get permission by ID
router.get("/:id", getPermissionById);

// Update permission by ID
router.put("/:id", updatePermission);

// Delete permission by ID
router.delete("/:id", deletePermission);

export default router;
