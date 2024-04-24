import ModelCar from "../../models/modelCar.model.js";

export async function listModelCars({brand_id}) {
    return await ModelCar.find({brand_id});
}