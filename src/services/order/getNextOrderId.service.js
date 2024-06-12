import Order from "../../models/order.model.js";

export async function getNextOrderId() {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const currentYearMonth = `${year}00`;

  const lastOrder = await Order.findOne({ order_id: { $regex: `^${year}` } })
                               .sort({ order_id: -1 })
                               .exec();

  let sequenceNumber = 0;

  if (lastOrder) {
      sequenceNumber = parseInt(lastOrder.order_id.slice(-4), 10);
  }

  const newSequenceNumber = String(sequenceNumber + 1).padStart(4, '0');
  const newOrderId = `${currentYearMonth}${newSequenceNumber}`;

  return newOrderId;
}
