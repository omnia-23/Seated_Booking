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

// Create a new organization
router.post("/", createOrganization);

// Get all organizations
router.get("/all", getAllOrganizations);

// Get organization by ID
router.get("/:id", getOrganizationById);

// Get organization by name
router.get("/name/:name", getOrganizationByName);

// Update organization by ID
router.put("/:id", updateOrganization);

// Delete organization by ID
router.delete("/:id", deleteOrganization);

export default router;
