import showCodeById from "../../services/code/showCodeByIdService.js";


export default async function showCodeByIdGetController(req, res) {
  try {
    const { id } = req.params;
    const code= await showCodeById({id});
    res.status(200).send(code);
  } catch (error) {
    console.log("🚀 ~ showCodeByIdGetController ~ error:", error)
    res.status(500).send({ message: error.message });
  }
}