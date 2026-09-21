// =====================================================
// ROOM MODEL
// =====================================================

const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
    {

        hostelId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Hostel",
            required: true
        },

        roomNumber: {
            type: String,
            required: true,
            trim: true
        },

        floor: {
            type: String,
            default: "",
            trim: true
        },

        roomType: {
            type: String,
            enum: [
                "Single",
                "Double",
                "Triple",
                "Dormitory"
            ],
            required: true
        },

        totalBeds: {
            type: Number,
            required: true,
            min: 1
        },

        occupiedBeds: {
            type: Number,
            default: 0,
            min: 0
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


// =====================================================
// PREVENT DUPLICATE ROOM IN SAME HOSTEL
// =====================================================

roomSchema.index(
    {
        hostelId: 1,
        roomNumber: 1
    },
    {
        unique: true
    }
);


// =====================================================
// MODEL
// =====================================================

const Room =
    mongoose.models.Room ||
    mongoose.model(
        "Room",
        roomSchema
    );


module.exports = Room;