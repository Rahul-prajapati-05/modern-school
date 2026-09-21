const mongoose = require("mongoose");

const leaveTypeSchema = new mongoose.Schema(
    {
        leaveType: {
            type: String,
            required: true,
            trim: true,
            unique: true
        },

        description: {
            type: String,
            default: "",
            trim: true
        },

        maximumDays: {
            type: Number,
            required: true,
            min: 1
        },

        status: {
            type: String,
            enum: ["Active", "Inactive"],
            default: "Active"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "LeaveType",
    leaveTypeSchema
);