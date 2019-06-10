import mongoose, { Schema } from 'mongoose';

/* TASKS STATUSES:
  0 UNTOUCHED
  1 NEEDS ACTION 
  2 WAITING ON SOMEONE ELSE
  3 DONE
*/

const taskSchema = new Schema({
  name: String,
  description: String,
  status: String, //@TODO or constant ? is their constant support?
  due: { 
    type: Schema.Types.ObjectId, 
    ref: 'DueDate'
  },
  item: { 
    type: Schema.Types.ObjectId, 
    ref: 'Item',
    required: false
  },
  blockedBy: { 
    type: Schema.Types.ObjectId, 
    ref: 'Task',
    required: false
  },
});

const Task = mongoose.model('Task', taskSchema);

export default Task;