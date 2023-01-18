const mongoose = require('mongoose');
mongoose.set("strictQuery", false);

mongoose
    .connect('mongodb://localhost/vidly-backend')
    .then(() => {
        console.log('Connected to db...');
    })
    .catch((err) => {
        console.log('Couldnt connect to db: ', err.message);
    });

const genresSchema = new mongoose.Schema({
    idHandle: {
        type: Number,
        set: async function() {
            try {
                const newId = await Genres.find().count() + 1;
                return newId;
            } catch(err) {
                console.log("could not generate Id", err.message);
                return;
            }
        }
    },
    name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 30
    }
});

const Genres = mongoose.model('genres', genresSchema);

const createGenre = async (genreName) => {
    try{   
        const result = await Genres.create({
            name: genreName
        });
        console.log(result);
        return result;
    } catch(err) {
        console.log("Could not create new doc", err.message);
        return err;
    }
}

module.exports =
    createGenre
