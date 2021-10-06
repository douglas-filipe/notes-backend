const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: {type: String, required: true},
    desc: {type: String, required: true},
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }    
}, { timestamps: true });

module.exports = mongoose.model("Notes", noteSchema)
