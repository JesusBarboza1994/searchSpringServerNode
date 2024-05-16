import express from 'express'
import connectDB from "./db/mongooseDB.js";
import brandRoute from "./routes/brand.route.js"
import modelCarRoute from "./routes/modelCar.route.js"
import codeRoute from "./routes/code.route.js"
import orderRoute from "./routes/order.route.js"
import cors from 'cors'

const app = express()

connectDB()
app.use(express.json()) // Middleware para parsear JSON
app.use(cors())
app.use("/brands", brandRoute)
app.use("/cars",modelCarRoute )
app.use("/codes",codeRoute )
app.use("/orders", orderRoute)

app.get('/health', async function(req, res){
  res.send('Health check OK')
});

export default app