import ModelCar from "../../models/modelCar.model.js";
export async function createModelCar(data) {
    const newModelCar = new ModelCar(data);
    
    return await newModelCar.save();
}