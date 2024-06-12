import Order from "../../models/order.model.js";

export async function listPendingOrders(){
  // const pendingOrders = await Order.find({status: "PENDIENTE"})
  const pendingOrders = await Order.aggregate([
    { $match: { status: "PENDIENTE" } },
    {
      $lookup: {
        from: "customers",
        localField: "customer_id",
        foreignField: "_id",
        as: "customer",
      },
    },
    { $unwind: "$customer" },
    { $project: { 
      customer: 1, 
      cart: 1,
      order_id: 1,
      total_amount: 1, 
      total_items: 1, 
      created_at: 1
    } },
   
  ])
  return pendingOrders
}