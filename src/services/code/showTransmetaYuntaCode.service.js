import Code from "../../models/code.model.js";
import Osis from "../../utils/Osis.js";

export async function showTransmetaYuntaCode({osis_code}) {
  const yunta_code = osis_code.replace(/^0/, 'Y');

  const stockTransmeta= await Osis.getStock({osis_code})
  console.log("🚀 ~ showTransmetaYuntaCode ~ stockTransmeta:", stockTransmeta)
  const stockYunta = await Osis.getStock({osis_code: yunta_code})
  const query = { osis_code: { $in: [osis_code, yunta_code] } };

  const codes = await Code.find(query);
  if(codes.length===0) return {transmeta: null, yunta: null}
  const yunta = codes.find(code => code.type === "yunta-spring");
  const transmeta = codes.find(code => code.type === "transmeta-spring");
  const response ={
    transmeta:{
      id: transmeta._id,
      image: transmeta.image,
      type: transmeta.type,
      osis_code: transmeta.osis_code,
      price: transmeta.price[0].list[0].price,
      stock: stockTransmeta.recordset.map(data =>{
        return {
          warehouse: data.alm_codalm,
          quantity: data.spa_salfin
        }
      })
    }
  }
  if(yunta) response.yunta = {
      id: yunta._id,
      image: yunta.image,
      type: yunta.type,
      osis_code: yunta.osis_code,
      price: yunta.price[0]?.list[0].price,
      stock: stockYunta.recordset.map(data =>{
        return {
          warehouse: data.alm_codalm,
          quantity: data.spa_salfin
        }
      })
    }
  return response
}