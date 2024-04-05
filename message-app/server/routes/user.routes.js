const users = require('../controllers/users.controller.js');
const router = require('express').Router();

router.post('/', users.createOrUpdateUser);
router.get('/', users.listUsers);
router.get('/:sub', users.getUser);
router.put('/:sub', users.updateUser);

module.exports = router;