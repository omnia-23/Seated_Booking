import { seatsModel } from "../modules/seats.js";
import { AppError, catchError } from "../utils/errorHandler.js";

export const getSeats = catchError(async (req, res, next) => {
  let seats = await seatsModel
    .find({ Active_Seat: true })
    .populate("Vehicle_ID");
  if (seats) {
    res.status(200).json({
      message: "Success",
      data: {
        seats,
      },
    });
  } else
    res.status(204).json({
      message: "Success",
      data: "No data Found",
    });
});

export const addSeats = catchError(async (req, res, next) => {
  const seats = await seatsModel.create(req.body);
  if (seats)
    res.status(200).json({
      message: "Success",
      data: seats,
    });
  else next(new AppError("Something went Wrong ", 404));
});

export const updateSeats = catchError(async (req, res, next) => {
  const { id } = req.params;
  const seats = await seatsModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (seats) {
    res.status(200).json({
      message: "Success",
      data: seats,
    });
  } else {
    res.status(204).json({
      message: "Success",
      data: "No data Found",
    });
  }
});

export const deleteSeats = catchError(async (req, res, next) => {
  const { id } = req.params;
  const seats = await seatsModel.findByIdAndUpdate(
    id,
    { Active_Seat: false },
    { new: true }
  );
  if (seats) {
    res.status(200).json({
      message: "Success",
      data: seats,
    });
  } else {
    res.status(204).json({
      message: "Success",
      data: "No data Found",
    });
  }
});
