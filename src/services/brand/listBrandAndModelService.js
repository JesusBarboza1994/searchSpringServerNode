import { listModelCars } from "../modelCar/listModelCarService.js"
import showModel from "../modelCar/showModelCarService.js"
import { listBrands } from "./listBrandsService.js"
import showBrand from "./showBrandService.js"

export default async function listBrandsAndModels({brand,model}) {
  let brands = []
  let models = []
  if(brand){
    brands = await showBrand({brand})
    if(brands.length > 0){
      if (model){
        models = (await showModel({ model: model, brand_id:brands[0]._id})).map(model => model.model)
      }else{
        models = (await listModelCars({ brand_id:brands[0]._id})).map(model => model.model)
      }
    }
    brands = brands.map(brand => brand.name)
  }else{
    brands = (await listBrands()).map(brand => brand.name)
  }
 
  return {brands,models}
}