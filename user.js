const mongoose = require("mongoose");

const user  = new mongoose.Schema({
    // firstname: {
    //     type: String
    // },
    // lastname: {
    //     type: String
    // },
    user: String
});

module.exports = mongoose.model("user", user)