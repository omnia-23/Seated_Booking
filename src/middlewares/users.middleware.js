import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../modules/Users.js";
import Permission from "../modules/Permissions.js";
import userAuthority from "../utils/checkAuthority.js";
import userRole from "../utils/checkRole.js";
import tokenUtil from "../utils/tokenUtil.js";

//create org admin user
export const createOrgAdmin = async (req, res) => {
  try {
    let user;
    const { UserEmail, UserPassword } = req.body;
    const existingUser = await User.findOne({ UserEmail });
    if (existingUser) {
      // return res.status(400).json({ error: "email already exists" });
      return res.status(400).json({
        message: "failed",
        data: "No data",
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(UserPassword, 10);

    // Check if permission with the same OrganizationID already exists
    const OrganizationID = req.body.OrganizationID;
    const existingPermission = await Permission.findOne({ OrganizationID });

    if (!existingPermission) {
      // Create org admin permission
      let orgAdmin_permission = {
        OrganizationID: OrganizationID,
        OrganizationName: req.body.OrganizationName,
        OrgAdminID: req.body.OrgAdminID,
        UserStatus: true,
        SuperAdmin: false,
        OrganizationAdmin: true,
        Merchant: false,
        ServiceAgent: false,
        FieldAgent: false,
        InventoryWorker: false,
        Consumer: false,
      };
      const permission = new Permission(orgAdmin_permission);
      await permission.save();

      const newAdmin = new User({
        ...req.body,
        UserPassword: hashedPassword,
        PermissionID: permission._id,
      });
      await newAdmin.save();
      res.status(201).json(newAdmin);
    } else {
      // existing permission
      const newAdmin = new User({
        ...req.body,
        UserPassword: hashedPassword,
        PermissionID: existingPermission._id,
      });
      await newAdmin.save();
      res.status(201).json(newAdmin);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Sign up new user
export const signup = async (req, res) => {
  try {
    const { UserEmail, UserPassword } = req.body;
    // Check if username already exists
    const existingUser = await User.findOne({ UserEmail });
    if (existingUser) {
      // return res.status(400).json({ error: "Email already exists" });
      return res.status(400).json({
        message: "failed",
        data: "No data",
      });
    }
    // Hash the password
    const hashedPassword = await bcrypt.hash(UserPassword, 10);
    const consumerPermission = process.env.consumer_PermissionID;
    // res.json(consumerPermission);
    const newUser = new User({
      ...req.body,
      UserPassword: hashedPassword,
      PermissionID: consumerPermission,
    });
    await newUser.save();
    // res.status(201).json(newUser);
    return res.status(201).json({
      message: "success",
      data: newUser,
    });
  } catch (error) {
    // res.status(400).json({ error: error.message });
    return res.status(400).json({
      message: "failed",
      data: "No data",
    });
  }
};

// Sign in user
export const signin = async (req, res) => {
  try {
    const { UserEmail, UserPassword } = req.body;
    // Find user by username
    const user = await User.findOne({ UserEmail });
    if (!user) {
      return res.status(401).json({
        message: "failed",
        data: "No data",
      });
    }
    const role = await userRole.getRole(user._id);
    const userObj = user.toObject();
    userObj.role = role;
    const token = jwt.sign(
      { userId: user._id, orgId: user.OrganizationID, userRole: role },
      process.env.JWT_SECRET
    );
    return res.status(200).json({
      message: "success",
      data: userObj,
      token: token,
    });
  } catch (error) {
    return res.status(400).json({
      message: "failed",
      data: "No data",
    });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    // console.log(token);
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
    const users = await User.find();
    // res.status(200).json(users);
    return res.status(200).json({
      message: "success",
      data: users,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
    // return res.status(500).json({
    //   message: "failed",
    //   data: "No data",
    // });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      // return res.status(404).json({ error: "User not found" });
      return res.status(404).json({
        message: "failed",
        data: "No data",
      });
    }
    // res.status(200).json(user);
    return res.status(200).json({
      message: "success",
      data: user,
    });
  } catch (error) {
    // res.status(500).json({ error: error.message });
    return res.status(500).json({
      message: "failed",
      data: "No data",
    });
  }
};

// // Get permissions details for a user by permission ID
// export const getPermissionsForUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     const permission = await Permission.findById(user.PermissionID);
//     if (!permission) {
//       return res.status(404).json({ error: "Permission not found" });
//     }
//     res.status(200).json(permission);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// // Get organization details for a user by org ID
// export const getOrganizationForUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({ error: "User not found" });
//     }
//     const organization = await Organization.findById(user.OrganizationID);
//     if (!organization) {
//       return res.status(404).json({ error: "organization not found" });
//     }
//     res.status(200).json(organization);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// Update user by ID
export const updateUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userId = tokenUtil.verifyAndExtract(token).userId;
    if (req.body._id === userId) {
      const user = await User.findByIdAndUpdate(userId, req.body, {
        new: true,
      });
      if (!user) {
        // return res.status(404).json({ error: "User not found" });
        return res.status(404).json({
          message: "failed",
          data: "No data",
        });
      }
      // res.status(200).json(user);
      return res.status(200).json({
        message: "success",
        data: user,
      });
    } else {
      // return res.status(403).json("You can update only your account!");
      return res.status(403).json({
        message: "failed",
        data: "No data",
      });
    }
  } catch (error) {
    // res.status(500).json({ error: error.message });
    return res.status(500).json({
      message: "failed",
      data: "No data",
    });
  }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userId = tokenUtil.verifyAndExtract(token).userId;
    if (req.body._id === userId) {
      const user = await User.findByIdAndUpdate(
        userId,
        { UserStatus: false },
        { new: true }
      );
      if (!user) {
        // return res.status(404).json({ error: "User not found" });
        return res.status(404).json({
          message: "failed",
          data: "No data",
        });
      }
      // return res.status(200).json({ message: "User status updated to inactive successfully" });
      return res.status(200).json({
        message: "success",
        data: user,
      });
    } else {
      // return res.status(403).json("You can delete only your account!");
      return res.status(403).json({
        message: "failed",
        data: "No data",
      });
    }
  } catch (error) {
    // res.status(500).json({ error: error.message });
    return res.status(500).json({
      message: "failed",
      data: "No data",
    });
  }
};
