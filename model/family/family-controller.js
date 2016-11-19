const Controller = require('../../lib/controller');
const familyFacade  = require('./family-facade');

class FamilyController extends Controller {
  createList(req, res, next) {
    const conditions = { _id: req.params.id, 'lists.name': { $ne: req.body.name } };

    familyFacade.update(conditions, { $push: { lists:req.body } }, { upsert: true })
    .then(doc => {
      if (!doc) { return res.status(404).end(); }
      return res.status(200).json(doc);
    })
    .catch(err => next(err));
  }
}

module.exports = new FamilyController(familyFacade);
