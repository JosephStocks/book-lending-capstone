const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); //encrypt passwords
const crypto = require('crypto'); // random bytes
const db = require("../models");
const config = require('../config/jwtsecret');
const jwt = require('jsonwebtoken');
const passport = require('passport');
require('../auth/passAuth'); //import all of passport auth strategy

// create token and store in in the db
const createToken = (user) => {
    // create token
    let jwtToken = jwt.sign({ id: user.id }, config.secret);
    // save token to DB
    const saveToken = db.user.update({ jwtToken }, { where: { id: user.id } })
    // return token
    return jwtToken
}

// local auth (email/pass) form db
let requireSignin = passport.authenticate('local', { session: false });
// jwt auth
let requireAuth = passport.authenticate('jwt', { session: false });

// user registration
router.post("/register", async (req, res) => {
    // get data from req
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email;
    //encrypt: bcrypt
    let password = bcrypt.hashSync(req.body.password, 8);

    //models- store in database
    try {
        let records = await db.user.findAll({ where: { email: email } });
        if (records.length === 0) {
            //add a new record
            let addUser = await db.user.create({ firstName, lastName, email, password });
            //send a response
            return res.status(200).send({ succes: "User registered!" });
        } else {
            //send back an error
            return res.status(422).send({ error: 'Email already exists' });
        }
    } catch (error) {
        //send back error, can't access database
        return res.status(423).send({ error: `Can't access database` });
    }
});

router.post("/signin", requireSignin, (req, res) => {
    //validate user in middleware
    // create token and save to db
    let jwtToken = createToken(req.user);
    // send token to user
    res.json({ token: jwtToken, firstName: req.user.firstName, lastName: req.user.lastName });
});

router.post("/googlesignin", async (req, res) => {
    //validate user in middleware
    // create token and save to db
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email;
    let randomPassword = crypto.randomBytes(10).toString('hex');
    let password = bcrypt.hashSync(randomPassword, 8);
    try {
        let records = await db.user.findAll({ where: { googleAuth: email } });
        if (records.length === 0) {
            //add a new record
            let addUser = await db.user.create({ firstName, lastName, password, googleAuth: email });
            // create token
            let jwtToken = await createToken(addUser);
            //send a jwt to client
            return res.json({ token: jwtToken, firstName, lastName });
        } else {
            //send a token for the existing user record
            let jwtToken = await createToken(records[0]);
            return res.json({ token: jwtToken, firstName: records[0].firstName, lastName: records[0].lastName });
        }
    } catch (error) {
        //send back error, can't access database
        return res.status(423).send({ error: `Can't access database` });
    }
});



router.get("/", requireAuth, (req, res) => {
    res.send("success");
});




module.exports = router;
