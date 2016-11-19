const mongoose = require('mongoose');
const Schema   = mongoose.Schema;

const familySchema = new Schema({
  name: { type: String, required: true },
  users:  { type: [String] },
  creator: { type: String, required: true },
  lists: [
    {
      name:{ type: String, required: true },
      items: [
        {
          name: { type: String, required: true },
          amount: { type:Number }
        }
      ]
    }
  ],
  parking: [
    {
      name: { type: String, required: true },
      location: String,
      occupied: Boolean
    }
  ],
  events: [
    {
      name:{ type: String, required: true },
      date:{ type:Date },
      participent: { type: [String] }
    }
  ]
}).index({ name: 1, creator: 1 }, { unique: true });


module.exports = mongoose.model('Family', familySchema);
