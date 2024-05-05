const mongoose = require("mongoose");
const OrganizationsSchema = new mongoose.Schema({
  // OrganizationID: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   default: function () {
  //     return mongoose.Types.ObjectId(); // Generate a new ObjectId
  //   },
  //   unique: true,
  //   // required: true,
  // },
  LicenceID: {
    type: String,
    required: false,
    unique: true,
  },
  OrgStatus: {
    type: Boolean,
    required: true,
    default: true,
  },
  OrganizationType: {
    type: String,
    required: true,
  },
  OrganizationName: {
    type: String,
    required: true,
  },
  OrganizationFinancialID: {
    type: String,
    required: false,
  },
  FinancialLimitFrom: {
    type: Number,
    required: false,
  },
  FinancialLimitTo: {
    type: Number,
    required: false,
  },
  BankAccount: {
    type: Number,
    required: false,
  },
  OrganizationAttachements: {
    type: mongoose.Schema.Types.Mixed,
    required: false,
  },
  dateTime: {
    type: Date,
    default: Date.now(),
  },
});
module.exports = mongoose.model("Organizations", OrganizationsSchema);
