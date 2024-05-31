import {updateCodesWithPricesService} from "../../services/code/updateCodesWithPrices.service.js";


export default async function updateCodesWithPricesPutController(req, res) {
  try {
    const {type, data} = req.body
    const codes = await updateCodesWithPricesService({type, data});
    return res.status(200).send({ success: true, data: codes });
  } catch (error) {
    console.log("🚀 ~ updateCodesWithPrices ~ error:", error)
    if(error.status == 400) return res.status(400).send({ success: false, errors: error.message, code: error.code })
    return res.status(500).send({ success: false, errors: error.message })
  }

}