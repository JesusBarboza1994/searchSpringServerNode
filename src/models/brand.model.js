import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    image: {
      type: String, 
      required: true
    },
 
  });
  
  const Brand = mongoose.model('car-brands', BrandSchema, 'car-brands');
  
 export default Brand