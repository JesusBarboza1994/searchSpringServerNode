import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
    id: {
      type: String,
      required:true,
      unique: true
    },
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
  
  const Brands = mongoose.model('car-brand', BrandSchema);
  
 export default Brands