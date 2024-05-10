import { listBrands } from "../../services/brand/listBrands.service.js";

export default async function listBrandsGetController(req, res) {
    try {
        const allBrands = await listBrands();
        res.status(200).send(allBrands);
    } catch (error) {
        console.log("🚀 ~ listBrandsGetController ~ error:", error) 
        res.status(500).send({ message: error.message });
    }
}
    