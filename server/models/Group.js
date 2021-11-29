const mongoose = require('mongoose');
const groupSchema = new mongoose.Schema({
    name: {  //<- Administrator
        type: String,
        required: true
    },
    identifier: {
        type: String, //admin
        required: true
    },
    routes: {
        type: Array //[ "/api/...", "/api/.../...", "regex"]
    }
})

module.exports = mongoose.model("Group", groupSchema);
