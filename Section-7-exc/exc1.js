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
    _id: String,
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
    const result = await Courses.find({
        isPublished: true,
    }).or([
        {
            price: {
                $gte: 15,
            },
        },
        { name: /.*by.*/i },
    ]);
    console.log(result);
};

// displayExc3();

const update1 = async (id) => {
    const course = await Courses.findById(id);
    console.log(course);
    if (!course) return;
    course.set({
        isPublished: true,
        author: "another author",
    });
    // course.isPublished = true;
    // course.author = "another author";
    const result = await course.save();
    console.log(result);
};

const update2 = async (id) => {
    const result = await Courses.updateMany({_id:id},{
        $set: {
            author: "Mosh",
            isPublished: false
        }
    });
    console.log(result);
};

// update2("5a68fde3f09ad7646ddec17e");

const removeCourse = async (id) => {
    const result = await Courses.deleteOne({_id:id});
    console.log(result);
}

removeCourse("5a68fde3f09ad7646ddec17e");