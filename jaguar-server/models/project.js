const mongoose = require("mongoose");
const User = require("./user");

const projectSchema = new mongoose.Schema(
    {
        projecttitle: {
            type: String,
            required: true,
            maxLength: 50,
            minLength: 3
        },
        projectDescription: {
            type: String,
            maxLength: 160
        },
        plannedcompletiondate: {
            type: Date
        },
        duedate: {
            type: Date
        },
        projectcomments: [{
            commentuser: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            projectcomment: {
                type: String
            }
        }],
        owners: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        task: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Task"
        }],
        group: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group"
        }],
        milestone: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Milestone"
        }],
        requirements: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Requirements"
        }]
    },
    {
        timestamps:true
    });

const Project = mongoose.model("Project", projectSchema);
module.exports = Project;
