import { listBrands } from "../../services/brand/listBrandsService.js";
import listCodes from "../../services/code/listCodeService.js";

export default async function listCodesGetController(req, res) {
    try {
      const {brand, model, version, position, start_year, end_year, page=1 } = req.query; 
      if(model && !brand) throw new Error("brand is required")

      const codes = await listCodes({version, position})
      let brands = []
      if(brand){
        brands = [brand]
      }else{
        brands = await listBrands()
        brands = brands.map(brand => brand.name)
      }
      
       res.status(200).send({ codes, brands});
    } catch (error) {
      console.log("🚀 ~ listCodesGetController ~ error:", error)
    
      res.status(500).send({ message: error.message });
    }
}
