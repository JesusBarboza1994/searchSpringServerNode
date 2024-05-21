import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';
import { CustomError } from '../utils/customError.js';
import config from '../config.js';

const Authentication = (req, res, next) => {
  try {
    const is_token_valid = validateToken(req)
    if(is_token_valid) next()
    
  } catch (error) {
    console.log("🚀 ~ Authentication ~ error:", error)
    if(error.status == 400) return res.status(401).send({ success: false, status: 400, code: error.code , errors: error.message })
    return res.status(401).send({ success: false, status: 500, errors: error.message, code: error.code })
  }
}

function validateToken(req){
  const signature = req.get('Authorization');
  if(signature){
    const tokenAccess = signature.split(' ')[1];
    const payload = jwt.verify(tokenAccess, config.secretAccessKey)
    const user = User.findOne({username: payload.userName})
    if(user.tokenExpiresAt < new Date()) throw new CustomError("El token ha expirado", 400, 'TOKEN_EXPIRED')
    if(!user) throw new CustomError("El usuario no existe", 400, 'INVALID_USER')
    req.user = payload.userName;
    req.area = payload.area
    req.userType = payload.userType
    req.tokenAccess = tokenAccess;
    return true;
  }else{
    throw new CustomError("El token es incorrecto", 400, 'INVALID_TOKEN')
  }
}

export default Authentication