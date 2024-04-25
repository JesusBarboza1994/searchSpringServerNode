import Code from "../../models/code.model.js";
export default async function listCodes(req, res) {
  const codes = await Code.find({});
    const codesAdapter= codes.map(code => {
        return {
            id: code.id,
            img_url: code.image,
            position: code.position,
            price: code.price,
            version: code.version,
            type: code.type,
            product_id: code.product_id,
            osis_code: code.osis_code,
            cars: code.cars_ids
        }
    })

    return codesAdapter
}
