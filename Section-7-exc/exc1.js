const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
    .connect("mongodb://localhost/mongo-exercises")
    .then(() => {
        console.log("Connected to mongo-exc");
    })
    .catch((err) => {
        console.log("Couldn't connect to mongo-exc", err.message);
    });

const courseSchema = new mongoose.Schema({
    tags: [String],
    date: {
        type: Date,
        default: Date.now,
    },
    name: String,
    author: String,
    isPublished: Boolean,
    price: Number,
});

const Courses = mongoose.model("courses", courseSchema);

const displayExc1 = async () => {
    const result = await Courses.find()
        .sort({ name: 1 })
        .select({ name: 1, author: 1 });
    console.log(result);
};

const displayExc2 = async () => {
    const result = await Courses.find({
        tags: { $in: ["frontend", "backend"] },
    })
        .sort({ price: -1 })
        .select({ name: 1, author: 1 });
    console.log(result);
};

const displayExc3 = async () => {
    const result = await Courses
        .find({
            isPublished: true,
        })
        .or([
            {
                price: {
                    $gte: 15,
                },
            },
            { name: /.*by.*/i },
        ]);
    console.log(result);
};

displayExc3();
