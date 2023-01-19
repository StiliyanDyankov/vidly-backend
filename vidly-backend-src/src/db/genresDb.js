const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
    .connect("mongodb://localhost/vidly-backend")
    .then(() => {
        console.log("Connected to genres db...");
    })
    .catch((err) => {
        console.log("Couldnt connect to genres db: ", err.message);
    });

const genresSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30,
    },
});

const Genres = mongoose.model("genres", genresSchema);

const createGenre = async (genreName) => {
    try {
        const result = await Genres.create({
            name: genreName,
        });
        return result;
    } catch (err) {
        console.log("Could not create new doc", err.message);
        return err;
    }
};

const findGenre = async (id) => {
    try {
        const result = await Genres.findOne({ _id: id });
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
        await Genres.updateOne({ _id: id }, { name: newName });
        const result = await Genres.findOne({ _id: id });
        return result;
    } catch (err) {
        console.log("Could not update genre with the given id", err.message);
        return err;
    }
};

const deleteGenre = async (id) => {
    try {
        const genre = await Genres.findOne({ _id: id });
        await Genres.deleteOne({ _id: id });
        return genre;
    } catch (err) {
        console.log("Could not delete genre with the given id", err.message);
        return err;
    }
};

module.exports.methods = {
    createGenre,
    findGenre,
    getGenres,
    updateGenre,
    deleteGenre,
};
module.exports.genresSchema = genresSchema;

// const generateNewId = async () => {
//     try {
//         const newId = (await Genres.find().count()) + 1;
//         console.log(typeof newId);
//         return newId;
//     } catch (err) {
//         console.log("could not generate Id", err.message);
//         return;
//     }
// };

// async function updateDocs(id) {
//     const rest = await Genres.find({ _id: { $gt: id } });
//     rest.forEach(async (genre) => {
//         await Genres.updateOne(
//             { _id: genre._id },
//             { _id: genre._id - 1 }
//         );
//     });
// }
