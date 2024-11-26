import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema({
  employeeId: {
    type: Number,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
    required: true,
  },
  phoneNo: {
    type: Number,
    required: true,
  },
  deptName: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Department",
    required: true
  },
  gradeNo: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Grade",
    required: true
  },
  city: {
    type: String,
    required: true,
  },
  dateOfJoining: {
    type: Date,
    required: true,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

export default Employee;
