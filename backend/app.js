import express from "express";
import dotenv from "dotenv";

import {
  allowanceRoutes,
  deductionRoutes,
  authRoutes,
  dashboardRoutes,
  deptRoutes,
  reportRoutes,
  gradeRoutes,
  protectedRoutes,
  salaryRoutes,
  attendanceRoutes,
  employeeRoutes,
  usersRoutes,
  notificationRoutes,
  passResetRoutes,
} from "./routes/index.js";

import cookieParser from "cookie-parser";
import connectDB from "./db/conn.js";
const app = express();

dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(cookieParser());
app.use("/api", protectedRoutes);
app.use("/api/auth", authRoutes);
app.use("/api", passResetRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/grade", gradeRoutes);
app.use("/api/dept", deptRoutes);
app.use("/api/allowance", allowanceRoutes);
app.use("/api/deduction", deductionRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/salary", salaryRoutes);
app.use("/api/report", reportRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/notifications", notificationRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  const field = err.field || null;
  return res.status(status).json({
    success: false,
    status,
    message,
    field,
  });
});

const startServer = async () => {
  try {
    console.log("Starting server...");
    const db = await connectDB();

    if (!db.readyState) {
      throw new Error("Database connection failed");
    }

    app.listen(8800, () => {
      console.log("App is running on port no 8800");
    });
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});

startServer();
