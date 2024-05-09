import mongoose from "mongoose";
import mongooseSequence from "mongoose-sequence";
const AutoIncrement = mongooseSequence(mongoose);

const ticketSchema = mongoose.Schema({
  User_ID: {
    type: mongoose.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  PNR: {
    type: Number,
    required: true,
  },
  Trip_ID: {
    type: mongoose.Types.ObjectId,
    ref: "Trips",
    required: true,
  },
  Seat_Number: {
    type: mongoose.Types.ObjectId,
    ref: "Seats",
    unique: true,
    required: true,
  },
  Passenger_Name: {
    type: String,
    required: true,
  },
  Passenger_Mobile_Number: {
    type: String,
    required: true,
  },
  Passenger_National_ID: {
    type: Number,
    required: true,
  },
  Organization_ID: {
    type: mongoose.Types.ObjectId,
    ref: "Organizations",
    required: true,
  },
  Trip_Notes: {
    type: String,
  },
});

export const ticketModel = mongoose.model("Ticket", ticketSchema);
