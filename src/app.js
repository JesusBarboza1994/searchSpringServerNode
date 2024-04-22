import express from 'express'
import connectDB from "./db.js";

const app = express()

connectDB()
app.use(express.json())
app.get('/', function(req, res){
  res.send("Hello");
});

export default app