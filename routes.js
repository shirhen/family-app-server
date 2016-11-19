const Router = require('express').Router;
const router = new Router();

const list  = require('./model/list/list-router');
const item  = require('./model/item/item-router');
const parking  = require('./model/parking/parking-router');
const event  = require('./model/event/event-router');
const reminder  = require('./model/reminder/reminder-router');
const user  = require('./model/user/user-router');
const family  = require('./model/family/family-router');


router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to family-app-server API!' });
});

router.use('/list', list);
router.use('/item', item);
router.use('/parking', parking);
router.use('/event', event);
router.use('/reminder', reminder);
router.use('/user', user);
router.use('/family', family);


module.exports = router;
