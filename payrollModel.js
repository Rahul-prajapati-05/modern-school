// =====================================================
// PAYROLL MODEL
// =====================================================

const mongoose = require("mongoose");

const payrollSchema = new mongoose.Schema(
    {

        employeeName: {
            type: String,
            required: true,
            trim: true
        },

        employeeId: {
            type: String,
            required: true,
            trim: true
        },

        designation: {
            type: String,
            trim: true,
            default: ""
        },

        month: {
            type: Number,
            required: true,
            min: 1,
            max: 12
        },

        year: {
            type: Number,
            required: true
        },

        basicSalary: {
            type: Number,
            required: true,
            min: 0
        },

        allowances: {
            type: Number,
            default: 0,
            min: 0
        },

        deductions: {
            type: Number,
            default: 0,
            min: 0
        },

        netSalary: {
            type: Number,
            required: true,
            min: 0
        },

        paymentStatus: {
            type: String,
            enum: [
                "Pending",
                "Paid"
            ],
            default: "Pending"
        },

        paymentDate: {
            type: Date,
            default: null
        },

        paymentMode: {
            type: String,
            enum: [
                "Cash",
                "Bank Transfer",
                "UPI",
                "Cheque",
                ""
            ],
            default: ""
        },

        transactionId: {
            type: String,
            trim: true,
            default: ""
        }

    },
    {
        timestamps: true
    }
);


// =====================================================
// EXPORT MODEL
// =====================================================

module.exports =
    mongoose.model(
        "Payroll",
        payrollSchema
    );