import mongoose from "mongoose";

const codeSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  position: {
    type: Boolean,
    required: true,
  },
  version: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  product_id: {
    type: String,
    required: true,
  },
  price: [
    {
      list: [
        {
          kind: { type: String, enum: ["A", "B", "C", "D"], default: "A" },
          price: { type: Number },
        },
      ],
      date: { type: Date, default: Date.now },
    },
  ],
  osis_code: {
    type: String,
    required: true,
    unique: true,
  },

  cars_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: "car-brand-models" }],
  // cars_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: 'car-brand-models' }]
});

const Code = mongoose.model("codes", codeSchema, "codes");
export default Code;
