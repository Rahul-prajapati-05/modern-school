const mongoose = require("mongoose");

const inventoryIssueSchema = new mongoose.Schema(
    {
        inventoryItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Inventory",
            required: true
        },

        itemName: {
            type: String,
            required: true,
            trim: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 1
        },

        returnedQuantity: {
            type: Number,
            default: 0,
            min: 0
        },

        issuedTo: {
            type: String,
            required: true,
            trim: true
        },

        issueDate: {
            type: Date,
            default: Date.now
        },

        remarks: {
            type: String,
            trim: true,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "Issued",
                "Partially Returned",
                "Returned"
            ],
            default: "Issued"
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model(
    "InventoryIssue",
    inventoryIssueSchema
);