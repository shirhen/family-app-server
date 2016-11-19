const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const itemSchema = new Schema({
  title: { type: String, required: true, unique: true },
  amount:  { type: Number }
});


module.exports = mongoose.model('Item', itemSchema);
