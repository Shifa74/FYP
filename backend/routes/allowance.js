import express from 'express';
import{
  addAllowance,
  getAllowances,
  editAllowance,
  deleteAllowance,
} from "../controllers/allowance.js"

const router = express.Router();

router.post("/add", addAllowance);

router.get("/get", getAllowances);

router.put("/edit/:id", editAllowance);

router.delete("/delete/:id", deleteAllowance);

export default router;
