// =====================================================
// ROOM ROUTES
// =====================================================

const express = require("express");
const router = express.Router();

const Room = require("./roomModel");
const Hostel = require("./hostelModel");


// =====================================================
// GET ALL ROOMS
// =====================================================

router.get("/", async function (req, res) {

    try {

        const rooms = await Room
            .find()
            .populate(
                "hostelId",
                "hostelName hostelType"
            )
            .sort({
                createdAt: -1
            });

        res.json({
            success: true,
            data: rooms
        });

    } catch (error) {

        console.error(
            "Get rooms error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to fetch rooms."
        });

    }

});


// =====================================================
// GET ROOMS BY HOSTEL
// =====================================================

router.get(
    "/hostel/:hostelId",
    async function (req, res) {

        try {

            const rooms = await Room
                .find({
                    hostelId:
                        req.params.hostelId
                })
                .sort({
                    roomNumber: 1
                });

            res.json({
                success: true,
                data: rooms
            });

        } catch (error) {

            console.error(
                "Get hostel rooms error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Failed to fetch hostel rooms."
            });

        }

    }
);


// =====================================================
// GET SINGLE ROOM
// =====================================================

router.get("/:id", async function (req, res) {

    try {

        const room =
            await Room.findById(
                req.params.id
            ).populate(
                "hostelId",
                "hostelName hostelType"
            );

        if (!room) {

            return res.status(404).json({
                success: false,
                message: "Room not found."
            });

        }

        res.json({
            success: true,
            data: room
        });

    } catch (error) {

        console.error(
            "Get room error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to fetch room."
        });

    }

});


// =====================================================
// ADD ROOM
// =====================================================

router.post("/", async function (req, res) {

    try {

        const {
            hostelId,
            roomNumber,
            floor,
            roomType,
            totalBeds,
            status
        } = req.body;


        // =============================================
        // REQUIRED FIELDS
        // =============================================

        if (
            !hostelId ||
            !roomNumber ||
            !roomType ||
            !totalBeds
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Hostel, room number, room type and total beds are required."
            });

        }


        // =============================================
        // CHECK HOSTEL
        // =============================================

        const hostel =
            await Hostel.findById(
                hostelId
            );


        if (!hostel) {

            return res.status(404).json({
                success: false,
                message:
                    "Selected hostel not found."
            });

        }


        // =============================================
        // DUPLICATE ROOM CHECK
        // =============================================

        const existingRoom =
            await Room.findOne({

                hostelId,

                roomNumber:
                    roomNumber.trim()

            });


        if (existingRoom) {

            return res.status(400).json({
                success: false,
                message:
                    "This room already exists in the selected hostel."
            });

        }


        // =============================================
        // CREATE ROOM
        // =============================================

        const room =
            await Room.create({

                hostelId,

                roomNumber:
                    roomNumber.trim(),

                floor:
                    floor
                        ? floor.trim()
                        : "",

                roomType,

                totalBeds:
                    Number(totalBeds),

                occupiedBeds: 0,

                status:
                    status || "active"

            });


        // =============================================
        // UPDATE HOSTEL TOTAL ROOMS/BEDS
        // =============================================

        await Hostel.findByIdAndUpdate(
            hostelId,
            {
                $inc: {
                    totalRooms: 1,
                    totalBeds:
                        Number(totalBeds)
                }
            }
        );


        res.status(201).json({

            success: true,

            message:
                "Room added successfully.",

            data: room

        });

    } catch (error) {

        console.error(
            "Add room error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to add room."
        });

    }

});


// =====================================================
// UPDATE ROOM
// =====================================================

router.put("/:id", async function (req, res) {

    try {

        const {
            roomNumber,
            floor,
            roomType,
            totalBeds,
            status
        } = req.body;


        if (
            !roomNumber ||
            !roomType ||
            !totalBeds
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Room number, room type and total beds are required."
            });

        }


        const room =
            await Room.findById(
                req.params.id
            );


        if (!room) {

            return res.status(404).json({
                success: false,
                message:
                    "Room not found."
            });

        }


        const newTotalBeds =
            Number(totalBeds);


        // =============================================
        // DON'T REDUCE BELOW OCCUPIED BEDS
        // =============================================

        if (
            newTotalBeds <
            room.occupiedBeds
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Total beds cannot be less than occupied beds."
            });

        }


        // =============================================
        // DUPLICATE ROOM CHECK
        // =============================================

        const duplicate =
            await Room.findOne({

                hostelId:
                    room.hostelId,

                roomNumber:
                    roomNumber.trim(),

                _id: {
                    $ne:
                        req.params.id
                }

            });


        if (duplicate) {

            return res.status(400).json({
                success: false,
                message:
                    "Another room with this number already exists in this hostel."
            });

        }


        const oldTotalBeds =
            Number(
                room.totalBeds || 0
            );


        room.roomNumber =
            roomNumber.trim();

        room.floor =
            floor
                ? floor.trim()
                : "";

        room.roomType =
            roomType;

        room.totalBeds =
            newTotalBeds;

        room.status =
            status || "active";


        await room.save();


        // =============================================
        // UPDATE HOSTEL TOTAL BEDS
        // =============================================

        const bedDifference =
            newTotalBeds -
            oldTotalBeds;


        if (bedDifference !== 0) {

            await Hostel.findByIdAndUpdate(
                room.hostelId,
                {
                    $inc: {
                        totalBeds:
                            bedDifference
                    }
                }
            );

        }


        res.json({

            success: true,

            message:
                "Room updated successfully.",

            data: room

        });

    } catch (error) {

        console.error(
            "Update room error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to update room."
        });

    }

});


// =====================================================
// DELETE ROOM
// =====================================================

router.delete("/:id", async function (req, res) {

    try {

        const room =
            await Room.findById(
                req.params.id
            );


        if (!room) {

            return res.status(404).json({
                success: false,
                message:
                    "Room not found."
            });

        }


        // =============================================
        // DON'T DELETE OCCUPIED ROOM
        // =============================================

        if (
            Number(room.occupiedBeds || 0) > 0
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "This room cannot be deleted because beds are occupied."
            });

        }


        await Room.findByIdAndDelete(
            req.params.id
        );


        // =============================================
        // UPDATE HOSTEL
        // =============================================

        await Hostel.findByIdAndUpdate(
            room.hostelId,
            {
                $inc: {
                    totalRooms: -1,
                    totalBeds:
                        -Number(
                            room.totalBeds || 0
                        )
                }
            }
        );


        res.json({

            success: true,

            message:
                "Room deleted successfully."

        });

    } catch (error) {

        console.error(
            "Delete room error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Failed to delete room."
        });

    }

});


// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;