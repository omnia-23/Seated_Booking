import mongoose from "mongoose";

const connectionToDB = () => {
  mongoose
    // .connect("mongodb://localhost:27017/SeatedBooking")
    .connect(process.env.MONGO_DB, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: "SeatedBooking",
    })
    // .connect(process.env.MONGO_URL, {
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   dbName: "SeatsBooking",
    // })
    .then(() => console.log("Connected Successfully"))
    .catch((err) => {
      console.error(err);
    });
};

export default connectionToDB;
