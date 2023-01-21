const config = require("config");
const jwt = require("jsonwebtoken");

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
    .connect("mongodb://localhost/vidly-backend")
    .then(() => {
        console.log("Connected to users db...");
    })
    .catch((err) => {
        console.log("Couldnt connect to users db: ", err.message);
    });

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 30,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255,
    },
    isAdmin: {
        type: Boolean,
    }
});

userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
    return token;
}

const Users = mongoose.model("users", userSchema);

const createUser = async (user) => {
    try {
        console.log("passed to db customer", user);
        const result = await Users.create({
            name: user.name,
            email: user.email,
            password: user.password,
        });
        return result;
    } catch (err) {
        console.log("Could not create new doc", err.message);
        return err;
    }
};

const findUser = async (id) => {
    try {
        const result = await Users.findOne({ _id: id });
        console.log("result from fetch", result);
        return result;
    } catch (err) {
        console.log("Could not find Customer with the given id", err.message);
        return err;
    }
};

const getUsers = async () => {
    try {
        const result = await Users.find();
        console.log("result from fetch", result);
        return result;
    } catch (err) {
        console.log("Could not find Customer with the given id", err.message);
        return err;
    }
};

const updateUser = async (id, user) => {
    try {
        let updatedUser = {};
        for (const key in user) {
            updatedUser[key] = user[key];
        }
        console.log("updated user", {
            ...updatedUser,
        });
        await Users.updateOne(
            { _id: id },
            {
                ...updatedUser,
            }
        );
        const result = await Users.findOne({ _id: id });
        return result;
    } catch (err) {
        console.log("Could not update Customer with the given id", err.message);
        return err;
    }
};

const deleteUser = async (id) => {
    try {
        const user = await Users.findOne({ _id: id });
        const result = await Users.deleteOne({ _id: id });
        return user;
    } catch (err) {
        console.log("Could not delete Customer with the given id", err.message);
        return err;
    }
};

module.exports.methods = {
    createUser,
    findUser,
    getUsers,
    updateUser,
    deleteUser,
};

module.exports.Users = Users;