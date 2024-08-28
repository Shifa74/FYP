const createError = require("../error");
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

// ADD ATTENDANCE
const addAttendance = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      employee_id: req.body.employeeId,
    });
    if (!employee) {
      return next(createError(404, "Employee not found."));
    }
    // Check if attendance record already exists for the same employee and date
    const existingAttendance = await Attendance.findOne({
      employeeId: employee._id,
      date: req.body.date,
    });
    if (existingAttendance) {
      return next(
        createError(400, "Attendance record already exists for this date.")
      );
    }
    const employeeAttendance = new Attendance({
      ...req.body,
      employeeId: employee._id,
    });

    const savedAttendance = await employeeAttendance.save();
    res.status(200).json(savedAttendance);
  } catch (error) {
    next(error);
  }
};

// GET ATTENDANCES
const getAttendance = async (req, res, next) => {
  try {
    const attendance = await Attendance.find().populate(
      "employeeId",
      "employee_id"
    );
    res.status(200).json(attendance);
  } catch (error) {
    next(error);
  }
};

module.exports = { addAttendance, getAttendance };
