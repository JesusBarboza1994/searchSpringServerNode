import {showTransmetaYuntaCode} from "../../services/code/showTransmetaYuntaCode.service.js";

const regex = /^\d{10}$/;
export default async function showTransmetaYuntaCodeController(req, res) {
  try {
    const { osis_code } = req.params;
    if (!regex.test(osis_code)) return {
      status: 400,
      message: 'Invalid Osis Code'
    }
    
    const response = await showTransmetaYuntaCode({osis_code});
    res.status(200).send(response);
  } catch (error) {
    console.log("🚀 ~ showCodeByIdGetController ~ error:", error)
    res.status(500).send({ message: error.message });
  }
}