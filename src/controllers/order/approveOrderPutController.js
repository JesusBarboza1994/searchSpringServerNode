import { updateCustomer } from "../../services/customer/updateCustomer.service.js";
import { approveOrder } from "../../services/order/approveOrder.service.js";
import buildOrderData from "../../services/order/buildCreateOrderOsis.service.js";
import generateOrderByOsis from "../../services/order/generateOrderByOsis.service.js";
export default async function approveOrderPutController(req, res) {
  try {
    const { id } = req.params;
    const { customer, cart } = req.body;

    const orderData = buildOrderData(cart, customer);
    const orderIds = await generateOrderByOsis(orderData);

    const customerId = await approveOrder({id,cart,orderIds});
    await updateCustomer({customer, customerId});
    return res.status(200).send({
      success: true,
      code:'ORDER_APPROVED',
      message: 'Order approved successfully'
    });
  } catch (error) {
    console.log("🚀 ~ updateOrderPutController ~ error:", error)
    if(error.status == 400) return res.status(400).send({ success: false, errors: error.message, code: error.code })
    return res.status(500).send({ success: false, errors: error.message })
  }
}