const express = require("express");
const router = express.Router();

const admins = require('./../controllers/admins');

router.route('/').post(admins.login).get(admins.getAll);

module.exports = router;