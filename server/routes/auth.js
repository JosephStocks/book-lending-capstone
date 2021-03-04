const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); //encrypt passwords
const db = require("../models");
const config = require('../config/jwtsecret');

router.post("/signin", requireSignin, (req, res) => {
    //validate user

    //send token

    res.json({ token: token(req.user) })
});

/**
 * registering a new user in our database and send back a jwt
 */
router.post("/signup", async (req, res) => {
    //body-parse to scrape info
    //email, password
    let email = req.body.email;
    //encrypt: bcrypt
    let password = bcrypt.hashSync(req.body.password, 8);

    //models- store in database
    try {
        let records = await db.user.findAll({ where: { email: email } });

        if (records.length === 0) {
            //add a new record

            let user = await db.user.create({ email: email, password: password });

            let jwtToken = token(user); //token returns a jwt

            return res.json({ token: jwtToken }); //passing a jwt to client

        } else {
            //send back an error

            return res.status(422).send({ error: 'Email already exists' });
        }
    } catch (error) {
        //send back error, can't access database
        return res.status(423).send({ error: `Can't access database` });
    }

    //create jwt token

    //send back a token
});
module.exports = router;
