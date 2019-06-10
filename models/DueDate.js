import mongoose, { Schema } from 'mongoose';

/*
  DUE DATE STUFF:
    - type: 
      : 'day' (repeat every day)
      : 'week'
      : 'month'
      : 'year'
      : 'date' -> specific date
    - multiplier 
        greater than one means that it will skip days (ie, a multiplier of 2 with an entitiy of 'day' will repeat every two days)
        if this equals one, than it means that it will just repeat every repeatEntity. (ie, repeat every day)
        zero means that it repeats multiple times in that entity, handled by the custom repeat rules
    - parameters
      : contains an array of numbers (for example, a repeatEntity of 'week' with parameters of [0,1,2] will repeat on Sunday, Monday, and Tuesday of each week. an entity with 'month' and parameters of [1, 15] will repeate on the first and 15th of each month.)
      : [FUTURE] can also accept custom commands, 'first' and 'last', which will repeat on the first and last days of each period of the repeat entity.
*/

const dueDateSchema = new Schema({
  type: String,
  date: Date,
  repeat: {
    multiplier: { type: Number, min: 0 },
    parameters: [ String ]
  },
  task: { 
    type: Schema.Types.ObjectId, 
    ref: 'Task'
  },
});

const DueDate = mongoose.model('DueDate', dueDateSchema);

export default DueDate;