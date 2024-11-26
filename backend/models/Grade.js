import mongoose from "mongoose";

const gradeSchema = new mongoose.Schema({
  gradeNo: {
    type: Number,
    required: true,
  },
  baseSalary: {
    type: Number,
    required: true,
  },
});

const Grade = mongoose.model("Grade", gradeSchema);

export default Grade;
