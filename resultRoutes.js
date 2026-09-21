const express = require("express");

const router = express.Router();

const Result = require("./Result");
const Student = require("./Student");


// =====================================================
// GET ALL RESULTS
// =====================================================

router.get("/", async function (req, res) {

    try {

        const results =
            await Result.find()
                .populate(
                    "exam",
                    "name examDate"
                )
                .populate(
                    "subject",
                    "name"
                )
                .sort({
                    createdAt: -1
                });


        const finalResults =
            await Promise.all(

                results.map(
                    async function (result) {

                        const data =
                            result.toObject();


                        // =================================
                        // STUDENT ID
                        // =================================

                        const studentId =
                            data.student;


                        let student = null;


                        if (studentId) {

                            student =
                                await Student.collection.findOne({
                                    _id: studentId
                                });

                        }


                        // =================================
                        // STUDENT DATA
                        // =================================

                        if (student) {

                            const firstName =
                                student.firstName ||
                                student.name ||
                                "";

                            const lastName =
                                student.lastName ||
                                "";

                            const fullName =
                                `${firstName} ${lastName}`
                                    .trim() ||
                                "Unknown Student";


                            data.student = {

                                ...student,

                                firstName:
                                    firstName,

                                lastName:
                                    lastName,

                                name:
                                    fullName,

                                fullName:
                                    fullName,

                                id:
                                    student._id.toString()

                            };

                        } else {

                            data.student = {

                                firstName:
                                    "",

                                lastName:
                                    "",

                                name:
                                    "Unknown Student",

                                fullName:
                                    "Unknown Student",

                                id:
                                    studentId
                                        ? studentId.toString()
                                        : ""

                            };

                        }


                        return data;

                    }
                )

            );


        return res.json({

            success: true,

            count:
                finalResults.length,

            data:
                finalResults

        });


    } catch (error) {

        console.error(
            "Get Results Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch results."

        });

    }

});


// =====================================================
// ADD RESULT
// =====================================================

router.post("/", async function (req, res) {

    try {

        const {
            exam,
            student,
            subject,
            marksObtained,
            totalMarks,
            grade,
            remarks
        } = req.body;


        if (
            !exam ||
            !student ||
            !subject
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Exam, student and subject are required."

            });

        }


        if (
            marksObtained === undefined ||
            totalMarks === undefined
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Marks obtained and total marks are required."

            });

        }


        const result =
            await Result.create({

                exam:
                    exam,

                student:
                    student,

                subject:
                    subject,

                marksObtained:
                    Number(
                        marksObtained
                    ),

                totalMarks:
                    Number(
                        totalMarks
                    ),

                grade:
                    grade || "",

                remarks:
                    remarks || ""

            });


        const populatedResult =
            await Result.findById(
                result._id
            )
            .populate(
                "exam",
                "name examDate"
            )
            .populate(
                "student"
            )
            .populate(
                "subject",
                "name"
            );


        return res.status(201).json({

            success: true,

            message:
                "Result added successfully.",

            data:
                populatedResult

        });


    } catch (error) {

        console.error(
            "Add Result Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to add result."

        });

    }

});


// =====================================================
// UPDATE RESULT
// =====================================================

router.put("/:id", async function (req, res) {

    try {

        const {
            exam,
            student,
            subject,
            marksObtained,
            totalMarks,
            grade,
            remarks
        } = req.body;


        const result =
            await Result.findById(
                req.params.id
            );


        if (!result) {

            return res.status(404).json({

                success: false,

                message:
                    "Result not found."

            });

        }


        if (
            exam !== undefined
        ) {

            result.exam =
                exam;

        }


        if (
            student !== undefined
        ) {

            result.student =
                student;

        }


        if (
            subject !== undefined
        ) {

            result.subject =
                subject;

        }


        if (
            marksObtained !== undefined
        ) {

            result.marksObtained =
                Number(
                    marksObtained
                );

        }


        if (
            totalMarks !== undefined
        ) {

            result.totalMarks =
                Number(
                    totalMarks
                );

        }


        if (
            grade !== undefined
        ) {

            result.grade =
                grade;

        }


        if (
            remarks !== undefined
        ) {

            result.remarks =
                remarks;

        }


        await result.save();


        const updatedResult =
            await Result.findById(
                result._id
            )
            .populate(
                "exam",
                "name examDate"
            )
            .populate(
                "student"
            )
            .populate(
                "subject",
                "name"
            );


        return res.json({

            success: true,

            message:
                "Result updated successfully.",

            data:
                updatedResult

        });


    } catch (error) {

        console.error(
            "Update Result Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to update result."

        });

    }

});


// =====================================================
// DELETE RESULT
// =====================================================

router.delete("/:id", async function (req, res) {

    try {

        const result =
            await Result.findById(
                req.params.id
            );


        if (!result) {

            return res.status(404).json({

                success: false,

                message:
                    "Result not found."

            });

        }


        await Result.findByIdAndDelete(
            req.params.id
        );


        return res.json({

            success: true,

            message:
                "Result deleted successfully."

        });


    } catch (error) {

        console.error(
            "Delete Result Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to delete result."

        });

    }

});


// =====================================================
// EXPORT
// =====================================================

module.exports = router;