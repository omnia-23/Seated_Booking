import express from "express";
import dbConnection from "./database/dbconnection.js";
import stationsRouter from "./src/routes/stations.routes.js";
import vehiclesRouter from "./src/routes/vehicles.routes.js";
const app = express();

dbConnection();
app.use(express.json());

app.use("/stations", stationsRouter);
app.use("/vehicles", vehiclesRouter);


app.use((error, req, res, next) => {
  const { message, status } = error;
  res.status(status || 500).json({ message });
});

app.listen(3000, () => {
  console.log("server is running");
});