import mongoose from "mongoose";
import config from "../config.js";
export default function connectDB() {
  try {
    mongoose.connect(config.mongoURI, { });
    console.log("Conexión establecida")
  } catch(err) {
    console.log("ERROR",err);
  }  
}

