import { Router } from "express";
import {
  addStations,
  deleteStations,
  getStations,
  updateStations,
} from "../middlewares/stations.middleware.js";
import { Validation } from "../utils/validation.js";
import {
  addStationsSchema,
  updateStationsSchema,
} from "../validations/station.validation.js";
// import upload from "../utils/multer.js";
import { parseFile } from "../utils/parseCSV.js";
const stationsRouter = Router();

stationsRouter
  .get("/", getStations)
  .post("/", Validation(addStationsSchema), addStations)
  .put("/:id", Validation(updateStationsSchema), updateStations)
  .delete("/:id", deleteStations);

// .post("/upload", upload.array("files", 5), parseFile);
export default stationsRouter;
