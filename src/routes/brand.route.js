import express from "express";
import listBrandsGetController from "../controllers/brand/ListBrandsGetController.js";
const router = express.Router();

router.get("/:search",listBrandsGetController)


export default router