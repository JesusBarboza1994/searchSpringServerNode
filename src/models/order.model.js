import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "customers" },
    cart:[{ 
      quantity: Number,
      osis_code: String,
      price: Number
    }],
    total_amount: Number,
    total_items: Number,
    status: { type: String, enum: ["PENDIENTE", "APROBADO", "RECHAZADO"], default: "PENDIENTE" },
});

const Order = mongoose.model('orders', orderSchema, 'orders');

export default Order;
