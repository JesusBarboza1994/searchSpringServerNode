import Customer from "../../models/customer.model.js";
import Osis from "../../utils/Osis.js";

export async function updateCustomer({customerId, customer}) {
  const newCustomer = await Customer.findOne({_id: customerId});
  if(customer.document_type == "DNI"){
    if(customer.name) newCustomer.name = customer.name
    if(customer.paternal_lastname) newCustomer.paternal_lastname = customer.paternal_lastname
    if(customer.maternal_lastname) newCustomer.maternal_lastname = customer.maternal_lastname
    if(customer.email) newCustomer.email = customer.email
    if(customer.phone) newCustomer.phone = customer.phone
    newCustomer.document_type = customer.document_type
    if(customer.document_number) newCustomer.document_number = customer.document_number
  }else if(customer.document_type == "RUC"){
    if(customer.name) newCustomer.name = customer.name
    if(customer.address) newCustomer.address = customer.address
    if(customer.email) newCustomer.email = customer.email
    if(customer.phone) newCustomer.phone = customer.phone
    newCustomer.document_type = customer.document_type
    if(customer.document_number) newCustomer.document_number = customer.document_number
  }
  await newCustomer.save()
  const existCustomerInOsis = await Osis.getCustomer({document: newCustomer.document_number})
    if(!existCustomerInOsis){
      const body = {documentNumber: newCustomer.document_number, documentType: newCustomer.document_type}
      if(newCustomer.name) body.name = newCustomer.name
      if(newCustomer.paternal_lastname) body.paternalLastname = newCustomer.paternal_lastname
      if(newCustomer.maternal_lastname) body.maternalLastname = newCustomer.maternal_lastname
      if(newCustomer.address) body.address = newCustomer.address
      if(newCustomer.email) body.email = newCustomer.email
      if(newCustomer.phone) body.phone = newCustomer.phone
      await Osis.insertCustomer(body)
    }
}
