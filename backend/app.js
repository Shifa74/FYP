const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const passResetRoutes = require("./routes/passReset");
const employeeRoutes = require("./routes/employee");
const attendanceRoutes = require("./routes/attendace");
const deptRoutes = require("./routes/department");
const gradeRoutes = require("./routes/grade");
const allowanceRoutes = require("./routes/allowance");
const deductionRoutes = require("./routes/deduction");
const usersRoutes = require("./routes/users");
const salaryRoutes = require("./routes/salary");
const reportRoutes = require("./routes/report");
const dashboradRoutes = require("./routes/dashboard");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/conn");
const app = express();

dotenv.config({ path: "./config.env" });

app.use(express.json());
app.use(cookieParser());
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
app.use("/api/dashboard", dashboradRoutes);

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
