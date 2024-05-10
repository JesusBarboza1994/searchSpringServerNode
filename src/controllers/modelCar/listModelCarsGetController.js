import { listModelCars } from "../../services/modelCar/listModelCar.service.js";
export default async function listModelCarsGetController(req, res) {
     try {
        const { brand_id } = req.params;
        const allModelCars = await listModelCars({ brand_id });
        
        res.status(200).send(allModelCars);
     } catch (error) {
        console.log("🚀 ~ listModelCarsGetController ~ error:", error)
        
        res.status(500).send({ message: error.message });
     }
 }

