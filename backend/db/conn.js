const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

const connectDB = async () => {
  try {
    const db = mongoose.connection;

    db.on("connecting", () => {
      console.log("Connecting to MongoDB...");
    });

    db.on("connected", () => {
      console.log("MongoDB connected successfully");
    });

    db.on("error", (err) => {
      console.error("MongoDB connection error:", err);
    });

    db.on("disconnected", () => {
      console.log("MongoDB disconnected");
    });

    process.on("SIGINT", async () => {
      await db.close();
      process.exit(0);
    });

    await mongoose.connect(process.env.MONGO);
    return db;
  } catch (err) {
    console.error("MongoDB connection error:", err);
    throw err;
  }
};

module.exports = connectDB;
