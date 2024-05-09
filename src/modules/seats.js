import mongoose from "mongoose";

const seatsSchema = mongoose.Schema({
  Vehicle_ID: {
    type: mongoose.Types.ObjectId,
    ref: "Vehicles",
    required: true,
  },
  Seat_Number: {
    type: String,
    required: true,
    unique: true,
  },
  Seat_description: {
    type: String,
    required: true,
  },
  Seat_Price: {
    type: Number,
    required: true,
  },
  Active_Seat: {
    type: Boolean,
    default: true,
  },
  Status_Booked: {
    type: Boolean,
    default: false,
  },
});

export const seatsModel = mongoose.model("Seats", seatsSchema);
