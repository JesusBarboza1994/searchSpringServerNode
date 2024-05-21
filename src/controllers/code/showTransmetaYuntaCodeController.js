import {showTransmetaYuntaCode} from "../../services/code/showTransmetaYuntaCode.service.js";
import { CustomError } from "../../utils/customError.js";

const regex = /^\d{10}$/;
export default async function showTransmetaYuntaCodeController(req, res) {
  try {
    const { osis_code } = req.params;
    if (!regex.test(osis_code)) throw new CustomError('Invalid Osis Code', 400, 'INVALID_CODE')
    
    const response = await showTransmetaYuntaCode({osis_code});
    return res.status(200).send(response);
  } catch (error) {
    console.log("🚀 ~ showCodeByIdGetController ~ error:", error)
    if(error.status == 400) return res.status(400).send({ success: false, errors: error.message, code: error.code })
    return res.status(500).send({ success: false, errors: error.message })
  }
}