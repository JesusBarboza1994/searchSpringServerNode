import Code from "../../models/code.model.js";
import Brand from "../../models/brand.model.js";
export default async function listCodes({position, version}) {
    let query = {}
    if(position) query.position = position
    if(version) query.version = version
    
    const codes = await Code.find(query)
    .populate({
        path: 'cars_ids',  // Poblamos primero los Car
        populate: {
        path: 'brand_id',  // Luego poblamos Brand dentro de cada Car
        model: Brand  // Asegúrate de especificar el modelo correcto
        }
    });
    return codes
}