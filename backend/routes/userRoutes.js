const express = require("express");
const { getUserById } = require("../controllers/userController");

const router = express.Router();

// GET USER BY ID
router.get("/:id", getUserById);

module.exports = router;
