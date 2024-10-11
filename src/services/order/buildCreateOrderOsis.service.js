export default function buildOrderData(cart, customer) {
  return cart.reduce((acc, item) => {
    const { warehouse, quantity, code, price } = item;
    const keyHeader = `${warehouse.name}-${code.includes('Y') ? 'Yunta' : 'Transmeta'}`;
    if (!acc[keyHeader]) {
      acc[keyHeader] = {
        warehouse: warehouse.name,
        document_number: customer.document_number,
        document_name: `${customer.name} ${customer.paternal_lastname || ""} ${
          customer.maternal_lastname || ""
        }`,
        items: [],
      };
    }

    acc[keyHeader].items.push({
      quantity,
      code,
      price,
    });

    return acc;
  }, {});
}
