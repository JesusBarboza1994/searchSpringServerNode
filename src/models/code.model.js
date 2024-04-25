import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  position: {
      type: Boolean,
      required: true
  },
  version: {
      type: String,
      required: true
  },
  type: {
      type: String,
      required: true
  },
  image: {
      type: String,
      required: true 
  },
  product_id: {
      type: String,
      required: true
  },
  price: {
      type: Number,
      required: true
  },
  osis_code: {
      type: String,
      required: true 
  },
  cars_ids: {
      type: [String], 
      required: false 
  }
  // cars_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'car-brand-models' }]
});

const Code = mongoose.model("code", codeSchema);
export default Code