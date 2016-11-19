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
    familyFacade.create(req.body)
    .then(doc => {
      if (!doc) { return res.status(404).end(); }
      userController.addCreatedFamily(doc._id, doc.creator);
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
}

module.exports = new FamilyController(familyFacade);
