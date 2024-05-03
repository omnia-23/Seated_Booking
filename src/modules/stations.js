import mongoose from "mongoose";

const stationsSchema = mongoose.Schema({
  Governorate_ID: {
    type: Number,
    required: true,
    unique: true,
  },
  Governorate_Name: {
    type: String,
    required: true,
  },
  City_ID: {
    type: String,
    required: true,
    unique: true,
  },
  City_Name: {
    type: String,
    required: true,
  },
  Station_ID: {
    type: Number,
    required: true,
    unique: true,
  },
  Station_Name: {
    type: String,
    required: true,
  },
  Station_Location: {
    long: { type: String, required: true },
    lat: { type: String, required: true },
  },
  Active_Station: {
    type: Boolean,
    default: false,
  },
});

export const stationsModel = mongoose.model("Stations", stationsSchema);
