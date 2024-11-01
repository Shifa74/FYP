const createError = require("../error");
const User = require("../models/Users");

const addUser = async (req, res, next) => {
  try {
    const userExist = await User.findOne({ email: req.body.email });
    if (userExist) {
      return next(createError(422, "Email already exists"));
    } else {
      const newUser = new User(req.body);
      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (error) {
    next(error);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

const updateUser = async (req, res, next) => {
  const userId = req.params.id;
  try {
    // Check for the current user record
    const existingUser = await User.findById(userId);
    if (!existingUser) {
      return next(createError(404, "User not found"));
    }

    // Check if the email is being changed
    if (req.body.email && req.body.email !== existingUser.email) {
      // Check if the new email already exists in the database
      const emailExists = await User.findOne({ email: req.body.email });
      if (emailExists) {
        return next(createError(422, "User with this email already exists."));
      }
    }
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: req.body,
      },
      {
        new: true,
      }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    next(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id;
    await User.findByIdAndDelete(userId);
    res.status(200).json("User has been deleted.");
  } catch (error) {
    next(error);
  }
};

module.exports = { addUser, getUsers, updateUser, deleteUser };
