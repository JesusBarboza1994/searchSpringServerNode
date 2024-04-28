import express from 'express'
import connectDB from "./db/mongooseDB.js";
import brandRoute from "./routes/brand.route.js"
import modelCarRoute from "./routes/modelCar.route.js"
import codeRoute from "./routes/code.route.js"

const app = express()

connectDB()
app.use(express.json()) // Middleware para parsear JSON
app.use("/brands", brandRoute)
app.use("/cars",modelCarRoute )
app.use("/codes",codeRoute )

app.get('/', async function(req, res){
  res.send('Health check OK')
});

export default app