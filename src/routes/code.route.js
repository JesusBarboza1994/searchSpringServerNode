import express from "express";
import Authentication from "../middlewares/auth.js";
import showCodeByIdGetController from "../controllers/code/showCodeByIdGetController.js";
import listCodesGetController from "../controllers/code/listCodesGetController.js";
import showTransmetaYuntaCodeController from "../controllers/code/showTransmetaYuntaCodeController.js";
import { listCodesWithPriceGetController } from "../controllers/code/listCodesWithPriceGetController.js";
import updateCodesWithPricesPutController from "../controllers/code/updateCodesWithPricePutController.js";
import appScriptAuthentication from "../middlewares/appScript.authentication.js";
const router = express.Router();

router.get("/",listCodesGetController)
router.get("/show/:id",showCodeByIdGetController)
router.get("/transmeta-yunta/:osis_code",showTransmetaYuntaCodeController)
router.get("/prices", listCodesWithPriceGetController)
router.put("/prices/update", appScriptAuthentication, updateCodesWithPricesPutController)
export default router