import listCodes from "../../services/code/listCodeService.js";

export default async function listCodesGetController(req, res) {
    try {
      const allCodes = await listCodes();
      console.log("🚀 ~ listCodesGetController ~ allCodes:", allCodes)
       res.status(200).send(allCodes);
    } catch (error) {
      console.log("🚀 ~ listCodesGetController ~ error:", error)
    
       res.status(500).send({ message: error.message });
     }
}
