const Model = require('../../lib/facade');
const familySchema  = require('./family-schema');

class FamilyModel extends Model {}

module.exports = new FamilyModel(familySchema);
