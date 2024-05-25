import express from "express";
import Authentication from "../middlewares/auth.js";
import createOrderPostController from "../controllers/order/createOrderPostController.js";
import listPendingOrdersGetController from "../controllers/order/listPendingOrdersGetController.js";
import cancelOrderPatchController from "../controllers/order/cancelOrderPatchController.js";
import updateOrder from "../controllers/order/approveOrderPutController.js";

const router = express.Router();
router.post("/",createOrderPostController)
router.get("/list", Authentication,listPendingOrdersGetController)
router.patch('/cancel/:id', Authentication, cancelOrderPatchController)
router.put('/update/:id', Authentication,updateOrder)
// TODO: Incluir middleware para el update
export default router
