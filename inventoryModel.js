const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema(
    {
        itemName: {
            type: String,
            required: true,
            trim: true
        },

        category: {
            type: String,
            required: true,
            trim: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 0
        },

        availableQuantity: {
            type: Number,
            required: true,
            min: 0
        },
        damagedQuantity: {
    type: Number,
    default: 0,
    min: 0
},

        unitPrice: {
            type: Number,
            default: 0,
            min: 0
        },

        supplier: {
            type: String,
            trim: true,
            default: ""
        },

        purchaseDate: {
            type: Date
        },

        description: {
            type: String,
            trim: true,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "Available",
                "Low Stock",
                "Out of Stock"
            ],
            default: "Available"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "Inventory",
    inventorySchema
);