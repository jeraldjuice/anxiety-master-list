import mongoose, { Schema } from 'mongoose';

const itemSchema = new Schema({
  name: String,
  description: {
    type: String,
    required: false
  },
  icon: {
    type: String,
    required: false
  },

  // If a different item has to be completed before this item
  blockedBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'Item',
    required: false
  },
  
  // If an item has no parent, then it is considered a one-off task
  category: {
    type: Schema.Types.ObjectId, 
    ref: 'Category',
    required: false
  },
  
  status: {
    due: Date,
    lastCompleted: {
      type: Date,
      required: false,
    },
    repeatEntity: {
      type: String,
      enum : ['none', 'days', 'weeks', 'months', 'quarters', 'years'],
      default: 'none'
    },
    multiplier: { type: Number, min: 1, default: 1 },
  }
});

const Item = mongoose.model('Item', itemSchema);

export default Item;