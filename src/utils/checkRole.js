// checkRole.mjs
import Permission from "../modules/Permissions.js";
import User from "../modules/Users.js";

class checkRole {
  static async getRole(userId) {
    try {
      // Find the user by ID
      const user = await User.findById(userId);
      if (!user) {
        return "no user"; // User not found
      }

      // Get the user's permission ID from the user document
      const userPermissionId = user.PermissionID;
      // Find the permission by permission ID
      const userPermission = await Permission.findById(userPermissionId);
      if (!userPermission) {
        return "no permission"; // User permission not found
      }

      // Check permissions and assign role based on hierarchy
      let role = "consumer"; // Default role
      if (userPermission.SuperAdmin) {
        role = "superAdmin";
      } else if (userPermission.OrganizationAdmin) {
        role = "orgAdmin";
      }

      console.log(role);
      return role;
    } catch (error) {
      console.error("Error checking user permission:", error);
      return "error";
    }
  }
}

export default checkRole;
