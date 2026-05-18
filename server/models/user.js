const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    character: {
        type: String,
        default: "jiji"
    }
});

module.exports = mongoose.model("User", userSchema);