import listBrandsAndModels from "../../services/brand/listBrandAndModel.service.js";
import listCodes from "../../services/code/listCode.service.js";
import pagination from "../../utils/pagination.js";

export default async function listCodesGetController(req, res) {
  let positions = []
  let versions = []
  try {
    const {brand, model, version, position, start_year, end_year, page=1, items_per_page=20 } = req.query; 
    if(model && !brand) throw new Error("brand is required")
    
    const codes = await listCodes({brand, model, version, position, start_year, end_year})
    codes.forEach(code => {
      if(!positions.includes(code.position)) positions.push(code.position)
      if(!versions.includes(code.version)) versions.push(code.version)
    })
  
    const {brands, models} = await listBrandsAndModels({brand,model})
    const {paginatedItems,totalPages,totalItems} = pagination({itemsPerPage:items_per_page, page, items:codes})
    return res.status(200).send({ codes: paginatedItems,totalItems,totalPages, brands, models, positions, versions });
  } catch (error) {
    console.log("🚀 ~ listCodesGetController ~ error:", error)
    if(error.status == 400) return res.status(400).send({ success: false, errors: error.message, code: error.code })
    return res.status(500).send({ success: false, errors: error.message })
  }
}
