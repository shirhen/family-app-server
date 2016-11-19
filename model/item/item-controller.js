const Controller = require('../../lib/controller');
const itemFacade  = require('./item-facade');

class ItemController extends Controller {}

module.exports = new ItemController(itemFacade);
