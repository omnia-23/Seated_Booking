// checkAuthority.mjs
import Permission from "../modules/Permissions.js";
import User from "../modules/Users.js";

class checkAuthority {
  static async checkPermission(userId, permissionType) {
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return false; // User not found
      }

      // Get the user's permission ID from the user document
      const userPermissionId = user.PermissionID;
      // Find the permission by permission ID
      const userPermission = await Permission.findById(userPermissionId);
      if (!userPermission) {
        return false; // User permission not found
      }

      // Check if the user has the specified permission type
      switch (permissionType) {
        case "superAdmin":
          return userPermission.SuperAdmin;
        case "orgAdmin":
          return userPermission.OrganizationAdmin;
        case "consumer":
          return userPermission.Consumer;
        default:
          return false; // Invalid permission type
      }
    } catch (error) {
      console.error("Error checking user permission:", error);
      return false;
    }
  }

  static async checkOrg(userId, orgId) {
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return false; // User not found
      }
      // Get the user's organization ID from the user document
      const userOrgId = user.OrganizationID;
      console.log(user);
      if (userOrgId == orgId) return true;
      return false;
    } catch (error) {
      console.error("Error checking user organization:", error);
      return false;
    }
  }
}

export default checkAuthority;
