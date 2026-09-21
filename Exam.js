const mongoose = require("mongoose");

const examSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            default: ""
        },

        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            default: null
        },

        examDate: {
            type: Date,
            default: null
        },

        status: {
            type: String,
            enum: [
                "upcoming",
                "ongoing",
                "completed"
            ],
            default: "upcoming"
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "Exam",
        examSchema
    );