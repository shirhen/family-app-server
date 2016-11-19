const Controller = require('../../lib/controller');
const reminderFacade  = require('./reminder-facade');

class ReminderController extends Controller {}

module.exports = new ReminderController(reminderFacade);
