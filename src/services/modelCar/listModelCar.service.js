import ModelCar from "../../models/modelCar.model.js";

export async function listModelCars({brand_id}) {
    if(!brand_id) return await ModelCar.find({});
    return await ModelCar.find({brand_id});
}