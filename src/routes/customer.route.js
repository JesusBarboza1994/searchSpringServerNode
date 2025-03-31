import express from "express";
import createOrUpdatePostCustomerController from "../controllers/customer/createOrUpdatePostCustomerController.js";
import Authentication from "../middlewares/auth.js";
const router = express.Router();

router.post("/", Authentication, createOrUpdatePostCustomerController);

export default router;