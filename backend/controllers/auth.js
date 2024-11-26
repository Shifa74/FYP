import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import createError from "../middlewares/error.js";

// SIGNUP

export const signup = async (req, res, next) => {
  // console.log(req.body);
  const { email, password, confirmPassword } = req.body;
  try {
    const adminExist = await Admin.findOne({ email: email });
    if (adminExist) {
      return next(createError(422, "Email already exists", "email"));
    } else if (password !== confirmPassword) {
      return next(createError(422, "Passwords do no match."));
    } else {
      const salt = bcrypt.genSaltSync(10);
      const hashedPassword = bcrypt.hashSync(password, salt);
      const newAdmin = new Admin({ email, password: hashedPassword });
      await newAdmin.save();
      const token = jwt.sign({ id: newAdmin._id }, process.env.JWT, { expiresIn: '1h' }); 
     res
       .cookie("access_token", token, {
         httpOnly: true,
       })
       .status(200)
       .json(newAdmin);
    }
  } catch (error) {
    next(error);
  }
};

// LOGIN

export const login = async (req, res, next) => {
  const { email, password,rememberMe } = req.body;
  try {
    const adminExist = await Admin.findOne({ email: email });
    if (!adminExist) return next(createError(400, "User not found.", "email"));

    const isMatch = await bcrypt.compare(password, adminExist.password);
    if (!isMatch)
      return next(createError(400, "Incorrect Password", "password"));

    const jwtExpiration = rememberMe ? '30d' : '1h';

    const token = jwt.sign({ id: adminExist._id }, process.env.JWT,  { expiresIn: jwtExpiration });
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

// LOGOUT

export const logout = (req, res, next) => {
  try {
    res.clearCookie("access_token");
    res.status(200).json({ message: "Successfully logged out." });
  } catch (error) {
    next(error);
  }
};

