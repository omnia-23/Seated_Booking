import { vehiclesModel } from "../modules/vehicles.js";
import { AppError, catchError } from "../utils/errorHandler.js";
import tokenUtil from "../utils/tokenUtil.js";

export const getVehicle = catchError(async (req, res, next) => {
  const { id } = req.params;
  const vehicles = await vehiclesModel.findById(id).populate("Organization_ID");
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

export const getVehicles = catchError(async (req, res, next) => {
  const vehicles = await vehiclesModel.find().populate("Organization_ID");
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
  return;
});

export const addVehicles = catchError(async (req, res, next) => {
  const token = req.headers.authorization.split(" ")[1];
  req.body.Organization_ID = tokenUtil.verifyAndExtract(token).orgId;
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
  const station = await vehiclesModel.findByIdAndUpdate(
    id,
    { Active_Vehicle: false },
    { new: true }
  );
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
