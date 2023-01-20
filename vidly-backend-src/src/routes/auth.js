const config = require('config');
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { createUser, findUser, getUsers, updateUser, deleteUser } =
    require("../db/usersDb").methods;

const Users = require("../db/usersDb").Users;

const validate = (req) => {
    const schema = Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    });

    return schema.validate(req);
};

router.get("/", async (req, res) => {
    try {
        const result = await getUsers();
        console.log("result from req", result);
        res.send(result);
    } catch (err) {
        const newErrLog = { log: "Could not get users", err: err };
        console.log(newErrLog);
        res.send(newErrLog);
    }
});

router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await Users.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    const validPassword = await bcrypt.compare(req.body.password, user.password)

    if(!validPassword) return res.status(400).send("Invalid email or password");

    const token = jwt.sign({_id: user._id}, config.get('jwtPrivateKey'));
    res.send(token);

    // try {
    //     const result = await createUser(newUser);
    //     console.log("result from req", result);
    //     res.send(_.pick(newUser, ["_id", "name", "email"]));
    // } catch (err) {
    //     const newErrLog = { log: "Could not create new user", err };
    //     console.log(newErrLog);
    //     res.send(newErrLog);
    // }
});

router.get("/:id", async (req, res) => {
    try {
        const customer = await findUser(req.params.id);
        if (!customer)
            return res.status(404).send("User with this id not found");
        res.send(customer);
    } catch (err) {
        const newErrLog = { log: "Could not find user", err };
        console.log(newErrLog);
        res.send(newErrLog);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { error } = validateUser(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const result = await updateUser(req.params.id, req.body);

        if (!result) return res.status(404).send("User with this id not found");

        res.send(result);
    } catch (err) {
        const newErrLog = { log: "Could not find user", err };
        console.log(newErrLog);
        res.send(newErrLog);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const user = await deleteUser(req.params.id);
        if (!user) return res.status(404).send("User with this id not found");
        res.send(user);
    } catch (err) {
        const newErrLog = { log: "Could not find User", err };
        console.log(newErrLog);
        res.send(newErrLog);
    }
});

module.exports = router;
