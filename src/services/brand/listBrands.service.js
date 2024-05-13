import Brands from "../../models/brand.model.js";

export async function listBrands({search}) {
    if(search){
        const regex = new RegExp(search, "i");
        return await Brands.find({ name: { $regex: regex } });
    }
    const brands = await Brands.find({});
    const brandsAdapter= brands.map(brand => {
        return {
            name: brand.name,
            img_url: brand.image
        }
    })

    return brandsAdapter
}
