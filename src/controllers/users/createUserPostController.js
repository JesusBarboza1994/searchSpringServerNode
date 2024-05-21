import { createUser } from "../../services/user/createUser.service.js";
import { CustomError } from "../../utils/customError.js";

export default async function createUserPostController(req, res) {
  try {
    const { username, email, password, user_type = 'user' } = req.body;
    const isAdmin = req.userType === 'admin'
    console.log("REQ", req)
    if (!isAdmin) throw new CustomError("No tiene permisos para crear un usuario", 400, 'NO_PERMISSIONS')
    const newUser = await createUser({ username, email, password, user_type });
    return res.status(201).json({ success: true, code: 'USER_CREATED', data: newUser });
  } catch (error) {
    console.log("🚀 ~ craeteUserPostController ~ error:", error)
    if(error.status == 400) return res.status(400).send({ success: false, errors: error.message, code: error.code })
    return res.status(500).send({ success: false, errors: error.message })
  }
}
