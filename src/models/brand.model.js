import mongoose from 'mongoose';

const BrandSchema = new mongoose.Schema({
    id: {
      type: String,
      required:true,
      unique: true
    },
    name: {
      type: String,
      required: true
    },
    image: {
      type: String, 
      required: false
    },
 
  });
  
  const Brands = mongoose.model('car-brand', BrandSchema);
  
 export default Brands