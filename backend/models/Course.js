const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
    imgURL: String,
    title: String,
    description: String,
    instructor: String,
    students: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
});

module.exports = mongoose.model("Course", CourseSchema);
