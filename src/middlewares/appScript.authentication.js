import { CustomError } from "../utils/customError.js"

export default function appScriptAuthentication(req, res, next) {
  try {
    const key =  req.headers['x-api-key']
    console.log("ñaño",req.headers)
    if(key === process.env.API_KEY) next()
    else throw new CustomError("La llave es incorrecta", 400, 'INVALID_KEY')
  } catch (error) {
  console.log("🚀 ~ appScriptAuthentication ~ error:", error)
  }
}