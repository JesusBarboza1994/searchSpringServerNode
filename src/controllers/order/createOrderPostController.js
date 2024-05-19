import { createCustomer } from "../../services/customer/createCustomer.service.js";
import { createOrder } from "../../services/order/createOrder.service.js";

export default async function createOrderPostController(req, res) {
  try {
    const { customer_data, cart } = req.body;
    const customer = await createCustomer({customerData: customer_data});
    console.log("🚀 ~ createOrderPostController ~ customer_id:", customer)
    const order = await createOrder({ customer_id: customer._id, cart });
    return res.status(201).send({
      success: true,
      data:{
        order,
        customer
      }
    })
  } catch (error) {
    console.log("🚀 ~ createOrderPostController ~ error:", error)
    if(error.status == 400) return { success: false, status: 400, errors: error.message }
    return { success: false, status: 500, errors: error.message }
  }
}