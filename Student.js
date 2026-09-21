const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            default: null
        },

        admissionNumber: {
            type: String,
            trim: true,
            default: ""
        },

        firstName: {
            type: String,
            trim: true,
            default: ""
        },

        lastName: {
            type: String,
            trim: true,
            default: ""
        },

        dateOfBirth: {
            type: Date,
            default: null
        },

        gender: {
            type: String,
            default: ""
        },

        phone: {
            type: String,
            default: ""
        },

        email: {
            type: String,
            lowercase: true,
            trim: true,
            default: ""
        },

        address: {
            type: String,
            default: ""
        },

        city: {
            type: String,
            default: ""
        },

        state: {
            type: String,
            default: ""
        },

        pincode: {
            type: String,
            default: ""
        },

        class: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Class",
            default: null
        },

        section: {
            type: String,
            default: ""
        },

        rollNumber: {
            type: String,
            default: ""
        },

        admissionDate: {
            type: Date,
            default: null
        },

        parents: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User"
            }
        ],

        guardianName: {
            type: String,
            default: ""
        },

        guardianPhone: {
            type: String,
            default: ""
        },

        guardianRelation: {
            type: String,
            default: ""
        },

        bloodGroup: {
            type: String,
            default: ""
        },

        profileImage: {
            type: String,
            default: ""
        },

        status: {
            type: String,
            enum: [
                "active",
                "inactive",
                "graduated",
                "transferred"
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

studentSchema.virtual("fullName").get(function () {

    const first =
        this.firstName || "";

    const last =
        this.lastName || "";

    const name =
        `${first} ${last}`.trim();

    return name || "Unknown Student";

});


// =====================================================
// JSON SETTINGS
// =====================================================

studentSchema.set(
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
        "Student",
        studentSchema
    );