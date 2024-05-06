import express from "express";
import dbConnection from "./database/dbconnection.js";
import stationsRouter from "./src/routes/stations.routes.js";
import vehiclesRouter from "./src/routes/vehicles.routes.js";
import userRouter from "./src/routes/users.routes.js";
import orgRouter from "./src/routes/organizations.routes.js";
import permissionRouter from "./src/routes/permissions.routes.js";
import dotenv from "dotenv";
import tripsRouter from "./src/routes/trips.routes.js";

const app = express();
dotenv.config();
dbConnection();
app.use(express.json());

app.use("/stations", stationsRouter);
app.use("/vehicles", vehiclesRouter);
app.use("/trips", tripsRouter);

app.use("/users", userRouter);
app.use("/org", orgRouter);
app.use("/permissions", permissionRouter);

app.use((error, req, res, next) => {
  const { message, status } = error;
  res.status(status || 500).json({ message });
});

app.listen(3000, () => {
  console.log("server is running");
});
