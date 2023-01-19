const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
    .connect("mongodb://localhost/vidly-backend")
    .then(() => {
        console.log("Connected to customers db...");
    })
    .catch((err) => {
        console.log("Couldnt connect to customers db: ", err.message);
    });

const customerSchema = new mongoose.Schema({
    isGold: {
        type: Boolean,
        set: (v) => {
            return v || false;
        },
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    phone: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
});

const Customers = mongoose.model("customers", customerSchema);

const createCustomer = async (customer) => {
    try {
        console.log("passed to db customer", customer);
        const result = await Customers.create({
            isGold: customer.isGold,
            name: customer.name,
            phone: customer.phone,
        });
        return result;
    } catch (err) {
        console.log("Could not create new doc", err.message);
        return err;
    }
};

const findCustomer = async (id) => {
    try {
        const result = await Customers.findOne({ _id: id });
        console.log("result from fetch", result);
        return result;
    } catch (err) {
        console.log("Could not find Customer with the given id", err.message);
        return err;
    }
};

const getCustomers = async () => {
    try {
        const result = await Customers.find();
        console.log("result from fetch", result);
        return result;
    } catch (err) {
        console.log("Could not find Customer with the given id", err.message);
        return err;
    }
};

const updateCustomer = async (id, customer) => {
    try {
        let updatedCustomer = {};
        for (const key in customer) {
            updatedCustomer[key] = customer[key];
        }
        console.log("updated customer", {
            ...updatedCustomer,
        });
        await Customers.updateOne(
            { _id: id },
            {
                ...updatedCustomer,
            }
        );
        const result = await Customers.findOne({ _id: id });
        return result;
    } catch (err) {
        console.log("Could not update Customer with the given id", err.message);
        return err;
    }
};

const deleteCustomer = async (id) => {
    try {
        const customer = await Customers.findOne({ _id: id });
        const result = await Customers.deleteOne({ _id: id });
        return customer;
    } catch (err) {
        console.log("Could not delete Customer with the given id", err.message);
        return err;
    }
};

module.exports.methods = {
    createCustomer,
    findCustomer,
    getCustomers,
    updateCustomer,
    deleteCustomer,
};

module.exports.Customers = Customers;