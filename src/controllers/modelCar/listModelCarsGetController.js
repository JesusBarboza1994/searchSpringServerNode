import { listModelCars } from "../../services/modelCar/listModelCarService.js";
export default async function listModelCarsGetController(req, res) {
     try {
        const { brand_id } = req.params;
        const allModelCars = await listModelCars({ brand_id });
        //  console.log("🚀 ~ listModelCarsGetController ~ allModelCars:", allModelCars)
         res.status(200).send(allModelCars);
     } catch (error) {
        console.log("🚀 ~ listModelCarsGetController ~ error:", error)
         res.status(500).send({ message: error.message });
     }
 }

