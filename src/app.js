import express from 'express'
import connectDB from "./db.js";
import brandRoute from "./routes/brand.route.js"

const app = express()

connectDB()
app.use(express.json())
app.use("/brand", brandRoute)

app.get('/', function(req, res){
  res.send("Hello");
});

export default app