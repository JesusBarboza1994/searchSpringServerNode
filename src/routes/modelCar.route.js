import express from "express";
import createModelCarPostController from "../controllers/modelCar/createModelCarPostController.js";
import listModelCarsGetController from "../controllers/modelCar/listModelCarsGetController.js";

const router = express.Router();

router.post("/",createModelCarPostController)
router.get("/:brand_id",listModelCarsGetController)


export default router