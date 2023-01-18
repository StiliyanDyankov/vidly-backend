const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
    .connect("mongodb://localhost/playground")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Could not connect", err));

const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:255,
    },
    author: String,
    tags: {
        type: Array,
        validate: {
            validator: function(v) {
                return v && v.length > 0;
            },
            message: 'A course should have at least one tag.'
        }
    },
    date: {
        type: Date,
        default: Date.now,
    },
    isPublished: Boolean,
    price: {
        required: function() {
            return this.isPublished;
        }
    },
});

const Course = mongoose.model("Course", courseSchema);

async function createCourse() {
    // const course = new Course({
    //     name: "Angular Course",
    //     author: "Mosh",
    //     tags: ["angular", "frontend"],
    //     isPublished: true,
    // });

    // const result = await course.save();
    // console.log(result);

    const result = await Course.create({
        name: "Angular Course",
        author: "Mosh",
        tags: ["angular", "frontend"],
        isPublished: true,
    });
    console.log(result);
}

createCourse();

const getCourses = async () => {
    const courses = await Course
        // .find({ author: "Mosh", isPublished: true })
        .find()
        .or([{ author: "Mosh" }, { isPublished: true }])
        .limit(10)
        .sort({ name: 1 })
        .select({ name: 1, tags: 1 });

    console.log(courses);
};

// getCourses();
