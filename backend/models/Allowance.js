const mongoose = require("mongoose");

const allowanceSchema = new mongoose.Schema({
  allowanceType: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
});

const Allowance = mongoose.model("Allowance", allowanceSchema);

module.exports = Allowance;