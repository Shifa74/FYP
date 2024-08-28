const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true,
  },
  status: {
    type: String,
    enum: ['Present', 'Absent', 'Leave']
  },
  date: {
    type: Date,
    required: true
  },
  overTimeHours: {
    type: Number,
    required: true
  }
});

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;