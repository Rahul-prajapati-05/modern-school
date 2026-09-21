const mongoose = require("mongoose");

const noticeSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },

        description: {
            type: String,
            required: true,
            trim: true
        },

        noticeDate: {
            type: Date,
            required: true
        },

        expiryDate: {
            type: Date,
            default: null
        },

        audience: {
            type: String,
            enum: [
                "All",
                "Students",
                "Teachers",
                "Parents"
            ],
            default: "All"
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

module.exports = mongoose.model(
    "Notice",
    noticeSchema
);