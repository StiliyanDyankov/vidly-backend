const Joi = require("joi");
const express = require("express");
const router = express.Router();

const {createGenre, findGenre, getGenres, updateGenre, deleteGenre} = require('../db/genresDb');

const validateGenre = (genre) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
    });

    return schema.validate(genre);
};

router.get("/", async (req, res) => {
    try {
        const result = await getGenres();
        console.log("result from req", result);
        res.send(result);
    } catch (err) {
        const newErrLog = {log:"Could not get genres", err:err}
        console.log(newErrLog);
        res.send(newErrLog);
    }
});

router.post("/", async (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const newGenre = {
        name: req.body.name,
    };
    try {
        const result = await createGenre(newGenre.name);
        console.log("result from req", result);
        res.send(result);
    } catch (err) {
        const newErrLog = {log:"Could not create new genre", err}
        console.log(newErrLog);
        res.send(newErrLog);
    }
});

router.get("/:id", async (req, res) => {
    try {
        const genre = await findGenre(req.params.id);
        if (!genre) return res.status(404).send("genre with this id not found");
        res.send(genre);
    } catch (err) {
        const newErrLog = {log:"Could not find genre", err}
        console.log(newErrLog);
        res.send(newErrLog);
    }
});

router.put("/:id", async (req, res) => {
    try {
        const { error } = validateGenre(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const result = await updateGenre(req.params.id, req.body.name);
        
        if (!result) return res.status(404).send("genre with this id not found");
        
        res.send(result);
    } catch(err) {
        const newErrLog = {log:"Could not find genre", err}
        console.log(newErrLog);
        res.send(newErrLog);
    }
});


router.delete("/:id", async (req, res) => {
    try {
        const genre = await deleteGenre(req.params.id);
        if (!genre) return res.status(404).send("genre with this id not found");
        res.send(genre);
    } catch (err) {
        const newErrLog = {log:"Could not find genre", err}
        console.log(newErrLog);
        res.send(newErrLog);
    }
});


module.exports = router;