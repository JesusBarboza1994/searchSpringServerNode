import bcrypt from 'bcrypt';
import User from "../../models/user.model.js";
import { generateToken } from "../../utils/generateToken.js";
import { CustomError } from '../../utils/customError.js';

export async function loginUser({email, password}){
  const user = await User.findOne({ email });

  if (!user) throw new CustomError("Error en las credenciales", 400, 'INVALID_CREDENTIALS')

  // Verificar la contraseña utilizando bcrypt.compare
  const match = await bcrypt.compare(password, user.password);
  console.log('USER', user)
  if (!match) throw new CustomError("Error en las credenciales", 400, 'INVALID_CREDENTIALS')

  const token = await generateToken({user})
  return { token, userName: user.username }
}