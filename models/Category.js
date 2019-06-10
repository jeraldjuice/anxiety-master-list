import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({
  name: String,
  icon: {
    type: String,
    required: false
  },
  parent: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category',
    required: false
  },
});

const Category = mongoose.model('Category', categorySchema);

export default Category;