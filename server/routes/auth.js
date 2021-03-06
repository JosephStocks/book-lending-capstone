const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs"); //encrypt passwords
const db = require("../models");
const config = require('../config/jwtsecret');
const jwt = require('jsonwebtoken');

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
            let user = await db.user.create({ firstName, lastName, email, password });
            res.send('user stored')
            // let jwtToken = token(user); //token returns a jwt
            // return res.json({ token: jwtToken }); //passing a jwt to client
        } else {
            //send back an error

            return res.status(422).send({ error: 'Email already exists' });
        }
    } catch (error) {
        //send back error, can't access database
        return res.status(423).send({ error: `Can't access database` });
    }

});
module.exports = router;
