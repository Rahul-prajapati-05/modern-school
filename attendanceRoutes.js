const express = require("express");
const router = express.Router();

const Attendance = require("./Attendance");


// =====================================================
// GET ATTENDANCE
// =====================================================

router.get("/", async function (req, res) {

    try {

        const attendance =
            await Attendance.find()
                .populate(
                    "student"
                )
                .sort({
                    date: -1
                });

        return res.json({

            success: true,

            count:
                attendance.length,

            data:
                attendance

        });

    } catch (error) {

        console.error(
            "Get Attendance Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch attendance."

        });

    }

});


// =====================================================
// ADD ATTENDANCE
// =====================================================

router.post("/", async function (req, res) {

    try {

        const {
            student,
            date,
            status,
            remarks
        } = req.body;


        if (
            !student ||
            !date ||
            !status
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Student, date and status are required."

            });

        }


        const attendance =
            await Attendance.create({

                student:
                    student,

                date:
                    date,

                status:
                    status,

                remarks:
                    remarks || ""

            });


        const populatedAttendance =
            await Attendance.findById(
                attendance._id
            )
            .populate(
                "student"
            );


        return res.status(201).json({

            success: true,

            message:
                "Attendance saved successfully.",

            data:
                populatedAttendance

        });


    } catch (error) {

        console.error(
            "Add Attendance Error:",
            error
        );


        if (
            error.code === 11000
        ) {

            return res.status(409).json({

                success: false,

                message:
                    "Attendance for this student on this date already exists."

            });

        }


        return res.status(500).json({

            success: false,

            message:
                "Unable to save attendance."

        });

    }

});


// =====================================================
// UPDATE ATTENDANCE
// =====================================================

router.put("/:id", async function (req, res) {

    try {

        const {
            student,
            date,
            status,
            remarks
        } = req.body;


        const attendance =
            await Attendance.findById(
                req.params.id
            );


        if (!attendance) {

            return res.status(404).json({

                success: false,

                message:
                    "Attendance record not found."

            });

        }


        attendance.student =
            student ||
            attendance.student;


        attendance.date =
            date ||
            attendance.date;


        attendance.status =
            status ||
            attendance.status;


        attendance.remarks =
            remarks || "";


        await attendance.save();


        const updatedAttendance =
            await Attendance.findById(
                attendance._id
            )
            .populate(
                "student"
            );


        return res.json({

            success: true,

            message:
                "Attendance updated successfully.",

            data:
                updatedAttendance

        });


    } catch (error) {

        console.error(
            "Update Attendance Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to update attendance."

        });

    }

});


// =====================================================
// DELETE ATTENDANCE
// =====================================================

router.delete("/:id", async function (req, res) {

    try {

        const attendance =
            await Attendance.findById(
                req.params.id
            );


        if (!attendance) {

            return res.status(404).json({

                success: false,

                message:
                    "Attendance record not found."

            });

        }


        await Attendance.findByIdAndDelete(
            req.params.id
        );


        return res.json({

            success: true,

            message:
                "Attendance deleted successfully."

        });


    } catch (error) {

        console.error(
            "Delete Attendance Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to delete attendance."

        });

    }

});


module.exports = router;