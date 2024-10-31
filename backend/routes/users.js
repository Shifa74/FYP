const express = require("express");
const { addUser, getUsers, updateUser, deleteUser } = require("../controllers/users");

const router = express.Router();

router.post("/add", addUser);

router.get("/get", getUsers);

router.put("/edit/:id", updateUser);

router.delete("/delete/:id", deleteUser);

module.exports = router;
