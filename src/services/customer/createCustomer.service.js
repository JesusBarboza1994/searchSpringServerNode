import config from "../../config.js";
import { ApiNet } from "../../lib/ApiNet.external.js";
import Customer from "../../models/customer.model.js";
import { CustomError } from "../../utils/customError.js";

export async function createCustomer({customerData}) {
  const { document_type, document_number, email, phone } = customerData
  let customer = await Customer.findOne({document_number});
  if(!document_type || !document_number) throw new CustomError("documentType and documentNumber is required", 400)
  if (!customer) {
    const newCustomer = new Customer({
      document_type,
      document_number,
      email,
      phone
    })
    if(document_type == "RUC"){
      const {razonSocial: name, direccion:address} = await ApiNet.getRUC(document_number)
      newCustomer.name = name
      newCustomer.address = address
      await newCustomer.save()
    }
    else if(document_type == "DNI"){
      const {nombres: name, apellidoPaterno: paternal_lastname, apellidoMaterno: maternal_lastname } = await ApiNet.getDNI(document_number)
      newCustomer.name = name
      newCustomer.maternal_lastname = maternal_lastname
      newCustomer.paternal_lastname =paternal_lastname
      await newCustomer.save()
    }else{
      throw new CustomError("Invalid document type", 400)
    }
    return newCustomer
  }
  return customer
}