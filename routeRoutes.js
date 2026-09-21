// =====================================================
// ROUTE ROUTES
// =====================================================

const express = require("express");
const router = express.Router();

const TransportRoute =
    require("./routeModel");


// =====================================================
// GET ALL ROUTES
// =====================================================

router.get("/", async function (req, res) {

    try {

        const routes =
            await TransportRoute
                .find()
                .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: routes
        });

    } catch (error) {

        console.error(
            "Get Transport Routes Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to fetch routes."
        });

    }

});


// =====================================================
// ADD ROUTE
// =====================================================

router.post("/", async function (req, res) {

    try {

        const {
            routeName,
            startPoint,
            destination,
            stops,
            distance
        } = req.body;


        if (
            !routeName ||
            !startPoint ||
            !destination
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Please fill all required fields."
            });

        }


        const existingRoute =
            await TransportRoute.findOne({
                routeName:
                    routeName.trim()
            });


        if (existingRoute) {

            return res.status(400).json({
                success: false,
                message:
                    "Route name already exists."
            });

        }


        const route =
            new TransportRoute({

                routeName:
                    routeName.trim(),

                startPoint:
                    startPoint.trim(),

                destination:
                    destination.trim(),

                stops:
                    Array.isArray(stops)
                        ? stops
                        : [],

                distance:
                    Number(distance) || 0

            });


        const savedRoute =
            await route.save();


        res.status(201).json({

            success: true,

            message:
                "Route added successfully.",

            data:
                savedRoute

        });


    } catch (error) {

        console.error(
            "Add Transport Route Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to add route."

        });

    }

});
// =====================================================
// GET SINGLE ROUTE
// =====================================================

router.get("/:id", async function (req, res) {

    try {

        const route =
            await TransportRoute.findById(
                req.params.id
            );


        if (!route) {

            return res.status(404).json({
                success: false,
                message:
                    "Route not found."
            });

        }


        res.json({
            success: true,
            data: route
        });


    } catch (error) {

        console.error(
            "Get Single Transport Route Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to fetch route."
        });

    }

});
// =====================================================
// UPDATE TRANSPORT ROUTE
// =====================================================

router.put("/:id", async function (req, res) {

    try {

        const {
            routeName,
            startPoint,
            destination,
            stops,
            distance,
            status
        } = req.body;


        if (
            !routeName ||
            !startPoint ||
            !destination
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Please fill all required fields."
            });

        }


        const route =
            await TransportRoute.findByIdAndUpdate(

                req.params.id,

                {
                    routeName:
                        routeName.trim(),

                    startPoint:
                        startPoint.trim(),

                    destination:
                        destination.trim(),

                    stops:
                        Array.isArray(stops)
                            ? stops
                            : [],

                    distance:
                        Number(distance) || 0,

                    status:
                        status || "active"
                },

                {
                    new: true,
                    runValidators: true
                }

            );


        if (!route) {

            return res.status(404).json({
                success: false,
                message:
                    "Route not found."
            });

        }


        res.json({

            success: true,

            message:
                "Route updated successfully.",

            data:
                route

        });


    } catch (error) {

        console.error(
            "Update Transport Route Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to update route."

        });

    }

});
// =====================================================
// DELETE TRANSPORT ROUTE
// =====================================================

router.delete("/:id", async function (req, res) {

    try {

        const route =
            await TransportRoute.findByIdAndDelete(
                req.params.id
            );


        if (!route) {

            return res.status(404).json({

                success: false,

                message:
                    "Route not found."

            });

        }


        res.json({

            success: true,

            message:
                "Route deleted successfully."

        });


    } catch (error) {

        console.error(
            "Delete Transport Route Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to delete route."

        });

    }

});

module.exports = router;