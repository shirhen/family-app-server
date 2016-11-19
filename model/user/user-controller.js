const Controller = require('../../lib/controller');
const userFacade  = require('./user-facade');

class UserController extends Controller {
  addCreatedFamily(id, creator) {
    console.log(`id${id}creator${creator}`);
    const conditions = { username: creator };

    userFacade.update(conditions, { $push:{ families:{ id, creator:true } } })
    .then(doc => {
      if (!doc) { return console.dir(doc); }
      return console.dir(doc);
    })
    .catch(err => console.dir(err));
  }
}

module.exports = new UserController(userFacade);
