import listBrandsAndModels from "../../services/brand/listBrandAndModelService.js";
import listCodes from "../../services/code/listCodeService.js";
import pagination from "../../utils/pagination.js";

export default async function listCodesGetController(req, res) {
  let positions = []
  let versions = []
  try {
    const {brand, model, version, position, start_year, end_year, page=1, items_per_page=20 } = req.query; 
    if(model && !brand) throw new Error("brand is required")
    
    const codes = await listCodes({brand, model, version, position, start_year, end_year})
    codes.forEach(code => {
      if(!positions.includes(code.position ? "POST" : "DEL")) positions.push(code.position ? "POST" : "DEL")
      if(!versions.includes(code.version)) versions.push(code.version)
    })
  
    const {brands, models} = await listBrandsAndModels({brand,model})
    const {paginatedItems,totalPages,totalItems} = pagination({itemsPerPage:items_per_page, page, items:codes})
    res.status(200).send({ codes: paginatedItems,totalItems,totalPages, brands, models, positions, versions });
  } catch (error) {
    console.log("🚀 ~ listCodesGetController ~ error:", error)
  
    res.status(500).send({ message: error.message });
  }
}
