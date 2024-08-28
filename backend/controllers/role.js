const createError = require("../error");
const Role = require("../models/Role");

const addRole = async (req, res, next) => {
  try {
    const role = await Role.findOne({ name: req.body.name });
    if (role) {
      return next(createError(422, "Role already exists."));
    }
    const newRole = new Role(req.body);
    const savedRole = await newRole.save();

    res.status(200).json(savedRole);
  } catch (error) {
    next(error);
  }
};

const getRoles = async (req, res, next) => {
  try {
    const roles = await Role.find();
    res.status(200).json(roles);
  } catch (error) {
    next(error);
  }
};
module.exports = { addRole, getRoles };
