const mongoose = require("mongoose");

const feeSchema = new mongoose.Schema(
    {
        student: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Student",
            required: true
        },

        feeType: {
            type: String,
            required: true,
            trim: true
        },

        totalAmount: {
            type: Number,
            required: true,
            min: 0
        },

        paidAmount: {
            type: Number,
            required: true,
            min: 0,
            default: 0
        },

        paymentDate: {
            type: Date,
            default: null
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


// =====================================================
// VIRTUAL - PENDING AMOUNT
// =====================================================

feeSchema.virtual("pendingAmount").get(function () {

    return Math.max(
        0,
        this.totalAmount - this.paidAmount
    );

});


// =====================================================
// VIRTUAL - PAYMENT STATUS
// =====================================================

feeSchema.virtual("paymentStatus").get(function () {

    if (this.paidAmount <= 0) {

        return "pending";

    }

    if (this.paidAmount >= this.totalAmount) {

        return "paid";

    }

    return "partial";

});


// =====================================================
// JSON SETTINGS
// =====================================================

feeSchema.set(
    "toJSON",
    {
        virtuals: true
    }
);


// =====================================================
// EXPORT
// =====================================================

module.exports =
    mongoose.model(
        "Fee",
        feeSchema
    );