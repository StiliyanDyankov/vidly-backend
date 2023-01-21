const asyncMiddleware = require("../../middleware/async");
const admin = require("../../middleware/admin");
const auth = require("../../middleware/auth");
const Joi = require("joi");
const express = require("express");
const router = express.Router();

const { createGenre, findGenre, getGenres, updateGenre, deleteGenre } =
    require("../db/genresDb").methods;

const validateGenre = (genre) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
    });

    return schema.validate(genre);
};

router.get(
    "/",
    asyncMiddleware(async (req, res, next) => {
        const result = await getGenres();
        console.log("result from req", result);
        res.send(result);
    })
);

router.post(
    "/",
    auth,
    asyncMiddleware(async (req, res) => {
        const { error } = validateGenre(req.body);
        if (error) return res.status(400).send(error.details[0].message);
        const newGenre = {
            name: req.body.name,
        };
        const result = await createGenre(newGenre.name);
        console.log("result from req", result);
        res.send(result);
    })
);

router.get(
    "/:id",
    asyncMiddleware(async (req, res) => {
        const genre = await findGenre(req.params.id);
        if (!genre) return res.status(404).send("genre with this id not found");
        res.send(genre);
    })
);

router.put(
    "/:id",
    auth,
    asyncMiddleware(async (req, res) => {
        const { error } = validateGenre(req.body);
        if (error) return res.status(400).send(error.details[0].message);

        const result = await updateGenre(req.params.id, req.body.name);

        if (!result)
            return res.status(404).send("genre with this id not found");

        res.send(result);
    })
);

router.delete(
    "/:id",
    [auth, admin],
    asyncMiddleware(async (req, res) => {
        const genre = await deleteGenre(req.params.id);
        if (!genre) return res.status(404).send("genre with this id not found");
        res.send(genre);
    })
);

module.exports = router;
