const express = require("express");
const router = express.Router();

const users = require('./../controllers/users');

router.route('/verify/:token').get(users.verifyToken);
router.route('/profile/login').post(users.login);
router.route('/profile').post(users.setProfile);

module.exports = router;