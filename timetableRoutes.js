const express = require("express");

const router = express.Router();

const Timetable = require("./Timetable");


// =====================================================
// GET ALL TIMETABLE
// =====================================================

router.get("/", async function (req, res) {

    try {

        const timetable =
            await Timetable.find()
                .populate("class")
                .populate("subject")
                .populate("teacher")
                .sort({
                    day: 1,
                    period: 1
                });

        return res.json({

            success: true,

            count:
                timetable.length,

            data:
                timetable

        });

    } catch (error) {

        console.error(
            "Get Timetable Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch timetable."

        });

    }

});
// =====================================================
// GET SINGLE TIMETABLE
// =====================================================

router.get("/:id", async function (req, res) {

    try {

        const timetable =
            await Timetable.findById(
                req.params.id
            )
            .populate("class")
            .populate("subject")
            .populate("teacher");

        if (!timetable) {

            return res.status(404).json({

                success: false,

                message:
                    "Timetable record not found."

            });

        }

        return res.json({

            success: true,

            data:
                timetable

        });

    } catch (error) {

        console.error(
            "Get Single Timetable Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch timetable."

        });

    }

});


// =====================================================
// ADD TIMETABLE
// =====================================================

router.post("/", async function (req, res) {

    try {

        const {
            classId,
            section,
            subject,
            teacher,
            day,
            period,
            startTime,
            endTime,
            room
        } = req.body;


        if (
            !classId ||
            !subject ||
            !teacher ||
            !day ||
            !period
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Class, subject, teacher, day and period are required."

            });

        }


        const timetable =
            await Timetable.create({

                class:
                    classId,

                section:
                    section || "",

                subject:
                    subject,

                teacher:
                    teacher,

                day:
                    day,

                period:
                    period,

                startTime:
                    startTime || "",

                endTime:
                    endTime || "",

                room:
                    room || ""

            });


        const populatedTimetable =
            await Timetable.findById(
                timetable._id
            )
            .populate("class")
            .populate("subject")
            .populate("teacher");


        return res.status(201).json({

            success: true,

            message:
                "Timetable added successfully.",

            data:
                populatedTimetable

        });

    } catch (error) {

        console.error(
            "Add Timetable Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to add timetable."

        });

    }

});


// =====================================================
// UPDATE TIMETABLE
// =====================================================

router.put("/:id", async function (req, res) {

    try {

        const timetable =
            await Timetable.findById(
                req.params.id
            );


        if (!timetable) {

            return res.status(404).json({

                success: false,

                message:
                    "Timetable record not found."

            });

        }


        const {
            classId,
            section,
            subject,
            teacher,
            day,
            period,
            startTime,
            endTime,
            room
        } = req.body;


        if (classId !== undefined)
            timetable.class =
                classId;


        if (section !== undefined)
            timetable.section =
                section;


        if (subject !== undefined)
            timetable.subject =
                subject;


        if (teacher !== undefined)
            timetable.teacher =
                teacher;


        if (day !== undefined)
            timetable.day =
                day;


        if (period !== undefined)
            timetable.period =
                period;


        if (startTime !== undefined)
            timetable.startTime =
                startTime;


        if (endTime !== undefined)
            timetable.endTime =
                endTime;


        if (room !== undefined)
            timetable.room =
                room;


        await timetable.save();


        const updatedTimetable =
            await Timetable.findById(
                timetable._id
            )
            .populate("class")
            .populate("subject")
            .populate("teacher");


        return res.json({

            success: true,

            message:
                "Timetable updated successfully.",

            data:
                updatedTimetable

        });

    } catch (error) {

        console.error(
            "Update Timetable Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to update timetable."

        });

    }

});


// =====================================================
// DELETE TIMETABLE
// =====================================================

router.delete("/:id", async function (req, res) {

    try {

        const timetable =
            await Timetable.findById(
                req.params.id
            );


        if (!timetable) {

            return res.status(404).json({

                success: false,

                message:
                    "Timetable record not found."

            });

        }


        await Timetable.findByIdAndDelete(
            req.params.id
        );


        return res.json({

            success: true,

            message:
                "Timetable deleted successfully."

        });

    } catch (error) {

        console.error(
            "Delete Timetable Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to delete timetable."

        });

    }

});


module.exports = router;