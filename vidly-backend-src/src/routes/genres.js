const Joi = require("joi");
const express = require("express");
const router = express.Router();

const genres = [
    { id: 1, name: "Horror" },
    { id: 2, name: "Romance" },
    { id: 3, name: "Action" },
];

const validateGenre = (genre) => {
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required(),
    });

    return schema.validate(genre);
};

router.get("/", (req, res) => {
    res.send(genres);
});

router.post("/", (req, res) => {
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const newGenre = {
        id: genres.length + 1,
        name: req.body.name,
    };
    genres.push(newGenre);
    res.send(newGenre);
});

router.get("/:id", (req, res) => {
    const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("genre with this id not found");
    res.send(genre);
});

router.put("/:id", (req, res) => {
    let genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send("genre with this id not found");
    
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    genre.name = req.body.name;
    res.send(genre);
});


router.delete("/:id", (req, res) => {
    const genre = genres.find((c) => c.id === parseInt(req.params.id));
    if (!genre)
        return res
            .status(404)
            .send("The genre with the given id was not found");

    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});


module.exports = router;