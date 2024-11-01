const mongoose = require("mongoose");

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

module.exports = Deduction;
