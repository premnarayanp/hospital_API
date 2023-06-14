const express = require('express');
const router = express.Router();
const passport = require('passport');
const passportJWT = require('../config/passport-jwt-strategy');
const patientController = require('../controllers/patients_controller');

// router.post('/register', passport.authenticate('jwt', { session: false }), patientController.create);
// router.post('/:id/create_report', passport.authenticate('jwt', { session: false }), patientController.create_report);
// router.get('/:id/all_reports', passport.authenticate('jwt', { session: false }), patientController.all_reports);

module.exports = router;