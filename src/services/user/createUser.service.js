import bcrypt from 'bcrypt';
import User from "../../models/user.model.js";
import { CustomError } from "../../utils/customError.js";
import { generateToken } from '../../utils/generateToken.js';

export async function createUser({username, email, password, user_type}){
  const existingUser = await User.findOne({ $or: [{ username }, { email }] });
  if (existingUser) throw new CustomError("El usuario ya existe", 400, 'USER_EXISTS')
  
  const saltRounds = 10; // Número de rondas de cifrado
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  const newUser = await User.create({ username, email, password: hashedPassword, user_type });
  await generateToken({user: newUser})
}
