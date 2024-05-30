import showCodesWithPrices from "../../services/code/listCodesWithPrice.service.js";


export async function listCodesWithPriceGetController(req, res) {
  try {
    const prices = await showCodesWithPrices();
    return res.status(200).send({ success: true, data: prices });
  } catch (error) {
    console.log("🚀 ~ listCodesWithPriceGetController ~ error:", error)
    if(error.status == 400) return res.status(400).send({ success: false, errors: error.message, code: error.code })
    return res.status(500).send({ success: false, errors: error.message })
  }
}