const Course = require("../models/Course");
const User = require("../models/User");

// CREATE COURSE (ADMIN)
const createCourse = async (req, res) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// READ COURSES (PUBLIC)
const getCourses = async (req, res) => {
    const courses = await Course.find();
    res.json(courses);
};

// UPDATE COURSE (ADMIN)
const updateCourse = async (req, res) => {
    const course = await Course.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    );
    res.json(course);
};

// DELETE COURSE (ADMIN)
const deleteCourse = async (req, res) => {
    await Course.findByIdAndDelete(req.params.id);
    res.json({ message: "course deleted" });
};

// GET COURSE BY ID
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);

        if (!course) {
            return res.status(404).json({ message: "Course not found" });
        }

        res.json(course);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ENROLL
const enrollCourse = async (req, res) => {
    try {
        const userId = req.user.id;
        const courseId = req.params.id;

        const user = await User.findById(userId);
        const course = await Course.findById(courseId);

        // avoid duplicates
        if (!user.courses.includes(courseId)) {
            user.courses.push(courseId);
            await user.save();
        }

        if (!course.students.includes(userId)) {
            course.students.push(userId);
            await course.save();
        }

        res.json({ message: "enrolled successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// UNENROLL
const unenrollCourse = async (req, res) => {
    try {
        const userId = req.user.id;
        const courseId = req.params.id;

        await User.findByIdAndUpdate(userId, {
            $pull: { courses: courseId },
        });

        await Course.findByIdAndUpdate(courseId, {
            $pull: { students: userId },
        });

        res.json({ message: "unenrolled successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse,
    getCourseById,
    enrollCourse,
    unenrollCourse,
};
