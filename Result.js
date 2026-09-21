const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
    {
        exam: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Exam",
            required: true
        },

        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true
        },

        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true
        },

        marksObtained: {
            type: Number,
            required: true,
            min: 0
        },

        totalMarks: {
            type: Number,
            required: true,
            min: 0
        },

        grade: {
            type: String,
            default: ""
        },

        remarks: {
            type: String,
            default: ""
        }
    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "Result",
        resultSchema
    );