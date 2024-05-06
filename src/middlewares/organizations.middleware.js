import Organization from "../modules/Organizations.js";
import userAuthority from "../utils/checkAuthority.js";

// Create a new organization
export const createOrganization = async (req, res) => {
  try {
    const userId = req.params.userId;
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

    const organization = new Organization(req.body);
    await organization.save();
    // res.status(201).json(organization);
    return res.status(201).json({
      message: "success",
      data: organization,
    });
  } catch (error) {
    // res.status(400).json({ error: error.message });
    return res.status(400).json({
      message: "failed",
      data: "No data",
    });
  }
};

// Get all organizations
export const getAllOrganizations = async (req, res) => {
  try {
    const userId = req.params.userId;
    // Check if the user has authority
    const IsSuperAdmin = await userAuthority.checkPermission(
      userId,
      "superAdmin"
    );
    if (!IsSuperAdmin) {
      // return res.status(403).json({ error: "User does not have permission" });
      return res.status(403).json({
        message: "failed not admin",
        data: "No data",
      });
    }

    const organizations = await Organization.find();
    // res.status(200).json(organizations);
    return res.status(200).json({
      message: "success",
      data: organizations,
    });
  } catch (error) {
    // res.status(500).json({ error: error.message });
    return res.status(500).json({
      message: "failed",
      data: "No data",
    });
  }
};

// Get organization by ID
export const getOrganizationById = async (req, res) => {
  try {
    const organization = await Organization.findById(req.params.id);
    if (!organization) {
      // return res.status(404).json({ error: "Organization not found" });
      return res.status(404).json({
        message: "failed",
        data: "No data",
      });
    }
    // res.status(200).json(organization);
    return res.status(200).json({
      message: "success",
      data: organization,
    });
  } catch (error) {
    // res.status(500).json({ error: error.message });
    return res.status(500).json({
      message: "failed",
      data: "No data",
    });
  }
};

// Get organization by Name
export const getOrganizationByName = async (req, res) => {
  try {
    const organization = await Organization.findOne({
      OrganizationName: req.params.name,
    });
    if (!organization) {
      return res.status(404).json({
        message: "failed",
        data: "No organization found with the specified name",
      });
    }
    return res.status(200).json({
      message: "success",
      data: organization,
    });
  } catch (error) {
    return res.status(500).json({
      message: "failed",
      data: "Internal server error",
    });
  }
};

// Update organization by ID
export const updateOrganization = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user has authority
    const IsSuperAdmin = await userAuthority.checkPermission(
      userId,
      "superAdmin"
    );
    const IsOrgAdmin = await userAuthority.checkPermission(userId, "orgAdmin");
    const HisOrg = await userAuthority.checkOrg(userId, req.params.id);
    const hasPermission = IsSuperAdmin || (IsOrgAdmin && HisOrg);

    if (!hasPermission) {
      // if (IsOrgAdmin && !HisOrg) {
      //   return res
      //     .status(403)
      //     .json({ error: "User isn't authorized in this organization" });

      // }
      // return res.status(403).json({ error: "User does not have permission" });
      return res.status(403).json({
        message: "failed",
        data: "No data",
      });
    }

    const organization = await Organization.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!organization) {
      // return res.status(404).json({ error: "Organization not found" });
      return res.status(404).json({
        message: "failed",
        data: "No data",
      });
    }
    // res.status(200).json(organization);
    return res.status(200).json({
      message: "success",
      data: organization,
    });
  } catch (error) {
    // res.status(500).json({ error: error.message });
    return res.status(500).json({
      message: "failed",
      data: "No data",
    });
  }
};

// Delete(inactive) organization by ID
export const deleteOrganization = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Check if the user has authority
    const IsSuperAdmin = await userAuthority.checkPermission(
      userId,
      "superAdmin"
    );
    const IsOrgAdmin = await userAuthority.checkPermission(userId, "orgAdmin");
    const HisOrg = await userAuthority.checkOrg(userId, req.params.id);
    const hasPermission = IsSuperAdmin || (IsOrgAdmin && HisOrg);

    if (!hasPermission) {
      // if (IsOrgAdmin && !HisOrg) {
      //   return res
      //     .status(403)
      //     .json({ error: "User isn't authorized in this organization" });
      // }
      // return res.status(403).json({ error: "User does not have permission" });
      return res.status(403).json({
        message: "failed",
        data: "No data",
      });
    }

    const organization = await Organization.findByIdAndUpdate(
      req.params.id,
      { orgStatus: false },
      { new: true }
    );
    if (!organization) {
      // return res.status(404).json({ error: "Organization not found" });
      return res.status(404).json({
        message: "failed",
        data: "No data",
      });
    }
    // res.status(200).json({
    //   message: "Organization status updated to inactive successfully",
    // });
    return res.status(200).json({
      message: "success",
      data: organization,
    });
  } catch (error) {
    // res.status(500).json({ error: error.message });
    return res.status(500).json({
      message: "failed",
      data: "No data",
    });
  }
};
