import Code from "../../models/code.model.js";


export default  async function showCodesWithPrices() {
  try {
    const codes = await Code.aggregate([
      // Descomponer el array de precios para poder ordenar y limitar
      { $unwind: "$price" },
      // Ordenar los precios de cada código por fecha en orden descendente
      { $sort: { "price.date": -1 } },
      // Agrupar nuevamente por código y tomar el primer precio (el más reciente)
      { 
        $group: {
          _id: "$_id",
          osis_code: { $first: "$osis_code" },
          type: { $first: "$type" },
          latestPrice: { $first: "$price" },
        }
      },
      { 
        $project: {
          osis_code: 1,
          type: 1,
          prices: {
            date: "$latestPrice.date",
            list: "$latestPrice.list"
          }
        }
      }
    ]);
    return codes;
  } catch (error) {
    throw new Error('Error al obtener los precios: ' + error.message);
  }
};