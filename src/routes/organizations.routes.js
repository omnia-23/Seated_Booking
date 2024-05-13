// organizations.routes.mjs
import express from "express";
const router = express.Router();
import {
  createOrganization,
  getAllOrganizations,
  getOrganizationById,
  getOrganizationByName,
  updateOrganization,
  deleteOrganization,
} from "../middlewares/organizations.middleware.js";
import { upload } from "../utils/multer.js";
// Create a new organization
router.post("/", upload.array("files", 3), createOrganization);

// Get all organizations
router.get("/all", getAllOrganizations);

// Get organization by ID
router.get("/:id", getOrganizationById);

// Get organization by name
router.get("/name/:name", getOrganizationByName);

// Update organization by ID
router.put("/:id", upload.array("files", 3), updateOrganization);

// Delete organization by ID
router.delete("/:id", deleteOrganization);

export default router;
