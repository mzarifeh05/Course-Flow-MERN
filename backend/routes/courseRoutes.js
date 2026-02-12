const express = require("express");
const {
    createCourse,
    getCourses,
    updateCourse,
    deleteCourse,
    getCourseById,
    enrollCourse,
    unenrollCourse,
} = require("../controllers/courseController");
const { authMiddleware, adminMiddleware } = require("../middleware/auth");

const router = express.Router();

// CREATE COURSE (ADMIN)
router.post("/", authMiddleware, adminMiddleware, createCourse);

// READ COURSES (PUBLIC)
router.get("/", getCourses);

// GET COURSE BY ID
router.get("/:id", getCourseById);

// UPDATE COURSE (ADMIN)
router.put("/:id", authMiddleware, adminMiddleware, updateCourse);

// DELETE COURSE (ADMIN)
router.delete("/:id", authMiddleware, adminMiddleware, deleteCourse);

// ENROLL
router.post("/:id/enroll", authMiddleware, enrollCourse);

// UNENROLL
router.post("/:id/unenroll", authMiddleware, unenrollCourse);

module.exports = router;
