import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    customer_id: { type: mongoose.Schema.Types.ObjectId, ref: "customers" },
    order_id: { type: String, unique: true },
    cart:[{ 
      quantity: Number,
      code: String,
      price: Number,
      stock: [{
        warehouse:String,
        quantity: Number,
      }],
      warehouse:{
        name:String,
        stock:Number
      }
    }],
    total_amount: Number,
    total_items: Number,
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "users" },
    status: { type: String, enum: ["PENDIENTE", "APROBADO", "ANULADO"], default: "PENDIENTE" },
    orders: [{
      type: String,}],
},
  {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at'}
  }
);

const Order = mongoose.model('orders', orderSchema, 'orders');

export default Order;
