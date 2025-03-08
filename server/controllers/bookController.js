const Book = require("../models/Book");

// create a book (only for admin and author)
exports.uploadBook = async (req, res) => {
    try{
        const { title, description, author, pdfUrl, no_of_pages } = req.body;

        const book = await Book.create({
            title,
            description,
            author,
            pdfUrl,
            no_of_pages,
            createdBy: req.user.userId,
        });

        await book.populate("createdBy","username");

        res.status(201).json({
            book,
            message: "Book uploaded successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Could not upload book",
            details: error.message,
        });
    }
};

//Get all books (for all roles)
exports.getAllBooks = async (req, res) => {
    try{
        const books = await Book.find()
        .populate("createdBy", "username")
        .sort({ createdAt: -1});

        res.json({
            books,
            count: books.length,
            message: "Books retrieved successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Could not fetch books",
            details: error.message,
        });
    }
};

exports.updateBook = async (req, res) => {
    try{
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!book) {
            return res.status(404).json({
              message: "book not found",
            });
          }
        res.json({
            book,
            message: "Book updated successfully",
        });
    } catch (error) {
        res.status(500).json({
            message: "Could not update book",
            details: error.message,
        });
    }

};

exports.deleteBook = async(req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.bookId);
    
        if (!book) {
          return res.status(404).json({
            message: "book not found",
          });
        }
    
        res.json({
          message: "Book deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
          message: "Could not delete book",
          details: error.message,
        });
    }
};