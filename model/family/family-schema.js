const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const familySchema = new Schema({
  name: { type: String, required: true, unique: true },
  users:  { type: [Schema.Types.ObjectId] },
  creator: { type: Schema.Types.ObjectId, required: true },
  lists: [
    {
      name:{ type: String, required: true },
      items: [
        {
          name: { type: String, required: true }
        }
      ]
    }
  ],
  parking: [
    {
      name: { type: String, required: true, unique: true },
      location: String,
      occupied: Boolean
    }
  ],
  events: [
    {
      name:{ type: String, required: true },
      date:{ type:Date },
      participent: { type: [Schema.Types.ObjectId] }
    }
  ]
});


module.exports = mongoose.model('Family', familySchema);
