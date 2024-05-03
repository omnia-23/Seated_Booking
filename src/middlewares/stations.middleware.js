import { AppError, catchError } from "../utils/errorHandler.js";
import { stationsModel } from "../modules/stations.js";

export const getStations = catchError(async (req, res, next) => {
  const stations = await stationsModel.find();
  if (stations)
    res.status(200).json({
      message: "Success",
      data: stations,
    });
  else
    res.status(204).json({
      message: "Success",
      data: "No data Found",
    });
});

export const addStations = catchError(async (req, res, next) => {
  const stations = await stationsModel.create(req.body);
  if (stations)
    res.status(200).json({
      message: "Success",
      data: stations,
    });
  else next(new AppError("Something went Wrong ", 404));
});

export const updateStations = catchError(async (req, res, next) => {
  const { id } = req.params;
  const station = await stationsModel.findByIdAndUpdate(id, req.body, {
    new: true,
  });
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

export const deleteStations = catchError(async (req, res, next) => {
  const { id } = req.params;
  const station = await stationsModel.findByIdAndDelete(id);
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
