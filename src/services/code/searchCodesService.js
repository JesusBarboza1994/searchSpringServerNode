
export default async function searchCodes({ q, brand, model, version, year }) {
      try {
          const aggregation = [
              {
                  $lookup: {
                      from: 'cars', // nombre de la colección de MongoDB para el modelo Car
                      localField: 'cars', // campo en Code
                      foreignField: '_id', // campo en Car
                      as: 'carDetails'
                  }
              },
              {
                  $unwind: "$carDetails"
              },
              {
                  $lookup: {
                      from: 'brands', // nombre de la colección para el modelo Brand
                      localField: 'carDetails.brand', // campo en Car
                      foreignField: '_id', // campo en Brand
                      as: 'carDetails.brandDetails'
                  }
              },
              {
                  $unwind: "$carDetails.brandDetails"
              },
              {
                  $match: {}
              }
          ];
  
          // Agregar condiciones de búsqueda dinámicas basadas en la entrada
          if (brand) {
              aggregation[4].$match['carDetails.brandDetails.name'] = brand;
          }
          if (model) {
              aggregation[4].$match['carDetails.model'] = new RegExp(model, 'i'); // Búsqueda tipo LIKE
          }
          if (version) {
              aggregation[4].$match['version'] = version;
          }
          if (year) {
              aggregation[4].$match['carDetails.init_year'] = { $lte: Number(year) };
              aggregation[4].$match['carDetails.end_year'] = { $gte: Number(year) };
          }
  
          const codes = await Code.aggregate(aggregation);
          return codes;
      } catch (error) {
          console.error("Error finding codes:", error);
          throw error;
      }
  }
  

  