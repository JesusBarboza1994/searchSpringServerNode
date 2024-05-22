import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "customers" },
    cart:[{ 
      quantity: Number,
      code: String,
      price: Number
    }],
    total_amount: Number,
    total_items: Number,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    status: { type: String, enum: ["PENDIENTE", "APROBADO", "ANULADO"], default: "PENDIENTE" },
    
},
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
  }
);


const Order = mongoose.model('orders', orderSchema, 'orders');

export default Order;
