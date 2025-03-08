const express = require("express");
const router = express.Router();
const {
    register,
    login,
    getUsers,
    getProfile,
} = require("../controllers/authController");
const auth = require("../middleware/auth");
const checkRole = require("..//middleware/roleCheck");

router.post("/register", register);
router.post("/login", login);

router.get("/users", auth, checkRole("admin"), getUsers);
router.get("/me", auth, getProfile);

module.exports = router;
