import mongoose from "mongoose";
import Code from "../../models/code.model.js";
export default async function showCodeById({id}) {
  const objectId = new mongoose.Types.ObjectId(id);
  const code = await Code.aggregate([
    { $match: { _id: objectId } },
    { $project: {
      "springs": "$springs",
      "code":{
        "id":"$id",
        "position":"$position",
        "version":"$version",
        "type":"$type",
        "image":"$image",
        "product_id":"$product_id",
        "osis_code":"$osis_code",
        "price":"$price"  
      },
    
     } },
  ])
  
  if(code.length===0) return {code: null}
  return {code:code[0].code,spring:code[0].spring}

}
