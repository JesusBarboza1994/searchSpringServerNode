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
      "spring": {
        "wire": "$transmeta_springs.wire",
        "free_length": "$transmeta_springs.free_length",
        "dext_1": "$transmeta_springs.dext_1",
        "dext_2": "$transmeta_springs.dext_2",
        "dint_1": "$transmeta_springs.dint_1",
        "dint_2": "$transmeta_springs.dint_2",
        "id": "$transmeta_springs.id",
        "n": "$transmeta_springs.n",
      },
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
