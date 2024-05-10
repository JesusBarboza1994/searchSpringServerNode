import { createModelCar } from "../../services/modelCar/createModelCar.service.js";

export default async function createModelCarPostController(req, res) {
    try {
        // los datos del modelo de coche se envían en el cuerpo de la petición (req.body)
        const { model, start_year, end_year, brand_id } = req.body;

        // Validación
        if ( !model || !start_year || !end_year ) {
            return res.status(400).send({ message: 'All fields are required.' });
        }

        const data = { model, start_year, end_year, brand_id };
        const savedModelCar = await createModelCar(data);
        res.status(201).send({
            success: true,
            data: savedModelCar
        });
        
    } catch (error) {
        console.log("🚀 ~ createModelCarPostController ~ error:", error)
        res.status(500).send({ message: error.message });
    }

}
