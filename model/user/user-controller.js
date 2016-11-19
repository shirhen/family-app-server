const Controller = require('../../lib/controller');
const userFacade  = require('./user-facade');

class UserController extends Controller {
  addCreatedFamily(id, creator) {
    const conditions = { username: creator };

    userFacade.update(conditions, { $push:{ families:{ id, creator:true } } })
    .then(doc => {
      if (!doc) { return console.dir(doc); }
      return console.dir(doc);
    })
    .catch(err => console.dir(err));
  }

  removeFamily(id) {
    const conditions = { 'families.id': id };

    userFacade.update(conditions, { $pull: { families:{ id } } })
    .then(doc => {
      if (!doc) { return console.dir(doc); }
      return console.dir(doc);
    })
    .catch(err => console.dir(err));
  }
}

module.exports = new UserController(userFacade);
