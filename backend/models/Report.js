const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({
  month: {
    type: Number,
    required: true,
  },
  year: {
    type: Number,
    required: true,
  },
  reportData: {
    type: Array,
    required: true,
  },
  generatedAt: {
    type: Date,
    default: Date.now(),
  },
});

const Report = mongoose.model("Report", reportSchema);
module.exports = Report;
