const Doctor = require('../models/doctor');
const passport = require('passport');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETE_KEY;

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
        const doctor = await Doctor.findById(jwt_payload._id);
        if (doctor) {
            return done(null, doctor);
        } else {
            return done(null, false);
        }

    } catch (error) {
        console.log("error in finding User");
        return;
    }

}));
module.exports.passport;