// UsersSchema.mjs
import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  OrganizationID: {
    type: String,
    required: false,
    ref: "Organizations",
  },
  // OrganizationName: {
  //   type: String,
  //   required: false,
  // },
  OrgAdminID: {
    type: String,
    required: false,
  },
  PermissionID: {
    type: String,
    required: true,
    ref: "Permissions",
  },
  UserStatus: {
    type: Boolean,
    required: true,
    default: true,
  },
  BusinessUserID: {
    type: Number,
    required: false,
  },
  Username: {
    type: String,
    required: true,
  },
  UserPassword: {
    type: String,
    required: true,
  },
  UserMobileNumber: {
    type: String,
    required: true,
    unique: true,
  },
  UserNationalID: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (v) {
        // Check if UserNationalID is exactly 12 digits
        return /^\d{14}$/.test(v);
      },
      message: (props) =>
        `${props.value} is not a valid 12-digit UserNationalID!`,
    },
  },
  UserEmail: {
    type: String,
    required: true,
    unique: true,
    match: /^\S+@\S+\.\S+$/,
  },
  dateTime: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Users", UsersSchema);
