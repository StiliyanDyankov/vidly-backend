const bcrypt = require("bcrypt");
const Joi = require("joi");
const _ = require("lodash");
const express = require("express");
const router = express.Router();

const { createUser, findUser, getUsers, updateUser, deleteUser } =
    require("../db/usersDb").methods;

const Users = require("../db/usersDb").Users;

const validateUser = (user) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(8).required(),
    });

    return schema.validate(user);
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
    const { error } = validateUser(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let isRegistered = await Users.findOne({ email: req.body.email });
    if (isRegistered) return res.status(400).send("User already registered");

    console.log("newUsrr", req.body);
    let newUser = new Users(_.pick(req.body, ["name", "password", "email"]));
    const salt = await bcrypt.genSalt(10);
    newUser.password = await bcrypt.hash(newUser.password, salt);

    try {
        const user = await createUser(newUser);

        const token = user.generateAuthToken();

        res.header("x-auth-token", token).send(
            _.pick(newUser, ["_id", "name", "email"])
        );
    } catch (err) {
        const newErrLog = { log: "Could not create new user", err };
        console.log(newErrLog);
        res.send(newErrLog);
    }
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
