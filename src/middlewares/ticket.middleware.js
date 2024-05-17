import { AppError, catchError } from "../utils/errorHandler.js";
import { ticketModel } from "../modules/ticket.js";
import { seatsModel } from "../modules/seats.js";
import tokenUtil from "../utils/tokenUtil.js";
import { tripsModel } from "../modules/trips.js";

export const getHistory = catchError(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  console.log(tokenUtil.verifyAndExtract(token));
  let User_ID = tokenUtil.verifyAndExtract(token).userId;
  let role = tokenUtil.verifyAndExtract(token).userRole;

  if (role === "consumer") {
    const tickets = await ticketModel
      .find({ User_ID })
      .populate({
        path: "Trip_ID",
        populate: [
          { path: "Boarding_Station" },
          { path: "Destination_Station" },
          { path: "Organization_ID" },
        ],
      })
      .populate("Seat_Number");

    if (tickets) {
      let updatedTickets = [];
      let processedTripIDs = new Set();
      tickets.forEach((el) => {
        if (!processedTripIDs.has(el.Trip_ID._id)) {
          let count = 0;
          let totalPrice = tickets.reduce((acc, ticket) => {
            if (ticket.Trip_ID._id === el.Trip_ID._id) {
              acc += ticket.Seat_Number.Seat_Price;
              count += 1;
            }
            return acc;
          }, 0);

          processedTripIDs.add(el.Trip_ID._id);
          updatedTickets.push({
            ticket_id: el._id,
            trip_id: el.Trip_ID._id,
            boarding_station: el.Trip_ID.Boarding_Station.Station_Name,
            destination_station: el.Trip_ID.Destination_Station.Station_Name,
            trip_start_date: el.Trip_ID.Trip_Start_Date,
            trip_end_date: el.Trip_ID.Trip_End_Date,
            tickets_count: count,
            total_price: totalPrice,
          });
        }
      });

      res.status(200).json({
        message: "Success",
        data: updatedTickets,
      });
    } else
      res.status(204).json({
        message: "Success",
        data: "No data Found",
      });
    return;
  } else if (role === "superAdmin") {
    const tickets = await ticketModel
      .find()
      .populate({
        path: "Trip_ID",
        populate: [
          { path: "Boarding_Station" },
          { path: "Destination_Station" },
          { path: "Organization_ID" },
        ],
      })
      .populate("Seat_Number");
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
  } else if (role === "orgAdmin") {
    const tickets = await ticketModel
      .find({ Organization_ID: tokenUtil.verifyAndExtract(token).orgId })
      .populate({
        path: "Trip_ID",
        populate: [
          { path: "Boarding_Station" },
          { path: "Destination_Station" },
          { path: "Organization_ID" },
        ],
      })
      .populate("Seat_Number");
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
  } else {
    res.status(403).json({
      message: "Unauthorized",
    });
  }
});

export const getTickets = catchError(async (req, res, next) => {
  const tickets = await ticketModel
    .find()
    .populate({
      path: "Trip_ID",
      populate: [
        { path: "Boarding_Station" },
        { path: "Destination_Station" },
        { path: "Organization_ID" },
      ],
    })
    .populate("Seat_Number");
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
  let tickets = await ticketModel
    .findById(id)
    .populate({
      path: "Trip_ID",
      populate: [
        { path: "Boarding_Station" },
        { path: "Destination_Station" },
        { path: "Organization_ID" },
      ],
    })
    .populate("Seat_Number");
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
  let vehicle = await tripsModel.findById(Trip_ID);
  if (!vehicle) {
    res.status(404).json({
      message: "vehicle not found",
    });
    return;
  }
  let seats = await seatsModel
    .find({
      Vehicle_ID: vehicle.Vehicle_ID,
      Active_Seat: true,
      Status_Booked: false,
    })
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

// export const updateTicket = catchError(async (req, res, next) => {
//   const { id } = req.params;
//   const ticket = await ticketModel.findByIdAndUpdate(id, req.body, {
//     new: true,
//   });
//   if (ticket) {
//     res.status(200).json({
//       message: "Success",
//       data: ticket,
//     });
//   } else {
//     res.status(204).json({
//       message: "Success",
//       data: "No data Found",
//     });
//   }
// });

export const deleteTicket = catchError(async (req, res, next) => {
  const { id } = req.params;
  const token = req.headers.authorization.split(" ")[1];
  const ticket = await ticketModel.findById(id);
  if (ticket) {
    if (tokenUtil.verifyAndExtract(token).userId !== ticket.User_ID)
      res.status(401).json({
        message: "unauthorized",
      });
    await seatsModel.findByIdAndUpdate(
      ticket.Seat_Number,
      {
        Status_Booked: false,
      },
      { new: true }
    );
    await ticketModel.deleteOne({ _id: id });
    res.status(200).json({
      message: "Success",
      data: "Ticket Deleted Successfully",
    });
  } else {
    res.status(204).json({
      message: "Success",
      data: "No data Found",
    });
  }
});
