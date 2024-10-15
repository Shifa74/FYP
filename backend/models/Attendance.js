const mongoose = require("mongoose");
const { getWorkingDays } = require("../utils/workingDays");

const attendanceSchema = new mongoose.Schema(
  {
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    presentDays: {
      type: Number,
      required: true,
    },
    month: {
      type: Number,
      min: 1,
      max: 12,
      required: true,
    },
    year: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: { virtuals: true },
  }
);


// virtual field for absentDays

attendanceSchema.virtual("absentDays").get(function () {
  const totalWorkingDays = getWorkingDays(this.month, this.year);
  return totalWorkingDays - this.presentDays;
});

// attendanceSchema.set("toJSON", { virtuals: true });
attendanceSchema.set("toObject", { virtuals: true });

const Attendance = mongoose.model("Attendance", attendanceSchema);

module.exports = Attendance;
