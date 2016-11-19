const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  families:  [
    {
      id: { type: Schema.Types.ObjectId },
      creator: { type: Boolean }
    }
  ]

});


module.exports = mongoose.model('User', userSchema);
