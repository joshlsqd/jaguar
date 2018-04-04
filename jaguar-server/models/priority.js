const mongoose = require("mongoose");


const prioritySchema = new mongoose.Schema(
    {
        priority: {
            type: String,
            required: true
        },
        task: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }
    },
    {
        timestamps:true
    });

const Priority = mongoose.model("Priority", prioritySchema);
module.exports = Priority;
