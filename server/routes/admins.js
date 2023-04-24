const express = require("express");
const router = express.Router();

const admins = require('./../controllers/admins');
const auth = require('./../middlewares/auth');

router.route('/getGrant/:yearOfStudy').get(auth.adminAuth, admins.getGrant);
router.route('/grant/:yearOfStudy').get(auth.adminAuth, admins.grantLeave);
router.route('/:yearOfStudy').get(auth.adminAuth, admins.getAll);
router.route('/').post(admins.login);

module.exports = router;