import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../modules/Users.js";
import Organizations from "../modules/Organizations.js";
import Permission from "../modules/Permissions.js";
import userAuthority from "../utils/checkAuthority.js";
import userRole from "../utils/checkRole.js";
import tokenUtil from "../utils/tokenUtil.js";
import checkRole from "../utils/checkRole.js";

//create org admin user
export const createOrgAdmin = async (req, res) => {
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

    let organization = await Organizations.findOne({
      OrganizationName: req.body.OrganizationName,
    });
    // Create org admin permission
    let orgAdmin_permission = {
      OrganizationID: organization._id,
      UserMobileNumber: req.body.UserMobileNumber,
      OrgAdminID: userId,
      // UserStatus: true,
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
      UserPassword: hashedPassword,
      PermissionID: permission._id,
      OrganizationID: organization._id,
      OrgAdminID: userId,
      UserStatus: req.body.UserStatus,
      Username: req.body.Username,
      UserMobileNumber: req.body.UserMobileNumber,
      UserEmail: req.body.UserEmail,
      BusinessUserID: req.body.BusinessUserID,
      UserNationalID: req.body.UserNationalID,
    });
    await newAdmin.save();
    return res.status(201).json({
      message: "success",
      data: newAdmin,
    });
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

    let consumer_permission = {
      OrganizationID: process.env.superOrg_ID,
      UserMobileNumber: req.body.UserMobileNumber,
      OrgAdminID: process.env.superAdmin_ID,
      // UserStatus: true,
      SuperAdmin: false,
      OrganizationAdmin: false,
      Merchant: false,
      ServiceAgent: false,
      FieldAgent: false,
      InventoryWorker: false,
      Consumer: true,
    };
    const permission = new Permission(consumer_permission);
    await permission.save();
    // res.json(permission);
    const newUser = new User({
      ...req.body,
      OrganizationID: process.env.superOrg_ID,
      OrgAdminID: process.env.superAdmin_ID,
      UserPassword: hashedPassword,
      PermissionID: permission._id,
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

// export const signin = async (req, res) => {

//   try {
//     const { UserEmail, UserPassword } = req.body;
//     // Find user by username
//     const user = await User.findOne({ UserEmail });
//     console.log(UserEmail);
//     console.log(user);
//     if (!user) {
//       res.status(400).json({ error: "User not found" });
//     }
//     // Compare passwords
//     const isPasswordValid = await bcrypt.compare(
//       UserPassword,
//       user.UserPassword
//     );
//     if (!isPasswordValid) {
//       res.status(401).json({ error: "Password not valid" });
//     }
//     const role = await userRole.getRole(user._id);
//     const userObj = user.toObject();
//     userObj.role = role;
//     const token = jwt.sign(
//       {
//         userId: user._id,
//         orgId: user.OrganizationID,
//         userRole: role,
//         permissionId: user.PermissionID,
//       },
//       process.env.JWT_SECRET
//     );
//     return res.status(200).json({
//       message: "Success",
//       data: userObj,
//       token: token,
//     });
//   } catch (error) {
//         // return res.status(400).json({
//     //   message: "failed",
//     //   data: "No data",
//     // });
//     res.status(400).json({ error: error.message });
//   }
// };

export const signin = async (req, res) => {
  try {
    const { UserEmail, UserPassword } = req.body;
    // Find user by username
    const user = await User.findOne({ UserEmail });
    console.log(user);
    if (!user) {
      // res.status(400).json({ error: "User not found" });
    }
    // Compare passwords
    const isPasswordValid = await bcrypt.compare(
      UserPassword,
      user.UserPassword
    );
    if (!isPasswordValid) {
      // res.status(401).json({ error: "password not valid" });
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
    res.status(400).json({ error: error.message });
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
    // res.status(500).json({ error: error.message });
    return res.status(500).json({
      message: "failed",
      data: "No data",
    });
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

// Get user by ID
export const getAdminByOrgID = async (req, res) => {
  try {
    // Extract user ID from token
    const token = req.headers.authorization.split(" ")[1];
    const userId = tokenUtil.verifyAndExtract(token).userId;
    const orgId = tokenUtil.verifyAndExtract(token).orgId;

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
    const admin = await User.findOne({
      OrganizationID: req.params.id,
    });
    const isConsumer = checkRole.getRole(admin._id) == "consumer";

    if (!admin || isConsumer) {
      // return res.status(404).json({ error: "User not found" });
      return res.status(404).json({
        message: "failed",
        data: "No admin found",
      });
    }
    // res.status(200).json(user);
    return res.status(200).json({
      message: "success",
      data: admin,
    });
  } catch (error) {
    // res.status(500).json({ error: error.message });
    return res.status(500).json({
      message: "failed",
      error: error.message,
    });
  }
};

// Update user by ID
export const updateUser = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const userId = tokenUtil.verifyAndExtract(token).userId;
    const IsSuperAdmin = await userAuthority.checkPermission(
      userId,
      "superAdmin"
    );
    if (req.body._id === userId || IsSuperAdmin == true) {
      delete req.body._id;
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
    res.status(500).json({ error: error.message });
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
    const IsSuperAdmin = await userAuthority.checkPermission(
      userId,
      "superAdmin"
    );
    if (req.body._id === userId || IsSuperAdmin) {
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
