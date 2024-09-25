import { listOrders } from "../../services/order/listOrders.service.js";

export default async function listOrdersGetController(req, res) {

  try {
    const { status = "PENDIENTE" } = req.query;
    const orders = await listOrders(status);
    return res.status(200).send({ success: true, data: orders });
  } catch (error) {
    console.log("🚀 ~ listPendingOrdersGetController ~ error:", error)
    if(error.status == 400) return res.status(400).send({ success: false, errors: error.message, code: error.code })
    return res.status(500).send({ success: false, errors: error.message })
  }
}