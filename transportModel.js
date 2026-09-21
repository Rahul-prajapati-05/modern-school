// =====================================================
// TRANSPORT MODEL
// =====================================================

const mongoose = require("mongoose");

// =====================================================
// VEHICLE SCHEMA
// =====================================================

const vehicleSchema = new mongoose.Schema(
    {
        vehicleNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        vehicleType: {
            type: String,
            required: true,
            trim: true
        },

        driverName: {
            type: String,
            required: true,
            trim: true
        },

        driverPhone: {
            type: String,
            required: true,
            trim: true
        },

        capacity: {
            type: Number,
            required: true,
            min: 1
        },

        routeName: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: ["active", "inactive"],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);

// =====================================================
// EXPORT MODEL
// =====================================================

module.exports = mongoose.model(
    "TransportVehicle",
    vehicleSchema
);