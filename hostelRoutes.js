// =====================================================
// HOSTEL ROUTES
// =====================================================

const express = require("express");

const router = express.Router();

const Hostel = require("./hostelModel");


// =====================================================
// GET ALL HOSTELS
// =====================================================

router.get("/", async function (req, res) {

    try {

        const hostels = await Hostel
            .find()
            .sort({
                createdAt: -1
            });

        res.json({
            success: true,
            data: hostels
        });

    } catch (error) {

        console.error(
            "Get hostels error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch hostels."
        });

    }

});


// =====================================================
// GET SINGLE HOSTEL
// =====================================================

router.get("/:id", async function (req, res) {

    try {

        const hostel =
            await Hostel.findById(
                req.params.id
            );

        if (!hostel) {

            return res.status(404).json({
                success: false,
                message: "Hostel not found."
            });

        }

        res.json({
            success: true,
            data: hostel
        });

    } catch (error) {

        console.error(
            "Get hostel error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch hostel."
        });

    }

});


// =====================================================
// ADD HOSTEL
// =====================================================

router.post("/", async function (req, res) {

    try {

        const {
            hostelName,
            hostelType,
            wardenName,
            wardenPhone,
            address,
            totalRooms,
            totalBeds,
            monthlyFee,
            status
        } = req.body;


        // Required fields

        if (
            !hostelName ||
            !hostelType ||
            !wardenName ||
            !wardenPhone
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Hostel name, hostel type, warden name and warden phone are required."
            });

        }


        // Check duplicate hostel

        const existingHostel =
            await Hostel.findOne({
                hostelName:
                    hostelName.trim()
            });


        if (existingHostel) {

            return res.status(400).json({
                success: false,
                message:
                    "A hostel with this name already exists."
            });

        }


        // Create hostel

        const hostel =
            await Hostel.create({

                hostelName:
                    hostelName.trim(),

                hostelType:

                    hostelType,

                wardenName:
                    wardenName.trim(),

                wardenPhone:
                    wardenPhone.trim(),

                address:
                    address
                        ? address.trim()
                        : "",

                totalRooms:
                    Number(totalRooms) || 0,

                totalBeds:
                    Number(totalBeds) || 0,

                occupiedBeds: 0,

                monthlyFee:
                    Number(monthlyFee) || 0,

                status:
                    status || "active"

            });


        res.status(201).json({

            success: true,

            message:
                "Hostel added successfully.",

            data: hostel

        });

    } catch (error) {

        console.error(
            "Add hostel error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to add hostel."
        });

    }

});


// =====================================================
// UPDATE HOSTEL
// =====================================================

router.put("/:id", async function (req, res) {

    try {

        const hostel =
            await Hostel.findById(
                req.params.id
            );

        if (!hostel) {

            return res.status(404).json({
                success: false,
                message:
                    "Hostel not found."
            });

        }


        const {
            hostelName,
            hostelType,
            wardenName,
            wardenPhone,
            address,
            totalRooms,
            totalBeds,
            monthlyFee,
            status
        } = req.body;


        if (
            !hostelName ||
            !hostelType ||
            !wardenName ||
            !wardenPhone
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Hostel name, hostel type, warden name and warden phone are required."
            });

        }


        const duplicate =
            await Hostel.findOne({

                hostelName:
                    hostelName.trim(),

                _id: {
                    $ne:
                        req.params.id
                }

            });


        if (duplicate) {

            return res.status(400).json({
                success: false,
                message:
                    "Another hostel with this name already exists."
            });

        }


        hostel.hostelName =
            hostelName.trim();

        hostel.hostelType =
            hostelType;

        hostel.wardenName =
            wardenName.trim();

        hostel.wardenPhone =
            wardenPhone.trim();

        hostel.address =
            address
                ? address.trim()
                : "";

        hostel.totalRooms =
            Number(totalRooms) || 0;

        hostel.totalBeds =
            Number(totalBeds) || 0;

        hostel.monthlyFee =
            Number(monthlyFee) || 0;

        hostel.status =
            status || "active";


        if (
            hostel.occupiedBeds >
            hostel.totalBeds
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Total beds cannot be less than occupied beds."
            });

        }


        await hostel.save();


        res.json({

            success: true,

            message:
                "Hostel updated successfully.",

            data: hostel

        });

    } catch (error) {

        console.error(
            "Update hostel error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to update hostel."
        });

    }

});


// =====================================================
// DELETE HOSTEL
// =====================================================

router.delete("/:id", async function (req, res) {

    try {

        const hostel =
            await Hostel.findById(
                req.params.id
            );

        if (!hostel) {

            return res.status(404).json({
                success: false,
                message:
                    "Hostel not found."
            });

        }


        if (hostel.occupiedBeds > 0) {

            return res.status(400).json({
                success: false,
                message:
                    "This hostel cannot be deleted because students are currently allocated."
            });

        }


        await Hostel.findByIdAndDelete(
            req.params.id
        );


        res.json({

            success: true,

            message:
                "Hostel deleted successfully."

        });

    } catch (error) {

        console.error(
            "Delete hostel error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to delete hostel."
        });

    }

});


// =====================================================
// EXPORT
// =====================================================

module.exports = router;