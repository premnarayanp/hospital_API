const Doctor = require('../models/doctor');
const jwt = require('jsonwebtoken');

//register the Doctors
module.exports.create = async function(req, res) {
    const body = req.body;
    console.log(body);

    if (!body.name || !body.email || !body.password || !body.confirmPassword) {
        return res.json({ msg: "please fill all fields..", data: null });
    }

    if (body.password != body.confirmPassword) {
        return res.json({ msg: "Confirm Password Not matched!", data: null });
    }

    try {
        const doctor = await Doctor.findOne({ email: body.email });
        if (!doctor) {
            const doctor = await Doctor.create(body);
            doctor.password = "XXXXX";
            return res.json({ msg: " You Successfully Registered", data: { doctor: doctor } });
        } else {
            return res.json({ msg: "User Already Exist", data: null });
        }
    } catch (error) {
        console.log('error in creating user while signing up', error);
        return res.json({ msg: "Internal Server Error", data: null });
    }
}

// sign in for Doctor
module.exports.createSession = async function(req, res) {
    const body = req.body;
    console.log(body);

    try {
        const doctor = await Doctor.findOne({ email: body.email });
        if (!doctor || doctor.password != body.password) {
            return res.json(422, { msg: "Invalid Username and Password", data: null });
        } else {
            return res.json(200, {
                msg: "Successfully SignIn,here is token,Please  keep it safe",
                data: {
                    token: jwt.sign(doctor.toJSON(), process.env.SECRETE_KEY, { expiresIn: '1000' })

                }
            });
        }
    } catch (error) {
        console.log('error in creating user while signing up', error);
        return res.json(500, { msg: "Internal Server Error", data: null });
    }

}