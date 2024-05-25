import ModelCar from "../../models/modelCar.model.js";

export async function listModelCars({brand_id}) {
    if(!brand_id) return await ModelCar.find({});
    const models = await ModelCar.find({brand_id})
    console.log("🚀 ~ listModelCars ~ models:", models)
    const modelsAdapter = models.map(model => {
        return {
            model: model.model
        }
    })
    return removeDuplicates(modelsAdapter, "model")
}

const removeDuplicates = (arr, key) => {
    const seen = new Set();
    return arr.filter(item => {
      const val = item[key];
      if (seen.has(val)) {
        return false;
      }
      seen.add(val);
      return true;
    });
  };