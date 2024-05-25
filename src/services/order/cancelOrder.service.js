import Order from "../../models/order.model.js";

export async function cancelOrder({id}) {
  const order = await Order.findById(id);
  order.status = "ANULADO"
  await order.save();
  return order
}