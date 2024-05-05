const mongoose = require("mongoose");
const PermissionsSchema = new mongoose.Schema({
  // PermissionID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   unique: true,
  // },
  OrganizationID: {
    type: String,
    required: false,
    ref: "Organizations",
  },
  OrganizationName: {
    type: String,
    required: false,
  },
  OrgAdminID: {
    type: String,
    required: false,
  },
  UserStatus: {
    type: Boolean,
    required: true,
  },
  superAdmin: {
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
module.exports = mongoose.model("Permissions", PermissionsSchema);
