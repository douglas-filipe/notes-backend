const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
    title: String,
    desc: String,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }    
}, { timestamps: true });

noteSchema.index({'title': 'text', 'desc': 'text'})

module.exports = mongoose.model("Notes", noteSchema)
