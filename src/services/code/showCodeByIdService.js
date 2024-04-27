import Code from "../../models/code.model.js";
import TransmetaSpring from "../../models/transmetaSpring.model.js";

export default async function showCodeById({id}) {
  const code = await Code.aggregate([
    { $match: { id: id } },
    {
      $lookup: {
        from: "transmeta-springs",
        localField: "id", //corresponde a la coleccion code
        foreignField: "code_id", //corresponde a la coleccion transmeta_springs
        as: "transmeta_springs",
      },
    },
    {
     $unwind: "$transmeta_springs",  
    },
    { $project: {
      "code":{
        "id":"$id",
        "position":"$position",
        "version":"$version",
        "type":"$type",
        "image":"$image",
        "product_id":"$product_id",
        "osis_code":"$osis_code",
        "price":"$price"  
      }
     } },
  ])
  return {code:code[0].code,spring:code[0].spring}

}
