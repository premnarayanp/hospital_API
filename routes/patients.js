const express = require('express');
const router = express.Router();
const passport = require('passport');
const patientController = require('../controllers/patients_controller');

router.post('/register', patientController.create);
router.post('/:id/create_report', patientController.create_report);
router.get('/:id/all_reports', patientController.all_reports);

module.exports = router;