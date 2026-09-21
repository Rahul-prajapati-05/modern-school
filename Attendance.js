const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true
        },

        date: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ["present", "absent", "late", "leave"],
            required: true
        },

        remarks: {
            type: String,
            default: "",
            trim: true
        }
    },
    {
        timestamps: true
    }
);


// Same student ki same date par duplicate attendance nahi
attendanceSchema.index(
    {
        student: 1,
        date: 1
    },
    {
        unique: true
    }
);


module.exports =
    mongoose.model(
        "Attendance",
        attendanceSchema
    );