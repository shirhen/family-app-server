const Router = require('express').Router;
const router = new Router();

const item  = require('./model/item/item-router');
const reminder  = require('./model/reminder/reminder-router');
const user  = require('./model/user/user-router');
const family  = require('./model/family/family-router');


router.route('/').get((req, res) => {
  res.json({ message: 'Welcome to family-app-server API!' });
});

router.use('/item', item);
router.use('/reminder', reminder);
router.use('/user', user);
router.use('/family', family);


module.exports = router;
