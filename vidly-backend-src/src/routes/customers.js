const Joi = require("joi");
const express = require("express");
const router = express.Router();

const {
    createCustomer,
    findCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer,
} = require("../db/customersDb").methods;

const validateCustomer = (customer) => {
    const schema = Joi.object().keys({
        isGold: Joi.bool(),
        name: Joi.string().min(3).required(),
        phone: Joi.string().min(3).required(),
    });

    return schema.validate(customer);
};

router.get("/", async (req, res) => {
    try {
        const result = await getCustomers();
        console.log("result from req", result);
        res.send(result);
    } catch (err) {
        const newErrLog = { log: "Could not get Customers", err: err };
        console.log(newErrLog);
        res.send(newErrLog);
    }
});

router.post("/", async (req, res) => {
    const { error } = validateCustomer(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let updatedCustomer = {};
    for (const key in req.body) {
        updatedCustomer[key] = req.body[key];
    }

    const newCustomer = {
        ...updatedCustomer,
    };

    try {
        const result = await createCustomer(newCustomer);
        console.log("result from req", result);
        res.send(result);
    } catch (err) {
        const newErrLog = { log: "Could not create new Customer", err };
        console.log(newErrLog);
        res.send(newErrLog);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const customer = await findCustomer(req.params.id);
        if (!customer)
            return res.status(404).send("Customer with this id not found");
        res.send(customer);
    } catch (err) {
        const newErrLog = { log: "Could not find Customer", err };
        console.log(newErrLog);
        res.send(newErrLog);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { error } = validateCustomer(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const result = await updateCustomer(req.params.id, req.body);

        if (!result)
            return res.status(404).send("Customer with this id not found");

        res.send(result);
    } catch (err) {
        const newErrLog = { log: "Could not find Customer", err };
        console.log(newErrLog);
        res.send(newErrLog);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const Customer = await deleteCustomer(req.params.id);
        if (!Customer)
            return res.status(404).send("Customer with this id not found");
        res.send(Customer);
    } catch (err) {
        const newErrLog = { log: "Could not find Customer", err };
        console.log(newErrLog);
        res.send(newErrLog);
    }
});

module.exports = router;
