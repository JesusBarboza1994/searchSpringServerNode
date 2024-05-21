import Order from "../../models/order.model.js";

export async function listPendingOrders(){
  const pendingOrders = await Order.find({status: "PENDIENTE"});
  return pendingOrders
}