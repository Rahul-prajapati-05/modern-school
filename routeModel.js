// =====================================================
// ROUTE MODEL
// =====================================================

const mongoose = require("mongoose");


// =====================================================
// ROUTE SCHEMA
// =====================================================

const routeSchema = new mongoose.Schema(

    {

        routeName: {
            type: String,
            required: true,
            trim: true
        },


        startPoint: {
            type: String,
            required: true,
            trim: true
        },


        destination: {
            type: String,
            required: true,
            trim: true
        },


        stops: [
            {
                type: String,
                trim: true
            }
        ],


        distance: {
            type: Number,
            default: 0
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
// MODEL
// =====================================================

const TransportRoute =
    mongoose.model(
        "TransportRoute",
        routeSchema
    );


module.exports =
    TransportRoute;