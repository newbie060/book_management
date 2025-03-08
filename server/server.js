require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

//connect to MongoDB
connectDB();

const app = express();

//Middleware
app.use(cors());
app.use(express.json());

//Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/books", require("./routes/books"));


//Error handling middleware
app.use((err, req, res, next) => {
    console.log(err.stack);
    res.status(500).json({ message: "Something went wrong!" });
});

const PORT = process.env.PORT||5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});