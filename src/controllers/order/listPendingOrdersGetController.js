export default async function listPendingOrdersGetController(req, res) {
  try {
    const orders = await listPendingOrders();
    return res.status(200).send({ success: true, data: orders });
  } catch (error) {
    console.log("🚀 ~ listPendingOrdersGetController ~ error:", error)
    if(error.status == 400) return res.status(400).send({ success: false, errors: error.message, code: error.code })
    return res.status(500).send({ success: false, errors: error.message })
  }
}