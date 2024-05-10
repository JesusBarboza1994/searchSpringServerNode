import showCodeById from "../../services/code/showCodeById.service.js";

export default async function showCodeByIdGetController(req, res) {
  try {
    const { id } = req.params;
    console.log("🚀 ~ showCodeByIdGetController ~ id:", id)
    const code= await showCodeById({id});
    res.status(200).send(code);
  } catch (error) {
    console.log("🚀 ~ showCodeByIdGetController ~ error:", error)
    res.status(500).send({ message: error.message });
  }
}