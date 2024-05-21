import { listBrands } from "../../services/brand/listBrands.service.js";

export default async function listBrandsGetController(req, res) {
    try {
        const {search} = req.query
        const allBrands = await listBrands({search});
        return res.status(200).send(allBrands);
    } catch (error) {
        console.log("🚀 ~ listBrandsGetController ~ error:", error) 
        if(error.status == 400) return res.status(400).send({ success: false, errors: error.message, code: error.code })
        return res.status(500).send({ success: false, errors: error.message })
    }
}
    