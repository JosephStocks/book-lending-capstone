

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const bcrypt = require('bcryptjs'); //unencrypt
const db = require('../models'); //access to user model
const config = require('../config/jwtsecret'); //gives access to jwt secret



//options to override username field
let options = {
    usernameField: 'email'
}

// local signin strategy
let localLogin = new LocalStrategy(options, async (email, password, done) => {
    try {
        // check to see if email is in our db 
        let records = await db.user.findAll({ where: { email: email } }); //array of objects
        if (records !== null) {
            //encrypt password and compare to password in db 
            bcrypt.compare(password, records[0].password, (err, isMatch) => {
                //check if err object exists
                if (err) {
                    return done(err);
                }
                //mismatch passwords
                if (!isMatch) {
                    return done(null, false)
                }
                //valid user 
                let user = records[0];
                return done(null, user);
            })
        }
        else {
            //no email was found, exit with error
            return done(null, false);
        }
    }
    catch (error) {
        //something in dabatase retreival
        return done(error)
    }
});


/**
 * jwt strategy
 * validating token
 */
let jwtOptions = {
    jwtFromRequest: ExtractJwt.fromHeader('authorization'),
    secretOrKey: config.secret,
    passReqToCallback: true
}
let jwtLogin = new JwtStrategy(jwtOptions, async (req, payload, done) => {

    try {
        let user = await db.user.findByPk(payload.id);

        if (user) {
            //success
            done(null, user);
        }
        else {
            //didn't find the user 
            done(null, false)
        }
    }
    catch (error) {
        return done(error)
    }

});


passport.use(localLogin);
passport.use(jwtLogin);