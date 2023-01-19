const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const genresSchema = require("../db/genresDb").genresSchema;
const { findGenre } = require("../db/genresDb").methods;

mongoose
    .connect("mongodb://localhost/vidly-backend")
    .then(() => {
        console.log("Connected to movies db...");
    })
    .catch((err) => {
        console.log("Couldnt connect to movies db: ", err.message);
    });

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
    genre: genresSchema,
    numberInStock: {
        type: Number,
        min: 0,
        set: (v) => {
            return v || 0;
        },
    },
    dailyRentalRate: {
        type: Number,
        min: 0,
        set: (v) => {
            return v || 0;
        },
    },
});

const Movies = mongoose.model("movies", movieSchema);

const createMovie = async (movie) => {
    // try{
    // } catch(err) {
    //     console.log("Could not find genre with given id to embed", err.message);
    //     return err;
    // }
    try {
        const genre = await findGenre(movie.genre);
        console.log("passed to db Movie", movie);
        const result = await Movies.create({
            title: movie.title,
            genre: genre,
            numberInStock: movie.numberInStock,
            dailyRentalRate: movie.dailyRentalRate,
        });
        return result;
    } catch (err) {
        console.log("Could not create new doc", err.message);
        return err;
    }
};

const findMovie = async (id) => {
    try {
        const result = await Movies.findOne({ _id: id });
        console.log("result from fetch", result);
        return result;
    } catch (err) {
        console.log("Could not find Movie with the given id", err.message);
        return err;
    }
};

const getMovies = async () => {
    try {
        const result = await Movies.find();
        console.log("result from fetch", result);
        return result;
    } catch (err) {
        console.log("Could not find Movie with the given id", err.message);
        return err;
    }
};

const updateMovie = async (id, movie) => {
    try {
        let updatedMovie = {};
        for (const key in movie) {
            updatedMovie[key] = movie[key];
        }
        console.log("updated Movie", {
            ...updatedMovie
        });
        if (updatedMovie.genre) {
            updatedMovie.genre = await findGenre(movie.genre);
        }
        await Movies.updateOne(
            { _id: id },
            {
                ...updatedMovie,
            }
        );
        const result = await Movies.findOne({ _id: id });
        return result;
    } catch (err) {
        console.log("Could not update Movie with the given id", err.message);
        return err;
    }
};

const deleteMovie = async (id) => {
    try {
        const movie = await Movies.findOne({ _id: id });
        const result = await Movies.deleteOne({ _id: id });
        return movie;
    } catch (err) {
        console.log("Could not delete Movie with the given id", err.message);
        return err;
    }
};

module.exports = {
    createMovie,
    findMovie,
    getMovies,
    updateMovie,
    deleteMovie,
};
