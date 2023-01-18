const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
    .connect("mongodb://localhost/vidly-backend")
    .then(() => {
        console.log("Connected to db...");
    })
    .catch((err) => {
        console.log("Couldnt connect to db: ", err.message);
    });

const genresSchema = new mongoose.Schema({
    idHandle: {
        type: Number,
        min: 1,
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
});

const Genres = mongoose.model("genres", genresSchema);

const createGenre = async (genreName) => {
    const newId = await generateNewId();
    if (typeof newId === "number") {
        try {
            const result = await Genres.create({
                idHandle: newId,
                name: genreName,
            });
            return result;
        } catch (err) {
            console.log("Could not create new doc", err.message);
            return err;
        }
    } else return "Could not generate id";
};

const findGenre = async (id) => {
    try {
        const result = await Genres.findOne({ idHandle: id });
        console.log("result from fetch", result);
        return result;
    } catch (err) {
        console.log("Could not find genre with the given id", err.message);
        return err;
    }
};

const getGenres = async () => {
    try {
        const result = await Genres.find();
        console.log("result from fetch", result);
        return result;
    } catch (err) {
        console.log("Could not find genre with the given id", err.message);
        return err;
    }
};

const updateGenre = async (id, newName) => {
    try {
        await Genres.updateOne({ idHandle: id }, { name: newName });
        const result = await Genres.findOne({ idHandle: id });
        return result;
    } catch (err) {
        console.log("Could not update genre with the given id", err.message);
        return err;
    }
};

const deleteGenre = async (id) => {
    try {
        const genre = await Genres.findOne({ idHandle: id });
        const result = await Genres.deleteOne({ idHandle: id });
        if (result) updateDocs(id);
        return genre;
    } catch (err) {
        console.log("Could not delete genre with the given id", err.message);
        return err;
    }
};

module.exports = {
    createGenre,
    findGenre,
    getGenres,
    updateGenre,
    deleteGenre,
};

const generateNewId = async () => {
    try {
        const newId = (await Genres.find().count()) + 1;
        console.log(typeof newId);
        return newId;
    } catch (err) {
        console.log("could not generate Id", err.message);
        return;
    }
};

async function updateDocs(id) {
    const rest = await Genres.find({ idHandle: { $gt: id } });
    rest.forEach(async (genre) => {
        await Genres.updateOne(
            { idHandle: genre.idHandle },
            { idHandle: genre.idHandle - 1 }
        );
    });
}
