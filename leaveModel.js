const mongoose = require("mongoose");

const leaveSchema = new mongoose.Schema(
    {
        // =========================
        // APPLICANT TYPE
        // =========================
        applicantType: {
            type: String,
            enum: ["Student", "Teacher"],
            required: true
        },

        // =========================
        // APPLICANT ID
        // =========================
      applicantId: {
    type: String,
    required: true,
    trim: true
},

        // =========================
        // APPLICANT NAME
        // =========================
        applicantName: {
            type: String,
            required: true,
            trim: true
        },

        // =========================
        // STUDENT DETAILS
        // =========================
        className: {
            type: String,
            default: ""
        },

        rollNumber: {
            type: String,
            default: ""
        },

        // =========================
        // TEACHER DETAILS
        // =========================
        department: {
            type: String,
            default: ""
        },

        // =========================
        // LEAVE TYPE
        // =========================
        leaveType: {
            type: String,
            enum: [
                "Sick Leave",
                "Medical Leave",
                "Casual Leave",
                "Emergency Leave",
                "Other"
            ],
            required: true
        },

        // =========================
        // DATE
        // =========================
        fromDate: {
            type: Date,
            required: true
        },

        toDate: {
            type: Date,
            required: true
        },

        // =========================
        // TOTAL DAYS
        // =========================
        totalDays: {
            type: Number,
            required: true,
            min: 1
        },

        // =========================
        // REASON
        // =========================
        reason: {
            type: String,
            required: true,
            trim: true
        },

        // =========================
        // PDF APPLICATION
        // =========================
        applicationPdf: {
            fileName: {
                type: String,
                default: ""
            },

            filePath: {
                type: String,
                default: ""
            }
        },

        // =========================
        // STATUS
        // =========================
        status: {
            type: String,
            enum: [
                "Pending",
                "Approved",
                "Rejected"
            ],
            default: "Pending"
        },

        // =========================
        // ADMIN REMARKS
        // =========================
        adminRemarks: {
            type: String,
            default: "",
            trim: true
        },

        // =========================
        // ACTION DATE
        // =========================
        actionDate: {
            type: Date,
            default: null
        }
    },
    {
        timestamps: true
    }
);

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;