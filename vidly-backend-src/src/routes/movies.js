const Joi = require("joi");
const express = require("express");
const router = express.Router();

const {
    createMovie,
    findMovie,
    getMovies,
    updateMovie,
    deleteMovie,
} = require("../db/moviesDb").methods;

const validateMovie = (movie, strict=false) => {
    const schemaStrict = Joi.object().keys({
        title: Joi.string().min(3).required(),
        genre: Joi.string().min(10).required(),
        numberInStock: Joi.number().min(0).required(),
        dailyRentalRate: Joi.number().min(0).required(),
    });

    const schema = Joi.object().keys({
        title: Joi.string().min(3),
        genre: Joi.string().min(10),
        numberInStock: Joi.number().min(0),
        dailyRentalRate: Joi.number().min(0),
    });
    
    if(strict) {
        return schemaStrict.validate(movie);
    }
    return schema.validate(movie);
        
        
};

router.get("/", async (req, res) => {
    try {
        const result = await getMovies();
        console.log("result from req", result);
        res.send(result);
    } catch (err) {
        const newErrLog = { log: "Could not get Movies", err: err };
        console.log(newErrLog);
        res.send(newErrLog);
    }
});

router.post("/", async (req, res) => {
    const { error } = validateMovie(req.body, true);
    if (error) return res.status(400).send(error.details[0].message);

    let updatedMovie = {};
    for (const key in req.body) {
        updatedMovie[key] = req.body[key];
    }

    const newMovie = {
        ...updatedMovie,
    };

    try {
        const result = await createMovie(newMovie);
        console.log("result from req", result);
        res.send(result);
    } catch (err) {
        const newErrLog = { log: "Could not create new Movie", err };
        console.log(newErrLog);
        res.send(newErrLog);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const Movie = await findMovie(req.params.id);
        if (!Movie)
            return res.status(404).send("Movie with this id not found");
        res.send(Movie);
    } catch (err) {
        const newErrLog = { log: "Could not find Movie", err };
        console.log(newErrLog);
        res.send(newErrLog);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { error } = validateMovie(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const result = await updateMovie(req.params.id, req.body);

        if (!result)
            return res.status(404).send("Movie with this id not found");

        res.send(result);
    } catch (err) {
        const newErrLog = { log: "Could not find Movie", err };
        console.log(newErrLog);
        res.send(newErrLog);
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const movie = await deleteMovie(req.params.id);
        if (!movie)
            return res.status(404).send("Movie with this id not found");
        res.send(movie);
    } catch (err) {
        const newErrLog = { log: "Could not find Movie", err };
        console.log(newErrLog);
        res.send(newErrLog);
    }
});

module.exports = router;
