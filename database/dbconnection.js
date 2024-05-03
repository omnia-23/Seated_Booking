import mongoose from "mongoose";

const connectionToDB = () => {
  mongoose
    .connect("mongodb://localhost:27017/SeatedBooking")
    .then(() => console.log("Connected to database"))
    .catch((err) => {
      console.log(err);
    });
};

export default connectionToDB;
