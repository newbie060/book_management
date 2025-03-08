const express = require("express");
const router = express.Router();
const {
  uploadBook,
  getAllBooks,
  updateBook,
  deleteBook,
} = require("../controllers/bookController");
const auth = require("../middleware/auth");
const checkRole = require("../middleware/roleCheck");

// Admin routes
router.post("/", auth, checkRole("admin, author"), uploadBook);
router.put("/:bookId", auth,checkRole("admin"), updateBook)
router.get("/all", auth, checkRole("admin, user, author"), getAllBooks);
router.delete("/:bookId", auth, checkRole("admin"), deleteBook);

module.exports = router;
