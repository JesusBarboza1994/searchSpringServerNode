import { ApiNet } from "../../lib/ApiNet.external.js";
import Customer from "../../models/customer.model.js";
import { CustomError } from "../../utils/customError.js";

export async function createCustomer({customerData}) {
  const { document_type, document_number, email, phone } = customerData
  let customer = await Customer.findOne({document_number});
  if(!document_type || !document_number) throw new CustomError("documentType and documentNumber is required", 400)
  if (!customer) {
    const newCustomer = new Customer({ document_type, document_number, email, phone })
    if(document_type == "RUC"){
      const {razonSocial, direccion} = await ApiNet.getRUC(document_number)
      newCustomer.name = razonSocial
      newCustomer.address = direccion
      await newCustomer.save()
    }
    else if(document_type == "DNI"){
      const {nombres, apellidoPaterno, apellidoMaterno } = await ApiNet.getDNI(document_number)
      newCustomer.name = nombres
      newCustomer.maternal_lastname = apellidoMaterno
      newCustomer.paternal_lastname =apellidoPaterno
      await newCustomer.save()
    }else{
      throw new CustomError("Invalid document type", 400)
    }

    return newCustomer
  }
  return customer
}