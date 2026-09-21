// =====================================================
// HOSTEL MODEL
// =====================================================

const mongoose = require("mongoose");


// =====================================================
// HOSTEL SCHEMA
// =====================================================

const hostelSchema = new mongoose.Schema(
    {

        hostelName: {
            type: String,
            required: true,
            trim: true
        },

        hostelType: {
            type: String,
            enum: [
                "Boys",
                "Girls",
                "Mixed"
            ],
            required: true
        },

        wardenName: {
            type: String,
            required: true,
            trim: true
        },

        wardenPhone: {
            type: String,
            required: true,
            trim: true
        },

        address: {
            type: String,
            default: "",
            trim: true
        },

        totalRooms: {
            type: Number,
            default: 0,
            min: 0
        },

        totalBeds: {
            type: Number,
            default: 0,
            min: 0
        },

        occupiedBeds: {
            type: Number,
            default: 0,
            min: 0
        },

        monthlyFee: {
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
// AVAILABLE BEDS
// =====================================================

hostelSchema.virtual("availableBeds")
    .get(function () {

        return Math.max(
            0,
            this.totalBeds - this.occupiedBeds
        );

    });


// =====================================================
// MODEL
// =====================================================

const Hostel =
    mongoose.models.Hostel ||
    mongoose.model(
        "Hostel",
        hostelSchema
    );


// =====================================================
// EXPORT
// =====================================================

module.exports = Hostel;