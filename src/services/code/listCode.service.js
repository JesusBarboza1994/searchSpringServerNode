import Code from "../../models/code.model.js"

export default async function listCodes({brand, model, version, position, start_year, end_year}) {
    let query = {}
		if(brand){
      const regex = new RegExp(brand, "i");
      query.brand = { $regex: regex };
    } 
		if(model){
      const regex = new RegExp(model, "i");
      query.model = { $regex: regex };
    } 
    if(position) query.position = position
    if(version) query.version = version
    if(start_year) query.start_year = {$gte: start_year}
    if(end_year) query.end_year = {$lte: end_year}

    const codes = await Code.aggregate([
        { $match: {type:"transmeta-spring"}},
        { $unwind: "$cars_ids" },
        {
          $lookup: {
            from: "car-models",
            localField: "cars_ids.car_id",
            foreignField: "_id",
            as: "cars"
          }
        },
        { $unwind: "$cars" },
        {
          $lookup: {
            from: "car-brands",
            localField: "cars.brand_id",
            foreignField: "_id",
            as: "cars.brand"
          }
        },
        { $unwind: "$cars.brand" },
        
        {
        	$project: {
						"id":"$id",
						"osis_code":"$osis_code",
						"img_url":"$image",
						"position":"$cars_ids.position",
						"version":"$cars_ids.version",
            "type":"$type",
						"product_id":"$product_id",
						"model":"$cars.model",
						"brand":"$cars.brand.name",
						"start_year":"$cars.start_year",
						"end_year":"$cars.end_year",
            "price": {
              $let: {
                vars: {
                  firstPrice: { $arrayElemAt: ["$price", 0] }
                },
                in: { $arrayElemAt: ["$$firstPrice.list.price", 0] }
              }
            }
        	}
				},
        {
					$match: query
				}
      ]);



    return codes
}