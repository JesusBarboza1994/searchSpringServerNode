import express from "express";
import createUserPostController from "../controllers/users/createUserPostController.js"
import loginSessionPostController from "../controllers/users/loginSessionPostController.js"
import Authentication from "../middlewares/auth.js";

const router = express.Router()
router.post('/', Authentication ,createUserPostController)
router.post('/login', loginSessionPostController)

export default router
