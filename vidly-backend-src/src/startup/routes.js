const express = require("express");

const routerGenres = require("../routes/genres");
const routerCustomers = require("../routes/customers");
const routerMovies = require("../routes/movies");
const routerUsers = require("../routes/users");

const auth = require("../routes/auth");
const error = require("../../middleware/error");

module.exports = function (app) {
    app.use(express.json());

    // api router - middleware
    app.use("/api/genres", routerGenres);
    app.use("/api/customers", routerCustomers);
    app.use("/api/movies", routerMovies);
    app.use("/api/users", routerUsers);
    app.use("/api/auth", auth);

    app.use(error);
};
