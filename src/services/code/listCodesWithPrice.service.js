import Code from "../../models/code.model.js";

export default async function showCodesWithPrices() {
  try {
    // Consulta todos los códigos con los campos necesarios
    const codes = await Code.find({}, 'id osis_code type price');
    if (codes.length === 0) {
      return {
        success: true,
        data: {
          transmeta: [],
          yunta: []
        }
      };
    }

    const transmetaArray = [];
    const yuntaArray = [];

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    };

    const getLatestPrice = (prices) => {
      if (!prices || prices.length === 0) return null;
      const latestPrice = prices.reduce((latest, current) => current.date > latest.date ? current : latest, prices[0]);
      return {
        date: formatDate(latestPrice.date),
        list: latestPrice.list
      };
    };

    codes.forEach(code => {
      if (code.type && code.type.includes('transmeta')) {
        if(code.price.length==0) {
          transmetaArray.push([code.osis_code, "-", 0, 0, 0, 0]);
          return
        }
        const prices = getLatestPrice(code.price);
        // console.log("🚀 ~ showCodesWithPrices ~ code:", code)
        // console.log("🚀 ~ showCodesWithPrices ~ prices:", prices)
        transmetaArray.push(
          [code.osis_code, 
            prices.date, 
            prices.list[0].price, 
            prices.list[1].price, 
            prices.list[2].price, 
            prices.list[3].price
          ], 
          );
      } else if (code.type && code.type.includes('yunta')) {
        const prices = getLatestPrice(code.price);
        if(code.price.length==0) {
          yuntaArray.push([code.osis_code, "-", 0, 0, 0, 0]);
          return
        }
        yuntaArray.push(
          [code.osis_code, 
          prices.date, 
          prices.list[0].price, 
          prices.list[1].price, 
          prices.list[2].price, 
          prices.list[3].price
        ]);
      }
    })
    // Filtra los códigos según el tipo
    const transmetaCodes = codes.filter(code => code.type.includes('transmeta'));
    const yuntaCodes = codes.filter(code => code.type.includes('yunta'));

    // Mapea y estructura los códigos de transmeta
    const transmeta = transmetaCodes.map(code => ({
      type: code.type,
      osis_code: code.osis_code,
      prices: getLatestPrice(code.price)
    }));

    // Mapea y estructura los códigos de yunta
    const yunta = yuntaCodes.map(code => ({
      type: code.type,
      osis_code: code.osis_code,
      prices: getLatestPrice(code.price)
    }));

    // Devuelve la respuesta estructurada
    return {
        transmeta: transmetaArray,
        yunta: yuntaArray
    };
    
  } catch (error) {
    console.log("🚀 ~ showCodesWithPrices ~ error:", error)
    return {
      success: false,
      errors: 'Error al obtener los códigos: ' + error.message
    };
  }
}
