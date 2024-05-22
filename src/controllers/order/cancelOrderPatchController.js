import { cancelOrder } from "../../services/order/cancelOrder.service.js";

export default async function cancelOrderPatchController(req, res) {
  try {
    const { id } = req.params;
    const order = await cancelOrder({id});
    return res.status(200).send(order);
  } catch (error) {
    console.log("🚀 ~ cancelOrderPatchController ~ error:", error)
    if(error.status == 400) return res.status(400).send({ success: false, errors: error.message, code: error.code })
    return res.status(500).send({ success: false, errors: error.message })
  }
}