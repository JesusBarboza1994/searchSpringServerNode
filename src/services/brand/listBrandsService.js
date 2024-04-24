import Brands from "../../models/brand.model.js";

export async function listBrands() {
    const brands = await Brands.find({});
    const brandsAdapter= brands.map(brand => {
        return {
            id: brand.id,
            name: brand.name,
            img_url: brand.image
        }
    })

    return brandsAdapter
}
