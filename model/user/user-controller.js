const Controller = require('../../lib/controller');
const userFacade  = require('./user-facade');

class UserController extends Controller {
  addFamily(id, user, isCreator) {
    const conditions = { username: user };

    userFacade.update(conditions, { $push:{ families:{ id, creator:isCreator } } })
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

  removeUserFamily(id, username) {
    const conditions = { 'families.id': id, username };
    userFacade.update(conditions, { $pull: { families:{ id } } })
    .then(doc => {
      if (!doc) { return console.dir(doc); }
      return console.dir(doc);
    })
    .catch(err => console.dir(err));
  }

  findUser(username) {
    const query = { username };
    return userFacade.findOne(query);
  }
}

module.exports = new UserController(userFacade);
