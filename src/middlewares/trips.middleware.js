import { populate } from "dotenv";
import { stationsModel } from "../modules/stations.js";
import { tripsModel } from "../modules/trips.js";
import { catchError } from "../utils/errorHandler.js";

//TODO : handle the get trip response
export const searchTrips = catchError(async (req, res, next) => {
  let { from, to, date } = req.body;
  let Boarding = from.split("-");
  let Destination = to.split("-");

  const [year, month, day] = date.split("-").map(Number);
  const normalizedDate = `${year}-${month}-${day}`;

  const boarding = await stationsModel.findOne({
    Governorate_Name: Boarding[0],
    Station_Name: Boarding[1],
  });

  if (!boarding) {
    return res.status(404).json({
      message: `Boarding station '${Boarding[1]}' not found in governorate '${Boarding[0]}'`,
    });
  }
  const destination = await stationsModel.findOne({
    Governorate_Name: Destination[0],
    Station_Name: Destination[1],
  });

  if (!destination) {
    return res.status(404).json({
      message: `Destination station '${Destination[1]}' not found in governorate '${Boarding[0]}'`,
    });
  }

  const trips = await tripsModel
    .find({
      Boarding_Station: boarding._id,
      Destination_Station: destination._id,
      Trip_Start_Date: normalizedDate,
    })
    .populate({ path: "Vehicle_ID", populate: { path: "Organization_ID" } })
    .populate("Boarding_Station")
    .populate("Destination_Station");
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
