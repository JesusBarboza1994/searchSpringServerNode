import { getCustomerById } from "../../services/customer/getCustomerById.service.js";

export default async function getCustomerByIdController(req, res) {
  try {
    const { id } = req.params;
    const customer = await getCustomerById({ customerId: id });
    res.status(200).json({
      success: true,
      data: customer,
      message: "Customer retrieved successfully",
    });
  } catch (error) {
    if (error.message === "Customer not found") {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
} 