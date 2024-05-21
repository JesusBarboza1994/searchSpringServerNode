import { createModelCar } from "../../services/modelCar/createModelCar.service.js";
import { CustomError } from "../../utils/customError.js";

export default async function createModelCarPostController(req, res) {
    try {
        // los datos del modelo de coche se envían en el cuerpo de la petición (req.body)
        const { model, start_year, end_year, brand_id } = req.body;

        // Validación
        if ( !model || !start_year || !end_year ) throw new CustomError("Faltan datos", 400, 'INVALID_DATA')

        const data = { model, start_year, end_year, brand_id };
        const savedModelCar = await createModelCar(data);
        return res.status(201).send({
            success: true,
            data: savedModelCar
        });
        
    } catch (error) {
        console.log("🚀 ~ createModelCarPostController ~ error:", error)
        if(error.status == 400) return res.status(400).send({ success: false, errors: error.message, code: error.code })
        return res.status(500).send({ success: false, errors: error.message })
    }

}
