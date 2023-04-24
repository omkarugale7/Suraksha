const express = require("express");
const router = express.Router();

const users = require('./../controllers/users');
const auth = require('./../middlewares/auth');

router.route('/verify/:token').get(users.verifyToken);
router.route('/markPresent').post(auth.auth, users.markPresent);
router.route('/profile/login').post(users.login);
router.route('/profile/:prn').get(auth.auth, users.getProfile);
router.route('/profile').post(users.setProfile);

module.exports = router;