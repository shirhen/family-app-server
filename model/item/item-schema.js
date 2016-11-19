const mongoose = require('mongoose');
const Schema   = mongoose.Schema;


const itemSchema = new Schema({
  name: { type: String, required: true, unique: true }
});


module.exports = mongoose.model('Item', itemSchema);
