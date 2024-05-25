import Brands from "../../models/brand.model.js";

export async function listBrands({search}) {
    console.log("🚀 ~ listBrands ~ search:", search)
    let query = {}
    if (search) query.name = { $regex: new RegExp(search, "i") };
    const brands = await Brands.find(query);
    const brandsAdapter= brands.map(brand => {
        return {
            id: brand._id,
            name: brand.name,
            img_url: brand.image
        }
    })

    return brandsAdapter
}
