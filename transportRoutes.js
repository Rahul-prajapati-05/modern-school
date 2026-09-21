// =====================================================
// TRANSPORT ROUTES
// =====================================================

const express = require("express");
const router = express.Router();

const TransportVehicle =
    require("./transportModel");

// =====================================================
// GET ALL VEHICLES
// =====================================================

router.get("/", async function (req, res) {

    try {

        const vehicles =
            await TransportVehicle
                .find()
                .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: vehicles
        });

    } catch (error) {

        console.error(
            "Get Transport Vehicles Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to fetch transport vehicles."
        });

    }

});

// =====================================================
// ADD VEHICLE
// =====================================================

router.post("/", async function (req, res) {

    try {

        const {
            vehicleNumber,
            vehicleType,
            driverName,
            driverPhone,
            capacity,
            routeName
        } = req.body;


        if (
            !vehicleNumber ||
            !vehicleType ||
            !driverName ||
            !driverPhone ||
            !capacity ||
            !routeName
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Please fill all required fields."
            });

        }


        const existingVehicle =
            await TransportVehicle.findOne({
                vehicleNumber:
                    vehicleNumber.trim()
            });


        if (existingVehicle) {

            return res.status(400).json({
                success: false,
                message:
                    "Vehicle number already exists."
            });

        }


        const vehicle =
            new TransportVehicle({

                vehicleNumber:
                    vehicleNumber.trim(),

                vehicleType:
                    vehicleType.trim(),

                driverName:
                    driverName.trim(),

                driverPhone:
                    driverPhone.trim(),

                capacity:
                    Number(capacity),

                routeName:
                    routeName.trim()

            });


        const savedVehicle =
            await vehicle.save();


        res.status(201).json({
            success: true,
            message:
                "Vehicle added successfully.",
            data: savedVehicle
        });


    } catch (error) {

        console.error(
            "Add Transport Vehicle Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to add vehicle."
        });

    }

});

// =====================================================
// GET SINGLE VEHICLE
// =====================================================

router.get("/:id", async function (req, res) {

    try {

        const vehicle =
            await TransportVehicle.findById(
                req.params.id
            );


        if (!vehicle) {

            return res.status(404).json({
                success: false,
                message:
                    "Vehicle not found."
            });

        }


        res.json({
            success: true,
            data: vehicle
        });


    } catch (error) {

        console.error(
            "Get Single Transport Vehicle Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to fetch vehicle."
        });

    }

});
// =====================================================
// UPDATE VEHICLE
// =====================================================

router.put("/:id", async function (req, res) {

    try {

        const {
            vehicleNumber,
            vehicleType,
            driverName,
            driverPhone,
            capacity,
            routeName,
            status
        } = req.body;


        const vehicle =
            await TransportVehicle.findByIdAndUpdate(
                req.params.id,
                {
                    vehicleNumber:
                        vehicleNumber.trim(),

                    vehicleType:
                        vehicleType.trim(),

                    driverName:
                        driverName.trim(),

                    driverPhone:
                        driverPhone.trim(),

                    capacity:
                        Number(capacity),

                    routeName:
                        routeName.trim(),

                    status:
                        status || "active"
                },
                {
                    new: true,
                    runValidators: true
                }
            );


        if (!vehicle) {

            return res.status(404).json({
                success: false,
                message:
                    "Vehicle not found."
            });

        }


        res.json({
            success: true,
            message:
                "Vehicle updated successfully.",
            data: vehicle
        });


    } catch (error) {

        console.error(
            "Update Transport Vehicle Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to update vehicle."
        });

    }

});


// =====================================================
// DELETE VEHICLE
// =====================================================

router.delete("/:id", async function (req, res) {

    try {

        const vehicle =
            await TransportVehicle.findByIdAndDelete(
                req.params.id
            );


        if (!vehicle) {

            return res.status(404).json({
                success: false,
                message:
                    "Vehicle not found."
            });

        }


        res.json({
            success: true,
            message:
                "Vehicle deleted successfully."
        });


    } catch (error) {

        console.error(
            "Delete Transport Vehicle Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to delete vehicle."
        });

    }

});


module.exports = router;