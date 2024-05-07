import { tripsModel } from "../modules/trips.js";
import { catchError } from "../utils/errorHandler.js";

export const searchTrips = catchError(async (req, res, next) => {
  let { from, to, date } = req.body;
  let Boarding = from.split("-")[1];
  let Destination = to.split("-")[1];

  const [year, month, day] = date.split("-").map(Number);
  const normalizedDate = `${year}-${month}-${day}`;

  const trips = await tripsModel.find({
    Boarding_Station_Name: Boarding,
    Destination_Station_Name: Destination,
    Trip_Start_Date: normalizedDate,
  });
  if (trips)
    res.status(200).json({
      message: "Success",
      data: trips,
    });
  else
    res.status(204).json({
      message: "Success",
      data: "No data Found",
    });
});

export const getTrips = catchError(async (req, res, next) => {
  const trips = await tripsModel.find();
  if (trips)
    res.status(200).json({
      message: "Success",
      data: trips,
    });
  else
    res.status(204).json({
      message: "Success",
      data: "No data Found",
    });
});

export const addTrips = catchError(async (req, res, next) => {
  const trips = await tripsModel.create(req.body);
  if (trips)
    res.status(200).json({
      message: "Success",
      data: trips,
    });
  else next(new AppError("Something went Wrong ", 404));
});

export const updateTrips = catchError(async (req, res, next) => {
  const { id } = req.params;
  const trips = await tripsModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (trips) {
    res.status(200).json({
      message: "Success",
      data: trips,
    });
  } else {
    res.status(204).json({
      message: "Success",
      data: "No data Found",
    });
  }
});

export const deleteTrips = catchError(async (req, res, next) => {
  const { id } = req.params;
  const trips = await tripsModel.findByIdAndDelete(id);
  if (trips) {
    res.status(200).json({
      message: "Success",
      data: trips,
    });
  } else {
    res.status(204).json({
      message: "Success",
      data: "No data Found",
    });
  }
});
