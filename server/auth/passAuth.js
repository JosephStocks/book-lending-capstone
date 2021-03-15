const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const config = require("../config/jwtsecret");
const bcrypt = require("bcryptjs"); //unencrypt
const db = require("../models"); //access to user model

//options to override username field
let options = {
  usernameField: "email",
  passReqToCallback: true,
};

// local signin strategy
let localLogin = new LocalStrategy(
  options,
  async (req, email, password, done) => {
    try {
      // check to see if email is in our db
      let records = await db.user.findAll({ where: { email: email } }); //array of objects
      if (records.length !== 0) {
        //encrypt password and compare to password in db
        bcrypt.compare(password, records[0].password, (err, isMatch) => {
          //check if err object exists
          if (err) {
            return done(err);
          }
          //mismatch passwords
          if (!isMatch) {
            return done(null, false, { message: "Passwords don't match!" });
          }
          //valid user
          let user = records[0];
          return done(null, user);
        });
      } else {
        //no email was found, exit with error
        return done(null, false, { message: "User not found!" });
      }
    } catch (error) {
      //something in dabatase retreival
      //res.status(423).send({ error: `Can't access database` });
      return done(error);
    }
  }
);

/**
 * jwt strategy
 * validating token
 */

let jwtOptions = {
  jwtFromRequest: ExtractJwt.fromHeader("authorization"),
  secretOrKey: config.secret,
  passReqToCallback: true,
};
let jwtLogin = new JwtStrategy(jwtOptions, async (req, payload, done) => {
  try {
    let user = await db.user.findByPk(payload.id);

    if (user) {
      //success
      done(null, user, { message: "User found!" });
    } else {
      //didn't find the user
      done(null, false, { message: "Could not find user!" });
    }
  } catch (error) {
    return done(error);
  }
});

passport.use(localLogin);
passport.use(jwtLogin);
