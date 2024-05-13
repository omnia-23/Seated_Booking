import Organization from "../modules/Organizations.js";
import userAuthority from "../utils/checkAuthority.js";
import tokenUtil from "../utils/tokenUtil.js";
import uploadImg from "../utils/uploadImg.js"; // Adjust the import path as needed

// Create a new organization

export const createOrganization = async (req, res) => {
  try {
    const {
      LicenceID,
      OrgStatus,
      OrganizationType,
      OrganizationName,
      OrganizationFinancialID,
      FinancialLimitFrom,
      FinancialLimitTo,
      BankAccount,
    } = req.body;

    // Access uploaded files from req.files
    const images = req.files || [];

    // Process uploaded images by uploading to Cloudinary
    const uploadedImages = await Promise.all(
      images.map(uploadImg.uploadImageToCloudinary)
    );

    console.log(uploadedImages);
    let profile = uploadedImages[0];
    let attachments = uploadedImages.slice(1, 3);

    const organization = new Organization({
      LicenceID,
      OrgStatus,
      OrganizationType,
      OrganizationName,
      OrganizationFinancialID,
      FinancialLimitFrom,
      FinancialLimitTo,
      BankAccount,
      OrganizationAttachments: attachments,
      OrganizationImage: profile, // Make sure to update this field as needed
    });

    await organization.save();

    return res.status(201).json({
      message: "success",
      data: organization,
    });
  } catch (error) {
    console.error("Error creating organization:", error);
    return res
      .status(500)
      .json({ message: "Failed to create organization", error: error.message });
  }
};

// Get all organizations
export const getAllOrganizations = async (req, res) => {
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
    // Extract user ID from token
    const token = req.headers.authorization.split(" ")[1];
    const userId = tokenUtil.verifyAndExtract(token).userId;

    // Check if the user has authority
    const IsSuperAdmin = await userAuthority.checkPermission(
      userId,
      "superAdmin"
    );
    const IsOrgAdmin = await userAuthority.checkPermission(userId, "orgAdmin");
    const HisOrg = await userAuthority.checkOrg(userId, req.params.id);
    const hasPermission = IsSuperAdmin || (IsOrgAdmin && HisOrg);

    if (!hasPermission) {
      return res.status(403).json({
        message: "failed",
        data: "User does not have permission",
      });
    }

    // Access uploaded files from req.files
    const images = req.files || [];
    let profile, attachments;

    // Process uploaded images if new images were uploaded
    if (images.length > 0) {
      // Process uploaded images by uploading to Cloudinary
      const uploadedImages = await Promise.all(
        images.map(uploadImg.uploadImageToCloudinary)
      );
      profile = uploadedImages[0];
      attachments = uploadedImages.slice(1, 3);
    } else {
      // No new images uploaded, retain the existing ones
      // Retrieve organization data from the database
      const organization = await Organization.findById(req.params.id);
      profile = organization.OrganizationImage;
      attachments = organization.OrganizationAttachments;
    }

    // Update organization data in the database, including image URLs
    const organization = await Organization.findByIdAndUpdate(
      req.params.id,
      {
        OrganizationAttachments: attachments,
        OrganizationImage: profile,
        ...req.body, // Update other organization data
      },
      { new: true }
    );

    if (!organization) {
      return res.status(404).json({
        message: "failed",
        data: "Organization not found",
      });
    }

    return res.status(200).json({
      message: "success",
      data: organization,
    });
  } catch (error) {
    console.error("Error updating organization:", error);
    return res.status(500).json({
      message: "failed",
      data: "An error occurred while updating organization",
    });
  }
};

// Delete(inactive) organization by ID
export const deleteOrganization = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userId = tokenUtil.verifyAndExtract(token).userId;

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
