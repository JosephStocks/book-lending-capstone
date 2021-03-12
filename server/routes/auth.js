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


// router.post('/signin',  (req, res, next) => {
//     passport.authenticate('local', {session: false}, (err, user, info)=>{
//         if(err){
//             return res.status(213).send({error: info.message})
//         }
//         if(!user){
//             //console.log('error occurred');
//             return res.json({token: "", message: info.message})
//         }
//         req.logIn(user, function(err) {
//             if (err) { return next(err); }
//             console.log(info);
//             return res.json({token: token(req.user.id), message: info.message})
//           });
//     })(req, res, next);
// })

router.post('/messages', (req, res, next) => {
    passport.authenticate('local', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(405).json({ token: "", message: "Problem accessing database" })
        }
        if (!user) {
            return res.status(410).json({ token: "", message: info.message })
        }
        req.logIn(user, (err) => {
            return
        }
        )

    })(req, res, next)
})


router.get("/", requireAuth, (req, res) => {
    // console.log(req.authInfo);
    res.send("success");
});


// user registration
router.post("/register", async (req, res) => {
    console.log("before");
    // get data from req
    let firstName = req.body.firstName
    let lastName = req.body.lastName
    let email = req.body.email;
    //encrypt: bcrypt
    let password = bcrypt.hashSync(req.body.password, 8);

    //models- store in database
    try {
        let localRecords = await db.user.findAll({ where: { email: email } });
        let googleRecords = await db.user.findAll({ where: { googleAuth: email } });

        if (localRecords.length === 0 && googleRecords === 0) {
            //add a new record
            let createEntry = await db.user.create({ firstName, lastName, email, password });
            //send a response
            return res.status(210).send({ success: "User created!" });
        }
        else if ((localRecords.length === 0 && googleRecords !== 0)) {
            console.log("inside");
            let updateGoogleRecord = await db.user.update({ email, password }, { where: { googleAuth: email } })
            //send a response
            return res.status(210).send({ success: "User created!" });
        }
        else {
            //send back an error
            console.log("err");
            return res.status(422).send({ error: 'Email already exists' });
        }
    } catch (error) {
        //send back error, can't access database
        return res.status(423).send(error);
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
        let localRecords = await db.user.findAll({ where: { email: email } });
        let googleRecords = await db.user.findAll({ where: { googleAuth: email } });
        if (localRecords.length === 0 && googleRecords === 0) {
            //add a new record
            let addGoogleUser = await db.user.create({ firstName, lastName, password, googleAuth: email });
            // create token
            let jwtToken = await createToken(addGoogleUser);
            //send a jwt to client
            return res.json({ token: jwtToken, firstName, lastName });
        }
        else if ((localRecords.length === 0 && googleRecords !== 0)) {
            let updateGoogleRecord = await db.user.update({ email, password }, { where: { googleAuth: email } })
            //send a response
            let jwtToken = await createToken(updateGoogleRecord);
            //send a jwt to client
            return res.json({ token: jwtToken, firstName, lastName });
        } else {
            //send a token for the existing user record
            let jwtToken = await createToken(googleRecords[0]);
            return res.json({ token: jwtToken, firstName: googleRecords[0].firstName, lastName: googleRecords[0].lastName });
        }
    } catch (error) {
        //send back error, can't access database
        return res.status(423).send({ error: `Can't access database` });
    }
});


module.exports = router;
