import { createCustomer } from "../../services/customer/createCustomer.service.js";
import { updateCustomer } from "../../services/customer/updateCustomer.service.js";
import { CustomError } from "../../utils/customError.js";

export default async function createOrUpdateCustomerController(req, res) {
  try {
    const { id } = req.query;
    const { document,email,phone,name,observations } = req.body;
    const document_type = document.length == 11 ? "RUC" : "DNI";
    const customerData = {
      document_type,
      document_number: document,
      email,
      phone,
      observations
    }

    let result;
    if (id) {
      result = await updateCustomer({
        customerId: id,
        customer: customerData
      });
    } else {
      result = await createCustomer({customerData});
    }

    return res.status(200).json({
      success: true,
      message: "Customer created successfully",
      data: result
    });

  } catch (error) {
    console.log("🚀 ~ createOrUpdateCustomerController ~ error:", error);
    
    if (error.status === 400 || error instanceof CustomError) {
      return res.status(error.status || error.statusCode).json({
        success: false,
        message: error.message,
        code: error.code 
      });
    }
    return res.status(500).json({
      success: false,
      message: "Internal server error"
    });
  }
}