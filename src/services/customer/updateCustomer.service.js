import Customer from "../../models/customer.model.js";
import Osis from "../../utils/Osis.js";

export async function updateCustomer({customerId, customer}) {
  const newCustomer = await Customer.findOne({_id: customerId});
  if(customer.document_type == "DNI"){
    newCustomer.name = customer.name
    newCustomer.paternal_lastname = customer.paternal_lastname
    newCustomer.maternal_lastname = customer.maternal_lastname
    newCustomer.email = customer.email
    newCustomer.phone = customer.phone
    newCustomer.document_type = customer.document_type
    newCustomer.document_number = customer.document_number
  }else if(customer.document_type == "RUC"){
    newCustomer.name = customer.name
    newCustomer.address = customer.address
    newCustomer.email = customer.email
    newCustomer.document_type = customer.document_type
    newCustomer.phone = customer.phone
    newCustomer.document_number = customer.document_number
  }
  await newCustomer.save()
  const existCustomerInOsis = await Osis.getCustomer({document: newCustomer.document_number})
    if(!existCustomerInOsis){
      await Osis.insertCustomer({
        documentNumber:newCustomer.document_number,
        documentType: newCustomer.document_type, 
        name: newCustomer.name, 
        maternalLastname: newCustomer.maternal_lastname,
        paternalLastname:newCustomer.paternal_lastname,
        address: newCustomer.address, 
        phone: newCustomer.phone, 
        email: newCustomer.email})
    }
}
