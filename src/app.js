import express from 'express'
import connectDB from "./db.js";
import brandRoute from "./routes/brand.route.js"
import modelCarRoute from "./routes/modelCar.route.js"

const app = express()

connectDB()
app.use(express.json()) // Middleware para parsear JSON
app.use("/brands", brandRoute)
app.use("/cars",modelCarRoute )


app.get('/', function(req, res){
  res.send("Hello");
});

export default app