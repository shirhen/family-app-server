const Controller = require('../../lib/controller');
const familyFacade  = require('./family-facade');
// const itemController = require('../item/item-controller');

class FamilyController extends Controller {
  createList(req, res, next) {
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
}

module.exports = new FamilyController(familyFacade);
