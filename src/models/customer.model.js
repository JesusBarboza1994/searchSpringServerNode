import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  document_type: { type: String, enum: ["DNI", "RUC"], default: "DNI" },
  document_number: { type: String, required: true },
  name: { type: String, required: true },
  maternal_lastname: { type: String },
  paternal_lastname: { type: String },
  email: { type: String },
  phone: { type: String, required: true },
  address: { type: String, default: 'LIMA, PERU' },
  price_list: { type: String, enum: ["A", "B", "C", "D", "E"], default: "A" },
});

const Customer = mongoose.model('customers', customerSchema, 'customers');

export default Customer;
