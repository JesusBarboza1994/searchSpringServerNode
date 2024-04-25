import express from "express";
import showCodeByIdGetController from "../controllers/code/showCodeByIdGetController.js";

import listCodesGetController from "../controllers/code/listCodesGetController.js";
const router = express.Router();

router.get("/",listCodesGetController)
router.get("/:id",showCodeByIdGetController)

export default router