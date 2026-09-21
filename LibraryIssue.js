const mongoose = require("mongoose");

const libraryIssueSchema = new mongoose.Schema(
    {

        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true
        },

        book: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "LibraryBook",
            required: true
        },

        issueDate: {
            type: Date,
            required: true
        },

        dueDate: {
            type: Date,
            required: true
        },

        returnDate: {
            type: Date,
            default: null
        },

        status: {
            type: String,
            enum: [
                "issued",
                "returned",
                "overdue"
            ],
            default: "issued"
        },

        fineAmount: {
            type: Number,
            default: 0,
            min: 0
        },

        finePaid: {
            type: Boolean,
            default: false
        }

    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "LibraryIssue",
        libraryIssueSchema
    );