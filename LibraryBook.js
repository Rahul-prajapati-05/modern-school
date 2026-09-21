const mongoose = require("mongoose");

const libraryBookSchema = new mongoose.Schema(
    {

        title: {
            type: String,
            required: true,
            trim: true
        },

        author: {
            type: String,
            required: true,
            trim: true
        },

        publisher: {
            type: String,
            default: "",
            trim: true
        },

        isbn: {
            type: String,
            default: "",
            trim: true
        },

        category: {
            type: String,
            default: "General",
            trim: true
        },

        totalCopies: {
            type: Number,
            required: true,
            min: 1
        },

        availableCopies: {
            type: Number,
            required: true,
            min: 0
        },

        shelfNumber: {
            type: String,
            default: "",
            trim: true
        },

        description: {
            type: String,
            default: "",
            trim: true
        },

        status: {
            type: String,
            enum: [
                "active",
                "inactive"
            ],
            default: "active"
        }

    },
    {
        timestamps: true
    }
);

module.exports =
    mongoose.model(
        "LibraryBook",
        libraryBookSchema
    );