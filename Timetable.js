const mongoose = require("mongoose");

const timetableSchema = new mongoose.Schema(
    {
        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            required: true
        },

        section: {
            type: String,
            default: "",
            trim: true
        },

        subject: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Subject",
            required: true
        },

        teacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            required: true
        },

        day: {
            type: String,
            enum: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday"
            ],
            required: true
        },

        period: {
            type: Number,
            required: true,
            min: 1
        },

        startTime: {
            type: String,
            default: "",
            trim: true
        },

        endTime: {
            type: String,
            default: "",
            trim: true
        },

        room: {
            type: String,
            default: "",
            trim: true
        }
    },
    {
        timestamps: true
    }
);


// Same class + section + day + period
// par duplicate timetable nahi
timetableSchema.index(
    {
        class: 1,
        section: 1,
        day: 1,
        period: 1
    },
    {
        unique: true
    }
);


module.exports =
    mongoose.model(
        "Timetable",
        timetableSchema
    );