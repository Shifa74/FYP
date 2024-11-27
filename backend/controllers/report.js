import createError from "../middlewares/error.js";
import Report from "../models/report.js";
import { generateMontlyReport } from "../utils/generateMonthlyReport.js";

export const generateReport = async (req, res, next) => {
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

export const getReportList = async (req, res, next) => {
  try {
    const report = await Report.find();
    res.status(200).json(report);
  } catch (error) {
    next(error);
  }
};

export const getReportDetails = async (req, res, next) => {
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

export const deleteReport = async(req, res, next) => {
  try {
    await Report.findByIdAndDelete(req.params.id);
    res.status(200).json("Report has been deleted.")
  } catch (error) {
    next(error)
  }
}

