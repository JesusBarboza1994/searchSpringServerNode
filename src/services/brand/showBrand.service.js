import Brand from "../../models/brand.model.js";

export default async function showBrand({brand}) {
  const brandData = await Brand.findOne({name:brand});
  if (!brandData) return [];
  return [brandData]
}