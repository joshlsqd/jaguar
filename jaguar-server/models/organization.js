const mongoose = require("mongoose");

const organizationSchema = new mongoose.Schema(
    {
        organizationtitle: {
            type: String,
            required: true,
            maxLength: 50,
            minLength: 3
        },
        organizationDescription: {
            type: String,
            maxLength: 160
        },
        organizationcomments: [{
            commentuser: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            },
            organizationcomment: {
                type: String
            }
        }],
        users: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        usertype: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }],
        // task: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Task"
        // }],
        // group: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Group"
        // }],
        // milestone: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Milestone"
        // }],
        // requirements: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Requirements"
        // }],
        project: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }],
        // client: [{
        //     type: mongoose.Schema.Types.ObjectId,
        //     ref: "Client"
        // }]
    },
    {
        timestamps:true
    });

const Organization = mongoose.model("Organization", organizationSchema);
module.exports = Organization;
