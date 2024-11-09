const createError = require("../error");
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");
const { getWorkingDays } = require("../utils/workingDays");

// ADD ATTENDANCE
const addAttendance = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      employeeId: req.body.employeeId,
    });
    if (!employee) {
      return next(createError(404, "Employee not found."));
    }

    // Check if attendance record already exists for the same employee and date
    const existingAttendance = await Attendance.findOne({
      employeeId: employee._id,
      month: req.body.month,
      year: req.body.year,
    });
    if (existingAttendance) {
      return next(
        createError(400, "Attendance record already exists for this month.")
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
      "employeeId"
    );
    res.status(200).json(attendance);
  } catch (error) {
    next(error);
  }
};

// UPDATE ATTENDANCE

const editAttendance = async (req, res, next) => {
  try {
    const employee = await Employee.findOne({
      employeeId: req.body.employeeId,
    });
    if (!employee) {
      return next(createError(404, "Employee not found"));
    }

    const totalWorkingDays = getWorkingDays(req.body.month, req.body.year);
    const presentDays = req.body.presentDays;
    const absentDays = totalWorkingDays - presentDays;

    let attendance = await Attendance.findOne({
      employeeId: employee._id,
      month: req.body.month,
      year: req.body.year,
    });

    if (attendance) {
      // Attendance record exists, update it
      attendance.presentDays = presentDays;
      attendance.absentDays = absentDays;
      attendance = await attendance.save();
    } else {
      // Attendance record does not exist, create a new one
      attendance = new Attendance({
        employeeId: employee._id,
        month: req.body.month,
        year: req.body.year,
        presentDays,
        absentDays,
      });
      attendance = await attendance.save();
    }

    res.status(200).json(attendance);
  } catch (error) {
    console.log("Update Error:", error);
    next(error);
  }
};

// DELETE ATTENDANCE
const deleteAttendance = async (req, res, next) => {
  try {
    const employeeId = req.params.id;
    await Attendance.findByIdAndDelete(employeeId);
    res.status(200).json("Attendance deleted successfully");
  } catch (error) {
    next(error);
  }
};

// GET TOTAL WORKING DAYS

const workingDays = (req, res, next) => {
  const { month, year } = req.query;

  if (!month || !year) {
    return next(createError(400, "Month and year are required"));
  }
  try {
    const tworkDays = getWorkingDays(month, year);
    console.log(tworkDays);
    return res.status(200).json({ workingDays: tworkDays });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addAttendance,
  getAttendance,
  editAttendance,
  deleteAttendance,
  workingDays,
};
