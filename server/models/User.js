const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },

        role: {
            type: String,
            enum: ["admin", "author", "user"],
            default: "user",
        },
    },
    { timestamps: true}
);

//This code runs before saving a user to the database 
//It encrypts the password so we never store plain text passwords
userSchema.pre("save", async function (next) {
    // Only encrypt the password if it has been modified
    //This prevents double- encryption when updating other user details
    if(!this.isModified("password")) return next();

    //Generate a secure password hash using bcrypt
    //The number 10 is the "salt rounds" - higher means secure but slower
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.comparePassword = async function (password) {
    // Returns true if passwords match, false if they don't
    return await bcrypt.compare(password, this.password);
};

// Create the User model from our schema
module.exports = mongoose.model("User", userSchema);