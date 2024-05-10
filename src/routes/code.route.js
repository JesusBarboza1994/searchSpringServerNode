import express from "express";
import showCodeByIdGetController from "../controllers/code/showCodeByIdGetController.js";
import listCodesGetController from "../controllers/code/listCodesGetController.js";
import showTransmetaYuntaCodeController from "../controllers/code/showTransmetaYuntaCodeController.js";

const router = express.Router();

router.get("/",listCodesGetController)
router.get("/show/:id",showCodeByIdGetController)
router.get("/transmeta-yunta/:osis_code",showTransmetaYuntaCodeController)
export default router