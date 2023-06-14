const Patient = require('../models/patient');
const Doctor = require('../models/doctor');
const Report = require('../models/report');

//register the patients
module.exports.create = async function(req, res) {
    const body = req.body;
    // console.log("======req.body=========", req.body);

    if (!body.name || !body.mobileNum) {
        return res.json({ msg: "please fill all fields..", data: null });
    }

    try {
        const patient = await Patient.findOne({ mobileNum: body.mobileNum });
        if (!patient) {
            const doctor = await Doctor.findById({ _id: req.user.id });
            const patient = await Patient.create(body);
            doctor.patients.push(patient);
            doctor.save();
            // console.log("======doctor=========", doctor);

            return res.status(200).json({
                mgs: "Successfully Patient Registered",
                data: { patient: patient }
            });
        } else {
            return res.status(200).json({
                mgs: "Patient Already Registered ",
                data: { patient: patient }
            });
        }
    } catch (error) {
        console.log('error in creating user while signing up', error);
        return res.json(500, { msg: "Internal Server Error", data: null });
    }
}

// create_report of the patients
module.exports.create_report = async function(req, res) {
    const body = req.body;
    // console.log("======report=========", body);
    // console.log("======req.param.id=========", req.params.id);

    if (!body.createdBy || !body.date || !body.status) {
        return res.json({ msg: "please fill all fields..", data: null });
    }
    try {
        const patient = await Patient.findById({ _id: req.params.id });
        if (patient) {
            body.patient = req.params.id;
            body.doctor = req.user.id;
            const report = await Report.create(body);

            patient.reports.push(report);
            patient.save();
            //console.log("======patient=========", patient);

            return res.status(200).json({
                msg: "Report Successfully Created",
                data: {
                    report: report
                }
            });
        } else {

            return res.status(200).json({
                msg: "Patient Not Exist",
                data: null
            });
        }

    } catch {
        return res.status(400).json({
            msg: "internal server error"
        })
    }
}



// create_report of the patients
module.exports.all_reports = async function(req, res) {
    console.log("======req.param.id=========", req.params.id);

    try {
        const patient = await Patient.findById({ _id: req.params.id }).populate({
            path: 'reports',
        });

        if (patient) {
            console.log("======patient report=========", patient.reports);

            return res.status(200).json({
                msg: "Report Successfully founded",
                data: {
                    report: patient.reports
                }
            });
        } else {

            return res.status(200).json({
                msg: "Patient Not Exist",
                data: null
            });
        }

    } catch {
        return res.status(400).json({
            msg: "internal server error"
        })
    }
}