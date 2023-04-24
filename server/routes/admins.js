const express = require("express");
const router = express.Router();

const admins = require('./../controllers/admins');

router.route('/getGrant/:yearOfStudy').get(admins.getGrant);
router.route('/grant/:yearOfStudy').post(admins.grantLeave);
router.route('/:yearOfStudy').get(admins.getAll);
router.route('/').post(admins.login);

module.exports = router;