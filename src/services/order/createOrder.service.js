import Order from "../../models/order.model.js";
import { CustomError } from "../../utils/customError.js";
import { getNextOrderId } from "./getNextOrderId.service.js";

export async function createOrder({ customer_id, cart }) {
  if(!cart || cart.length == 0 ) throw new CustomError("Cart is empty", 400)
  const total_amount = cart.reduce((acc, item) => acc + item.price * item.quantity/2, 0)
  const total_items = cart.reduce((acc, item) => acc + item.quantity, 0)
  const orderId = await getNextOrderId()
  const order = await Order.create({ customer_id, cart, total_amount, total_items, order_id: orderId })
  console.log("ORDER", order)
  return order  
}
