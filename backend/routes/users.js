import express from "express";
import { addUser, getUsers, updateUser, deleteUser } from "../controllers/users.js";

const router = express.Router();

router.post("/add", addUser);

router.get("/get", getUsers);

router.put("/edit/:id", updateUser);

router.delete("/delete/:id", deleteUser);

export default router;
