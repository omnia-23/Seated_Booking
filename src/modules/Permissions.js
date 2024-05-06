// PermissionsSchema.mjs
import mongoose from "mongoose";

const PermissionsSchema = new mongoose.Schema({
  // PermissionID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   unique: true,
  // },
  OrganizationID: {
    type: String,
    required: true,
    ref: "Organizations",
  },
  OrganizationName: {
    type: String,
    required: true,
  },
  OrgAdminID: {
    type: String,
    required: true,
  },
  UserStatus: {
    type: Boolean,
    required: true,
  },
  SuperAdmin: {
    type: Boolean,
    required: true,
  },
  OrganizationAdmin: {
    type: Boolean,
    required: true,
  },
  Merchant: {
    type: Boolean,
    required: false,
  },
  ServiceAgent: {
    type: Boolean,
    required: false,
  },
  FieldAgent: {
    type: Boolean,
    required: false,
  },
  InventoryWorker: {
    type: Boolean,
    required: false,
  },
  Consumer: {
    type: Boolean,
    required: true,
  },
  dateTime: {
    type: Date,
    default: Date.now(),
  },
});

export default mongoose.model("Permissions", PermissionsSchema);
