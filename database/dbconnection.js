import mongoose from "mongoose";
import dotenv from "dotenv";
const connectionToDB = () => {
  mongoose
    .connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "SeatsBooking",
    })
    .then(() => console.log("Connected Successfully"))
    .catch((err) => {
      console.error(err);
    });
};
export default connectionToDB;
