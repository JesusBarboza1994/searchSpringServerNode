import express from "express";
import Authentication from "../middlewares/auth.js";
import createOrderPostController from "../controllers/order/createOrderPostController.js";
import listPendingOrdersGetController from "../controllers/order/listPendingOrdersGetController.js";

const router = express.Router();
router.post("/",createOrderPostController)
router.get("/list", Authentication,listPendingOrdersGetController)
// TODO: Incluir middleware para el update
export default router
