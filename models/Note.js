import mongoose, { Schema } from 'mongoose';

const noteSchema = new Schema({
  created: { type: Date, default: Date.now },
  contents: String,
  parent: {
    type: Schema.Types.ObjectId,
    required: false
  }
});

const Note = mongoose.model('Note', noteSchema);

export default Note;