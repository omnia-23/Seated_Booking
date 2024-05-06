import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";

const AutoIncrement = mongooseSequence(mongoose);

const stationsSchema = mongoose.Schema({
  Governorate_ID: {
    type: Number,
    unique: true,
  },
  Governorate_Name: {
    type: String,
    required: true,
  },
  City_ID: {
    type: Number,
    unique: true,
  },
  City_Name: {
    type: String,
    required: true,
  },
  Station_ID: {
    type: Number,
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
    default: true,
  },
});

stationsSchema.plugin(AutoIncrement, { inc_field: "Governorate_ID" });
stationsSchema.plugin(AutoIncrement, { inc_field: "City_ID", start_seq: 100 });
stationsSchema.plugin(AutoIncrement, {
  inc_field: "Station_ID",
  start_seq: 1000,
});

export const stationsModel = mongoose.model("Stations", stationsSchema);
