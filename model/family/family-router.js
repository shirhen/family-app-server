const controller = require('./family-controller');
const Router = require('express').Router;
const router = new Router();

router.route('/')
  .get((...args) => controller.find(...args))
  .post((...args) => controller.create(...args));

router.route('/:id/lists')
    .post((...args) => controller.saveList(...args));

router.route('/:id/users')
    .post((...args) => controller.addUser(...args))
    .delete((...args) => controller.removeUser(...args));

router.route('/:id')
  .put((...args) => controller.update(...args))
  .get((...args) => controller.findById(...args))
  .delete((...args) => controller.remove(...args));

module.exports = router;
