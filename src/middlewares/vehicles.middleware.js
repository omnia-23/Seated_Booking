import { vehiclesModel } from "../modules/vehicles.js";
import { AppError, catchError } from "../utils/errorHandler.js";

export const getVehicles = catchError(async (req, res, next) => {
  const vehicles = await vehiclesModel.find();
  if (vehicles)
    res.status(200).json({
      message: "Success",
      data: vehicles,
    });
  else
    res.status(204).json({
      message: "Success",
      data: "No data Found",
    });
});

export const addVehicles = catchError(async (req, res, next) => {
  const vehicles = await vehiclesModel.create(req.body);
  if (vehicles)
    res.status(200).json({
      message: "Success",
      data: vehicles,
    });
  else next(new AppError("Something went Wrong ", 404));
});

export const updateVehicles = catchError(async (req, res, next) => {
  const { id } = req.params;
  const vehicles = await vehiclesModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (vehicles) {
    res.status(200).json({
      message: "Success",
      data: vehicles,
    });
  } else {
    res.status(204).json({
      message: "Success",
      data: "No data Found",
    });
  }
});

export const deleteVehicles = catchError(async (req, res, next) => {
  const { id } = req.params;
  const station = await vehiclesModel.findByIdAndDelete(id);
  if (station) {
    res.status(200).json({
      message: "Success",
      data: station,
    });
  } else {
    res.status(204).json({
      message: "Success",
      data: "No data Found",
    });
  }
});
