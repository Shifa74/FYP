const createError = require("../error");
const Report = require("../models/report");
const generateMontlyReport = require("../utils/generateMonthlyReport");

const generateReport = async (req, res, next) => {
  const { month, year } = req.body;
  const monthNumber = parseInt(month);
  const yearNumber = parseInt(year);
  try {
    const existingReport = await Report.findOne({ month, year });
    if (existingReport) {
      return next(
        createError(400, "Report for this month and year already exists.")
      );
    }
    const reportData = await generateMontlyReport(monthNumber, yearNumber);
    const newReport = new Report({
      month,
      year,
      reportData,
    });
    await newReport.save();
    res.status(200).json(newReport);
  } catch (error) {
    next(error);
  }
};

const getReportList = async (req, res, next) => {
  try {
    const report = await Report.find();
    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};

const getReportDetails = async (req, res, next) => {
  const { month, year } = req.query;

  const monthNumber = parseInt(month);
  const yearNumber = parseInt(year);
  try {
    const report = await Report.findOne({
      month: monthNumber,
      year: yearNumber,
    });
    if (!report) {
      return next(createError(404, "Report not found for this month."));
    }
    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};

module.exports = { generateReport, getReportList, getReportDetails };
