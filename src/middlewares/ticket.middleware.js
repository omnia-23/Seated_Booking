import { AppError, catchError } from "../utils/errorHandler.js";
import { ticketModel } from "../modules/ticket.js";
import { seatsModel } from "../modules/seats.js";
import tokenUtil from "../utils/tokenUtil.js";
import { tripsModel } from "../modules/trips.js";

//TODO : handle how see tickets
export const getTickets = catchError(async (req, res, next) => {
  let tickets = await ticketModel.find();
  if (tickets) {
    res.status(200).json({
      message: "Success",
      data: tickets,
    });
  } else
    res.status(204).json({
      message: "Success",
      data: "No data Found",
    });
});

export const getTicket = catchError(async (req, res, next) => {
  let { id } = req.params;
  let tickets = await ticketModel.findById(id);
  if (tickets) {
    res.status(200).json({
      message: "Success",
      data: tickets,
    });
  } else
    res.status(204).json({
      message: "Success",
      data: "No data Found",
    });
});

export const addTicket = catchError(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];

  const { Trip_ID, Seats_Count } = req.body;
  let { Vehicle_ID } = await tripsModel.findById(Trip_ID);
  let seats = await seatsModel
    .find({ Vehicle_ID, Status_Booked: false })
    .limit(Seats_Count);
  if (seats.length < Seats_Count) {
    res.status(200).json({
      message: "there isn't enough available seats",
    });
    return;
  }
  for (const seat of seats) {
    seat.Status_Booked = true;
    await seat.save();
  }

  const ticketsToCreate = seats.map((seat) => ({
    User_ID: tokenUtil.verifyAndExtract(token).userId,
    Trip_ID: req.body.Trip_ID,
    PNR: req.body[`PNR`],
    Passenger_Name: req.body.Passenger_Name,
    Passenger_Mobile_Number: req.body.Passenger_Mobile_Number,
    Passenger_National_ID: req.body.Passenger_National_ID,
    Organization_ID: tokenUtil.verifyAndExtract(token).orgId,
    Trip_Notes: req.body.Trip_Notes,
    Seat_Number: seat._id,
  }));

  const createdTickets = await ticketModel.insertMany(ticketsToCreate);
  if (createdTickets)
    res.status(200).json({
      message: "Success",
      data: createdTickets,
    });
  else next(new AppError("Something went Wrong ", 404));
});

export const updateTicket = catchError(async (req, res, next) => {
  const { id } = req.params;
  const ticket = await ticketModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (ticket) {
    res.status(200).json({
      message: "Success",
      data: ticket,
    });
  } else {
    res.status(204).json({
      message: "Success",
      data: "No data Found",
    });
  }
});

export const deleteTicket = catchError(async (req, res, next) => {
  const { id } = req.params;
  const ticket = await ticketModel.findByIdAndDelete(id);
  if (ticket) {
    res.status(200).json({
      message: "Success",
      data: ticket,
    });
  } else {
    res.status(204).json({
      message: "Success",
      data: "No data Found",
    });
  }
});
