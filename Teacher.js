const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
    {
        // =================================================
        // USER ACCOUNT
        // =================================================

        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },


        // =================================================
        // BASIC INFORMATION
        // =================================================

        employeeId: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        firstName: {
            type: String,
            required: true,
            trim: true
        },

        lastName: {
            type: String,
            default: "",
            trim: true
        },

        dateOfBirth: {
            type: Date,
            default: null
        },

        gender: {
            type: String,
            default: ""
        },


        // =================================================
        // CONTACT INFORMATION
        // =================================================

        email: {
            type: String,
            required: true,
            lowercase: true,
            trim: true
        },

        phone: {
            type: String,
            default: "",
            trim: true
        },

        address: {
            type: String,
            default: "",
            trim: true
        },

        city: {
            type: String,
            default: "",
            trim: true
        },

        state: {
            type: String,
            default: "",
            trim: true
        },

        pincode: {
            type: String,
            default: "",
            trim: true
        },


        // =================================================
        // PROFESSIONAL INFORMATION
        // =================================================

        qualification: {
            type: String,
            default: "",
            trim: true
        },

        specialization: {
            type: String,
            default: "",
            trim: true
        },

        experience: {
            type: Number,
            default: 0,
            min: 0
        },

        joiningDate: {
            type: Date,
            default: null
        },

        designation: {
            type: String,
            default: "Teacher",
            trim: true
        },

        department: {
            type: String,
            default: "",
            trim: true
        },


        // =================================================
        // SUBJECTS
        // =================================================

        subjects: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Subject"
            }
        ],


        // =================================================
        // CLASSES / SECTIONS
        // =================================================

        classes: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Class"
            }
        ],


        // =================================================
        // PROFILE
        // =================================================

        profileImage: {
            type: String,
            default: ""
        },


        // =================================================
        // STATUS
        // =================================================

        status: {
            type: String,
            enum: [
                "active",
                "inactive",
                "on_leave",
                "resigned"
            ],
            default: "active"
        }
    },
    {
        timestamps: true
    }
);


// =====================================================
// FULL NAME
// =====================================================

teacherSchema.virtual("fullName").get(function () {

    return (
        `${this.firstName || ""} ${this.lastName || ""}`
    ).trim() || "Unknown Teacher";

});


// =====================================================
// JSON VIRTUALS
// =====================================================

teacherSchema.set(
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
        "Teacher",
        teacherSchema
    );