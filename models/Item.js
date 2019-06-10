import mongoose, { Schema } from 'mongoose';

const itemSchema = new Schema({
  name: String,
  icon: {
    type: String,
    required: false
  },
  category: { 
    type: Schema.Types.ObjectId, 
    ref: 'Category'
  },
});

const Item = mongoose.model('Item', itemSchema);

export default Item;