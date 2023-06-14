const mongoose = require('mongoose');
const reportSchema = new mongoose.Schema({
    createdBy: {
        type: String,
        required: true,
    },

    date: {
        type: String,
        required: true,
    },

    status: {
        type: String,
        required: true,
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient'
    },

    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor'
    }

}, {
    timestamps: true
});

const Report = mongoose.model('Report', reportSchema);

module.exports = Report;