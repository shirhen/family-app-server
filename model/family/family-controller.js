const Controller = require('../../lib/controller');
const familyFacade  = require('./family-facade');

class FamilyController extends Controller {}

module.exports = new FamilyController(familyFacade);
