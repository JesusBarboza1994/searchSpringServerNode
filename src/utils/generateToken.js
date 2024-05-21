import jwt from 'jsonwebtoken';
import config from '../config.js';
export async function generateToken({user}){
  const token = jwt.sign({ userName: user.username, area: user.area, userType: user.user_type }, config.secretAccessKey, { expiresIn: config.secretAccesTime });
  user.token = token;
  user.tokenCreatedAt = new Date();
  user.tokenExpiresAt = new Date(Date.now() + 2 * 60 * 60 * 1000); // 2 horas en milisegundos
  await user.save();
  return token
}
