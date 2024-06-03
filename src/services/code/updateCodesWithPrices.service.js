import Code from "../../models/code.model.js";


export async function updateCodesWithPricesService({type, data}) {
  const promises = []  
  for (const value of data) {
      const newPriceEntry = {
        list: value.list,
        date: new Date() // Agrega la fecha actual
      };

      const response = Code.findOneAndUpdate({type, osis_code: value.osis_code},
        { $push: { 
          price: {
          $each: [newPriceEntry],
          $position: 0
          }
          }
        },
        { upsert: true },
        { new: true }
      )
      promises.push(response) 
    }

    const response = await Promise.all(promises);
    console.log("🚀 ~ updateCodesWithPricesService ~ response:", response)

    return { success: true };
}
