import Code from "../../models/code.model.js";
import Brand from "../../models/brand.model.js";
export default async function listCodes({brand, model, version, position, start_year, end_year}) {
    let query = {}
		if(brand) query.brand = brand
		if(model) query.model = model
    if(position) query.position = position
    if(version) query.version = version

    const codes = await Code.aggregate([
        {
          $lookup: {
            from: "car-brand-models",
            localField: "cars_ids",
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
						"position":"$position",
						"version":"$version",
						"product_id":"$product_id",
						"model":"$cars.model",
						"brand":"$cars.brand.name",
						"start_year":"$cars.start_year",
						"end_year":"$cars.end_year",
						"price":"$price"
        	}
				},{
					$match: query
				}
      ]);



    return codes
}