const Joi = require('joi');
const express = require("express");
const app = express();

app.use(express.json());

const port = process.env.PORT || 3000;

const courses = [
    { id: 1, name: "course1" },
    { id: 2, name: "course2" },
    { id: 3, name: "course3" },
    { id: 4, name: "course4" },
];

app.get("/", (req, res) => {
    res.send("Hello world!!");
});

app.get("/api/courses", (req, res) => {
    res.send(courses);
});

app.get("/api/courses/:id", (req, res) => {
    const course = courses.find((c) => c.id === parseInt(req.params.id));
    if (!course)
        res.status(404).send("The course with the given id was not found");
    res.send(course);
});













app.post("/api/courses", (req, res) => {
    // const schema = {
    //     name: Joi.string().min(3).required()
    // };
    
    const schema = Joi.object().keys({
        name: Joi.string().min(3).required()
    });

    console.log(req.body);
    const result = Joi.attempt(req.body, schema);
    console.log(result);

    // if (!req.body.name || req.body.name.length < 3) {
    //     res.status(400).send("Name requiete and min 3.");
    //     return;
    // }

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});

























app.listen(port, () => {
    console.log(`listening on port ${port}...`);
});
