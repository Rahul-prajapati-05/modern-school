const express = require("express");
const router = express.Router();

const Exam = require("./Exam");


// =====================================================
// GET ALL EXAMS
// =====================================================

router.get("/", async function (req, res) {

    try {

        const exams =
            await Exam.find()
                .populate(
                    "class",
                    "name section"
                )
                .sort({
                    examDate: 1
                });


        return res.json({

            success: true,

            count: exams.length,

            data: exams

        });


    } catch (error) {

        console.error(
            "Get Exams Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch exams."

        });

    }

});


// =====================================================
// ADD EXAM
// =====================================================

router.post("/", async function (req, res) {

    try {

        const {
            name,
            description,
            class: classId,
            examDate,
            status
        } = req.body;


        if (!name) {

            return res.status(400).json({

                success: false,

                message:
                    "Exam name is required."

            });

        }


        const exam =
            await Exam.create({

                name: name,

                description:
                    description || "",

                class:
                    classId || null,

                examDate:
                    examDate || null,

                status:
                    status || "upcoming"

            });


        const populatedExam =
            await Exam.findById(
                exam._id
            ).populate(
                "class",
                "name section"
            );


        return res.status(201).json({

            success: true,

            message:
                "Exam created successfully.",

            data:
                populatedExam

        });


    } catch (error) {

        console.error(
            "Create Exam Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to create exam."

        });

    }

});
// =====================================================
// DELETE EXAM
// =====================================================

router.delete("/:id", async function (req, res) {

    try {

        const exam =
            await Exam.findById(
                req.params.id
            );


        if (!exam) {

            return res.status(404).json({

                success: false,

                message:
                    "Exam not found."

            });

        }


        await Exam.findByIdAndDelete(
            req.params.id
        );


        return res.json({

            success: true,

            message:
                "Exam deleted successfully."

        });


    } catch (error) {

        console.error(
            "Delete Exam Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to delete exam."

        });

    }

});
// =====================================================
// UPDATE EXAM
// =====================================================

router.put("/:id", async function (req, res) {

    try {

        const {
            name,
            description,
            class: classId,
            examDate,
            status
        } = req.body;


        const exam =
            await Exam.findById(
                req.params.id
            );


        if (!exam) {

            return res.status(404).json({

                success: false,

                message:
                    "Exam not found."

            });

        }


        exam.name =
            name || exam.name;

        exam.description =
            description || "";

        exam.class =
            classId || null;

        exam.examDate =
            examDate || null;

        exam.status =
            status || exam.status;


        await exam.save();


        const updatedExam =
            await Exam.findById(
                exam._id
            ).populate(
                "class",
                "name section"
            );


        return res.json({

            success: true,

            message:
                "Exam updated successfully.",

            data:
                updatedExam

        });


    } catch (error) {

        console.error(
            "Update Exam Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to update exam."

        });

    }

});


module.exports = router;