import searchCodes from "../../services/code/searchCodesService.js";

export default async function searchCodesGetController(req, res) {
    try {
        const { brand, model, version, year } = req.query;
        const searchResults = await searchCodes({ brand, model, version, year });
        console.log("🚀 ~ searchCodesGetController ~ searchResults:", searchResults)
        res.status(200).send(searchResults);
    } catch (error) {
        console.log("🚀 ~ searchCodesGetController ~ error:", error);
        res.status(500).send({ message: error.message });
    }
}
