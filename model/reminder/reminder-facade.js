const Model = require('../../lib/facade');
const reminderSchema  = require('./reminder-schema');

class ReminderModel extends Model {}

module.exports = new ReminderModel(reminderSchema);
