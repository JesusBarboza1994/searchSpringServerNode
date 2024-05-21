import showCodeById from "../../services/code/showCodeById.service.js";

export default async function showCodeByIdGetController(req, res) {
  try {
    const { id } = req.params;
    console.log("🚀 ~ showCodeByIdGetController ~ id:", id)
    const code= await showCodeById({id});
    return res.status(200).send(code);
  } catch (error) {
    console.log("🚀 ~ showCodeByIdGetController ~ error:", error)
    if(error.status == 400) return res.status(400).send({ success: false, errors: error.message, code: error.code })
    return res.status(500).send({ success: false, errors: error.message })
  }
}