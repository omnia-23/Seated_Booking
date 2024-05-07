import Permission from "../modules/Permissions.js";
import userAuthority from "../utils/checkAuthority.js";
import jwt from "jsonwebtoken";
import tokenUtil from "../utils/tokenUtil.js";

// Create a new permission
export const createPermission = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = tokenUtil.verifyAndExtract(token).userId;
  // Check if the user has authority
  const IsSuperAdmin = await userAuthority.checkPermission(
    userId,
    "superAdmin"
  );
  if (!IsSuperAdmin) {
    // return res.status(403).json({ error: "User does not have permission" });
    return res.status(403).json({
      message: "failed",
      data: "No data",
    });
  }
  try {
    const permission = new Permission(req.body);
    await permission.save();
    res.status(201).json(permission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all permissions
export const getAllPermissions = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  const userId = tokenUtil.verifyAndExtract(token).userId;
  // Check if the user has authority
  const IsSuperAdmin = await userAuthority.checkPermission(
    userId,
    "superAdmin"
  );
  if (!IsSuperAdmin) {
    // return res.status(403).json({ error: "User does not have permission" });
    return res.status(403).json({
      message: "failed",
      data: "No data",
    });
  }
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get permission by ID
export const getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({ error: "Permission not found" });
    }
    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update permission by ID
export const updatePermission = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userId = tokenUtil.verifyAndExtract(token).userId;
    // Check if the user has authority
    const IsSuperAdmin = await userAuthority.checkPermission(
      userId,
      "superAdmin"
    );
    if (!IsSuperAdmin) {
      // return res.status(403).json({ error: "User does not have permission" });
      return res.status(403).json({
        message: "failed",
        data: "No data",
      });
    }

    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!permission) {
      return res.status(404).json({ error: "Permission not found" });
    }
    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete permission by ID
export const deletePermission = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userId = tokenUtil.verifyAndExtract(token).userId;
    // Check if the user has authority
    const IsSuperAdmin = await userAuthority.checkPermission(
      userId,
      "superAdmin"
    );
    if (!IsSuperAdmin) {
      // return res.status(403).json({ error: "User does not have permission" });
      return res.status(403).json({
        message: "failed",
        data: "No data",
      });
    }

    const permission = await Permission.findByIdAndDelete(req.params.id);
    if (!permission) {
      return res.status(404).json({ error: "Permission not found" });
    }
    res.status(200).json({ message: "Permission deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
