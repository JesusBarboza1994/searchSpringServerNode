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
    brand_id: {
      type: String,
      required: true
    }
  });
  
  const ModelCar = mongoose.model('car-brand-models', carSchema);
  
 export default ModelCar