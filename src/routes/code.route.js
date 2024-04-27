import express from "express";
import showCodeByIdGetController from "../controllers/code/showCodeByIdGetController.js";
import searchCodes from "../controllers/code/searchCodesGetController.js"
import listCodesGetController from "../controllers/code/listCodesGetController.js";

const router = express.Router();

router.get("/",listCodesGetController)
router.get("/:id",showCodeByIdGetController)
router.get('/search', searchCodes);

export default router