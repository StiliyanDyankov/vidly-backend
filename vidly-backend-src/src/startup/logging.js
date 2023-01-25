const winston = require("winston");
require("winston-mongodb");

module.exports = function () {
    process.on("uncaughtException", (err) => {
        console.log("TERMINAL ERROR!!!");
        winston.error(err.message, err);
    });

    new winston.ExceptionHandler(
        new winston.transports.Console({ colorize: true, prettyPrint: true }),
        new winston.transports.File({ filename: "uncaughtExceptions.log" }),
        new winston.transports.MongoDB({
            db: "mongodb://localhost/vidly-backend",
        })
    );
    new winston.RejectionHandler(
        new winston.transports.File({ filename: "uncaughtExceptions.log" }),
        new winston.transports.MongoDB({
            db: "mongodb://localhost/vidly-backend",
        })
    );

    winston.add(new winston.transports.File({ filename: "logfile.log" }));
    winston.add(
        new winston.transports.MongoDB({ db: "mongodb://localhost/vidly" })
    );
};
