import mongoose from 'mongoose';

const carSchema = new mongoose.Schema({
    id: {
      type: String,
      required:true,
      unique: true
    },
    model: {
      type: String,
      required: true
    },
    start_year: {
      type: Number, 
      required: true
    },
    end_year: {
      type: Number,  
      required: false
    },
    brand_id: [{ type: mongoose.Schema.Types.ObjectId, ref: 'car-brands' }]
  });
  
  const ModelCar = mongoose.model('car-models', carSchema, 'car-models');
  
 export default ModelCar