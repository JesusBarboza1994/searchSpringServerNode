import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import config from '../config.js';

const adminPassword = config.secretAccessKey
const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: { type: String }, // Almacena el token JWT aquí
  user_type: {
    type: String,
    validate: {
      validator: async function(value) {
        // Validación personalizada: Solo permitir 'admin' si la contraseña es especial
        const compare = await bcrypt.compare(adminPassword, this.password)
        return value !== 'admin' || compare
      },
      message: 'Acceso denegado para asignar el tipo de usuario como "admin".'
    },
    enum: ['admin', 'user'],
    default: 'user'
  },
  area:{
    type: String,
    enum: ['INGENIERIA', 'VENTAS', 'CONTROL_CALIDAD'],
    required: true,
    default: 'INGENIERIA'
  },
  token_created_at: { type: Date }, // Almacena la fecha de creación del token aquí
  token_expires_at: { type: Date }, // Almacena la fecha de expiración del token aquí
});

const User = mongoose.model('User', userSchema);
export default User
