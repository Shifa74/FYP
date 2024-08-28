const mongoose = require("mongoose");

const DB = process.env.MONGO

mongoose.set("strictQuery", false);
mongoose
  .connect(DB)
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log("No connection");
  });
