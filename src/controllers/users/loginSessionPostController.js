import { loginUser } from "../../services/user/loginUser.service.js";

export default async function loginSessionPostController(req, res) {
  try {
    const { email, password } = req.body;
    const session = await loginUser({ email, password });
    
    res.status(201).json({ success: true, code: 'SESSION_CREATED', data: session });
  } catch (error) {
    console.log("🚀 ~ loginSessionPostController ~ error:", error)
    if(error.status == 400) return res.status(400).send({ success: false, errors: error.message, code: error.code })
    return res.status(500).send({ success: false, errors: error.message })
  }
}