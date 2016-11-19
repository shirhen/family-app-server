const Controller = require('../../lib/controller');
const itemFacade  = require('./item-facade');

class ItemController extends Controller {
  addItems(items) {
    console.dir(items);
    itemFacade.insertArray(items.map(item => ({ name:item.name })));
  }
}

module.exports = new ItemController(itemFacade);
