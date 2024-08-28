const Admin = require("../models/Admin");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const  createError  = require("../error");

// SIGNUP

const signup = async (req, res, next) => {
  console.log(req.body)
  const { email, password, confirmPassword } = req.body;
  try {
    adminExist = await Admin.findOne({ email: email });
    if (adminExist) {
      return next(createError(422, "Email already exists", "email"));
    } else if (password !== confirmPassword) {
      return next(createError(422, "Passwords do no match."));
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newAdmin = new Admin({ email, password: hashedPassword });
      await newAdmin.save();
      res.status(200).json(newAdmin);
    }
  } catch (error) {
    next(error);
  }
};

// LOGIN

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const adminExist = await Admin.findOne({ email: email });
    if (!adminExist) return next(createError(400, "User not found.", "email"));
    

    const isMatch = await bcrypt.compare(password, adminExist.password);
    if (!isMatch) return next(createError(400, "Incorrect Password", "password"));
    

    const token = jwt.sign({ id: adminExist._id }, process.env.JWT);
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json(adminExist);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  login,
};
