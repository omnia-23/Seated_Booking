import { stationsModel } from "../modules/stations.js";
import { tripsModel } from "../modules/trips.js";
import { catchError } from "../utils/errorHandler.js";
import tokenUtil from "../utils/tokenUtil.js";

export const searchTrips = catchError(async (req, res, next) => {
  let { from, to, date } = req.body;

  const [year, month, day] = date.split("-").map(Number);
  const normalizedDate = `${year}-${month}-${day}`;

  const boarding = await stationsModel.findById(from);

  if (!boarding) {
    return res.status(404).json({
      message: `Boarding station not found`,
    });
  }
  const destination = await stationsModel.findById(to);

  if (!destination) {
    return res.status(404).json({
      message: `Destination station not found `,
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

export const getTrip = catchError(async (req, res, next) => {
  const { id } = req.params;
  const trips = await tripsModel
    .findById(id)
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
  const trips = await tripsModel
    .find()
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

export const addTrips = catchError(async (req, res, next) => {
  req.body.Organization_ID = tokenUtil.verifyAndExtract(token).orgId;
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
