import express from "express";
import createOrUpdatePostCustomerController from "../controllers/customer/createOrUpdatePostCustomerController.js";
import Authentication from "../middlewares/auth.js";
import getCustomerByIdController from "../controllers/customer/getCustomerById.controller.js";

const router = express.Router();

router.post("/", Authentication, createOrUpdatePostCustomerController);
router.get("/:id", Authentication, getCustomerByIdController);
export default router;