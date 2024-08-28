const express = require("express");
const dotenv = require("dotenv");
const authRoutes = require("./routes/auth");
const passResetRoutes = require("./routes/passReset");
const employeeRoutes = require("./routes/employee");
const attendanceRoutes = require("./routes/attendace");
const deptRoutes = require("./routes/department");
const gradeRoutes = require("./routes/grade");
const cookieParser = require("cookie-parser");
const app = express();

dotenv.config({ path: "./config.env" });
require("./db/conn");

app.use(express.json());
app.use(cookieParser());
app.use("/api/auth", authRoutes);
app.use("/api", passResetRoutes);
app.use("/api/employee", employeeRoutes);
app.use("/api/attendance", attendanceRoutes);
app.use("/api/employee/grade", gradeRoutes);
app.use("/api/admin/dept", deptRoutes);

app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Something went wrong!";
  const field = err.field || null;
  return res.status(status).json({
    success: false,
    status,
    message,
    field
  });
});



app.listen(8800, () => {
  console.log("App is runnig on port no 8800");
});
