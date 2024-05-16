import express from "express";
import createOrderPostController from "../controllers/order/createOrderPostController.js";
const router = express.Router();

router.post("/",createOrderPostController)
// TODO: Incluir middleware para el update
export default router