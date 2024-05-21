import { listModelCars } from "../../services/modelCar/listModelCar.service.js";
export default async function listModelCarsGetController(req, res) {
     try {
        const { brand_id } = req.params;
        const allModelCars = await listModelCars({ brand_id });
        
        return res.status(200).send(allModelCars);
     } catch (error) {
        console.log("🚀 ~ listModelCarsGetController ~ error:", error)
        if(error.status == 400) return res.status(400).send({ success: false, errors: error.message, code: error.code })
        return res.status(500).send({ success: false, errors: error.message })
     }
 }

