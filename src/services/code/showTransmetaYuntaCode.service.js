import Code from "../../models/code.model.js";
import requestOsis from "../../utils/requestOsis.js";

export async function showTransmetaYuntaCode({osis_code}) {
  const yunta_code = osis_code.replace(/^0/, 'Y');

  const stockTransmeta= await requestOsis({osis_code})
  const stockYunta = await requestOsis({osis_code: yunta_code})

  const query = { osis_code: { $in: [osis_code, yunta_code] } };

  const codes = await Code.find(query);
  if(codes.length===0) return {transmeta: null, yunta: null}
  const yunta = codes.find(code => code.type === "yunta-spring");
  const transmeta = codes.find(code => code.type === "transmeta-spring");
  return {
    transmeta:{
      id: transmeta._id,
      image: transmeta.image,
      type: transmeta.type,
      osis_code: transmeta.osis_code,
      price: transmeta.price[0].list[0].price,
      stock: stockTransmeta.recordset.reduce((acc, curr) => acc + curr.spa_salfin, 0)
    },
    yunta:{
      id: yunta._id,
      image: yunta.image,
      type: yunta.type,
      osis_code: yunta.osis_code,
      price: yunta.price[0].list[0].price || [],
      stock: stockYunta.recordset.reduce((acc, curr) => acc + curr.spa_salfin, 0)
    }
  }
}