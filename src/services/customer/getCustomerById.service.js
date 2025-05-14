import Customer from "../../models/customer.model.js";

export async function getCustomerById({ customerId }) {
  const customer = await Customer.findOne({ _id: customerId });
  if (!customer) {
    throw new Error("Customer not found");
  }
  return {
    id: customer._id,
    documentType: customer.document_type,
    document: customer.document_number,
    name: customer.name,
    maternalLastName: customer?.maternal_lastname,
    paternalLastName: customer?.paternal_lastname,
    email: customer?.email,
    phone: customer.phone,
    address: customer?.address,
    priceList: customer.price_list,
  }
} 