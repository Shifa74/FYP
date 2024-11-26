import mongoose from 'mongoose';

const deductionSchema = new mongoose.Schema({
  deductionType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Deduction = mongoose.model("Deduction", deductionSchema);

export default Deduction;
