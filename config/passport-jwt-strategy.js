const Doctor = require('../models/doctor');
const passport = require('passport');

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRETE_KEY;

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    // console.log("======================hello=====================")
    //console.log("=========email===========", jwt_payload.email);
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

}))
module.exports.passport;



// passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
//     try {

//         console.log("=========email===========", jwt_payload.email);
//         const doctor = await Doctor.findById(jwt_payload._id);
//         if (doctor) {
//             return done(null, doctor);
//         } else {
//             return done(null, false);
//         }

//     } catch (error) {
//         console.log("error in finding User");
//         return;
//     }

// }));



// Doctor.findOne({ email: jwt_payload.email }, function(err, user) {
//     if (err) {
//         return done(err, false);
//     }
//     if (user) {
//         return done(null, user);
//     } else {
//         return done(null, false);
//         // or you could create a new account
//     }

// });