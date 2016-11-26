const Controller = require('../../lib/controller');
const familyFacade  = require('./family-facade');
// const itemController = require('../item/item-controller');
const userController = require('../user/user-controller');

class FamilyController extends Controller {
  saveList(req, res, next) {
    const conditions = { _id: req.params.id, 'lists.name': { $eq: req.body.name } };

    familyFacade.update(conditions, {
      $set: {
        'lists.$.name':req.body.name,
        'lists.$.items':req.body.items
      }
    })
    .then((doc) => {
      if (!doc) { return res.status(404).end(); }
      if (doc.nModified === 0) {
        familyFacade.update({ _id: req.params.id }, {
          $push: { lists:req.body }
        }).then(doc => {
          if (!doc) { return res.status(404).end(); }
          return res.status(200).json({ doc });
        }).catch(err => next(err));
      } else {
        return res.status(200).json({ doc });
      }
    })
    .catch(err => next(err));
    //
    // if (req.body.items) {
    //   itemController.addItems(req.body.items);
    // }
  }
  create(req, res, next) {
    if (!req.body.user) {
      req.body.users = [];
      req.body.users.push(req.body.creator);
    } else if (req.body.filter(user => user === req.body.creator).lenght) {
      req.body.users.push(req.body.creator);
    }
    familyFacade.create(req.body)
    .then(doc => {
      if (!doc) { return res.status(404).end(); }
      userController.addFamily(doc._id, doc.creator, true);
      return res.status(201).json(doc);
    })
    .catch(err => next(err));
  }
  remove(req, res, next) {
    familyFacade.remove(req.params.id)
    .then(doc => {
      if (!doc) { return res.status(404).end(); }
      userController.removeFamily(req.params.id);
      return res.status(204).end();
    })
    .catch(err => next(err));
  }
  addUser(req, res, next) {
    Promise.resolve(userController.findUser(req.body.username)).then(doc => {
      if (doc) {
        const conditions = { _id: req.params.id };
        familyFacade.update(conditions, { $push:{ users:req.body.username } })
        .then(doc => {
          if (!doc) { return res.status(404).end(); }
          userController.addFamily(req.params.id, req.body.username, false);
          return res.status(200).json(doc);
        })
        .catch(err => next(err));
      } else {
        return res.status(404).json({ error:"User don't exists" });
      }
    });
  }
  removeUser(req, res, next) {
    const conditions = { _id: req.params.id };
    familyFacade.update(conditions, { $pull:{ users:req.body.username } })
    .then(doc => {
      if (!doc) { return res.status(404).end(); }
      userController.removeUserFamily(req.params.id, req.body.username);
      return res.status(204).json(doc);
    })
    .catch(err => next(err));
  }

  addUsers(req, res, next) {
    req.body.users.forEach((user) => { req.body.username = user.username; this.addUser(req, res, next); });
  }

  removeList(req, res, next) {
    const conditions = { _id: req.params.id, 'lists._id': { $eq: req.body.list._id } };
    familyFacade.update(conditions, { $pull:{ lists:{ _id:req.body.list._id } } })
    .then(doc => {
      if (!doc) { return res.status(404).end(); }
      return res.status(204).json(doc);
    })
    .catch(err => next(err));
  }

  addParking(req, res, next) {
    const conditions = { _id: req.params.id };
    Object.assign(req.body, { occupied:false });
    familyFacade.update(conditions, {

      $push: { parking: req.body }
    }).then(doc => {
      if (!doc) { return res.status(404).end(); }
      return res.status(200).json({ doc });
    }).catch(err => next(err));
  }
}

module.exports = new FamilyController(familyFacade);
