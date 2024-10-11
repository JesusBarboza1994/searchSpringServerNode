import Order from "../../models/order.model.js";

export const approveOrder = async ({id, cart,orderIds}) => {
  const total_amount = cart.reduce((acc, item) => acc + item.price/2 * item.quantity, 0)
  const total_items = cart.reduce((acc, item) => acc + item.quantity, 0)
  
  const order = await Order.findOneAndUpdate({ _id: id }, { status: "APROBADO", cart: cart, total_amount, total_items, orders: orderIds },
  { upsert: true, new: true })
  return order.customer_id

}
