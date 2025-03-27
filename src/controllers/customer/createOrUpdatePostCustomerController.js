import { createCustomer } from "../../services/customer/createCustomer.service.js";
import { updateCustomer } from "../../services/customer/updateCustomer.service.js";
import { CustomError } from "../../utils/customError.js";

export async function createOrUpdateCustomerController(req, res) {
  try {
    const { customerId } = req.params;
    const customerData = req.body;

    let result;

    if (customerId) {
      result = await updateCustomer({
        customerId,
        customer: customerData
      });
    } else {
      result = await createCustomer(customerData);
    }
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