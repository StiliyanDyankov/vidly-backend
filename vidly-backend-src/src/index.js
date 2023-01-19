const Joi = require("joi");
const express = require("express");
const app = express();

// router
const routerGenres = require('./routes/genres')
const routerCustomers = require('./routes/customers')
const routerMovies = require('./routes/movies')
// const routerRentals = require("./routes/rentals");
const routerUsers = require("./routes/users");

app.use(express.json());

// api router - middleware
app.use('/api/genres', routerGenres);
app.use('/api/customers', routerCustomers);
app.use('/api/movies', routerMovies);
// app.use('/api/rentals', routerRentals);
app.use('/api/users', routerUsers);

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
});
