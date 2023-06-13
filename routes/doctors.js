const express = require('express');
const router = express.Router();
const passport = require('passport');
const doctorController = require('../controllers/doctors_controller');

router.post('/register ', doctorController.create);

//use passport as middleware to authenticate
router.post('/login', passport.authenticate(
    'local', { failureRedirect: '/users/sign-in' },
), doctorController.createSession);


module.exports = router;