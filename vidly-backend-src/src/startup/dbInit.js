const { default: mongoose } = require("mongoose");
const winston = require("winston");

module.exports = function () {
    mongoose
        .connect("mongodb://localhost/vidly-backend")
        .then(() => {
            winston.info("Connected to mongodb...");
        })
        .catch(() => {
            winston.info("Couldn't connect to mongodb...");
        });
};
