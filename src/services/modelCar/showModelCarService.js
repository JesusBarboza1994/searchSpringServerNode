import ModelCar from "../../models/modelCar.model.js";

export default async function showModel({model,brand_id}) {
  const modelData = await ModelCar.findOne({model,brand_id});
  if (!modelData) return [];
  return [modelData]
}