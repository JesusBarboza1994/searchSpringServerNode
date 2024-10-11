import Osis from "../../utils/Osis.js";

export default async function generateOrderByOsis(orderData) {
  const orderIds = [];
  let index = 0
  const ordersArray = Object.values(orderData);
  for (const order of ordersArray) {
    let totalOrder = 0
    const brand = Object.keys(orderData)[index].includes('Yunta') ? '005' : '006';
    order.items.forEach(el => {
      totalOrder = totalOrder + el.price/2*el.quantity
    });
    const basicAmount = totalOrder / 1.18;
    const taxIGV = totalOrder - basicAmount;

    const resultOrder = await Osis.insertHeadOrder({
      warehouse: order.warehouse,
      customerCode: order.document_number,
      customerName: order.document_name,
      totalOrder,
      basicAmount,
      taxIGV,
      brand
    });
    index = index + 1
    let correlative = '001'
    for (const item of order.items) {
      const basicTotalPrice = item.price/2*item.quantity/1.18;
      await Osis.insertBodyOrder({
        quantity: item.quantity,
        osisCode: item.code,
        totalPrice: basicTotalPrice*1.18, // precio total inc IGV
        unitPrice: item.price/2, //precio unitario inc IGV
        taxIGV: basicTotalPrice*0.18,
        orderNumber: resultOrder,
        correlative
      });
      correlative = String(Number(correlative) + 1).padStart(3, '0');
    }
    orderIds.push(resultOrder);
  }
  return orderIds;
}
