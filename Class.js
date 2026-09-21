const mongoose = require("mongoose");


// =====================================================
// SECTION SCHEMA
// =====================================================

const sectionSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        classTeacher: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Teacher",
            default: null
        },

        capacity: {
            type: Number,
            default: 40,
            min: 1
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
        _id: true
    }
);


// =====================================================
// CLASS SCHEMA
// =====================================================

const classSchema = new mongoose.Schema(
    {
        className: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        classCode: {
            type: String,
            unique: true,
            sparse: true,
            trim: true,
            uppercase: true
        },

        sections: {
            type: [sectionSchema],
            default: []
        },

        description: {
            type: String,
            default: "",
            trim: true
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
// NORMALIZE OUTPUT
// =====================================================

classSchema.virtual(
    "sectionCount"
).get(function () {

    return this.sections
        ? this.sections.length
        : 0;

});


classSchema.set(
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
        "Class",
        classSchema
    );