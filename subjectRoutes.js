const express = require("express");
const router = express.Router();

const Subject = require("./Subject");


// =====================================================
// GET ALL SUBJECTS
// =====================================================

router.get("/", async function (req, res) {

    try {

        const subjects =
            await Subject.find()
                .sort({
                    createdAt: -1
                });

        return res.json({
            success: true,
            count: subjects.length,
            data: subjects
        });

    } catch (error) {

        console.error(
            "Get Subjects Error:",
            error
        );

        return res.status(500).json({
            success: false,
            message:
                "Unable to fetch subjects."
        });

    }

});


// =====================================================
// ADD SUBJECT
// =====================================================

router.post("/", async function (req, res) {

    try {

        const {
            subjectName,
            subjectCode,
            description,
            status
        } = req.body;


        if (!subjectName || !subjectCode) {

            return res.status(400).json({
                success: false,
                message:
                    "Subject name and subject code are required."
            });

        }


        const existingSubject =
            await Subject.findOne({
                subjectCode:
                    subjectCode.trim()
            });


        if (existingSubject) {

            return res.status(409).json({
                success: false,
                message:
                    "Subject code already exists."
            });

        }


        const subject =
            await Subject.create({

                subjectName:
                    subjectName.trim(),

                subjectCode:
                    subjectCode.trim(),

                description:
                    description || "",

                status:
                    status || "active"

            });


        return res.status(201).json({
            success: true,
            message:
                "Subject added successfully.",
            data: subject
        });


    } catch (error) {

        console.error(
            "Add Subject Error:",
            error
        );


        return res.status(500).json({
            success: false,
            message:
                "Unable to add subject."
        });

    }

});


// =====================================================
// UPDATE SUBJECT
// =====================================================

router.put("/:id", async function (req, res) {

    try {

        const {
            subjectName,
            subjectCode,
            description,
            status
        } = req.body;


        if (!subjectName || !subjectCode) {

            return res.status(400).json({
                success: false,
                message:
                    "Subject name and subject code are required."
            });

        }


        const subject =
            await Subject.findById(
                req.params.id
            );


        if (!subject) {

            return res.status(404).json({
                success: false,
                message:
                    "Subject not found."
            });

        }


        const duplicate =
            await Subject.findOne({

                subjectCode:
                    subjectCode.trim(),

                _id: {
                    $ne:
                        req.params.id
                }

            });


        if (duplicate) {

            return res.status(409).json({
                success: false,
                message:
                    "Subject code already exists."
            });

        }


        subject.subjectName =
            subjectName.trim();

        subject.subjectCode =
            subjectCode.trim();

        subject.description =
            description || "";

        subject.status =
            status || "active";


        await subject.save();


        return res.json({
            success: true,
            message:
                "Subject updated successfully.",
            data: subject
        });


    } catch (error) {

        console.error(
            "Update Subject Error:",
            error
        );


        return res.status(500).json({
            success: false,
            message:
                "Unable to update subject."
        });

    }

});


// =====================================================
// DELETE SUBJECT
// =====================================================

router.delete("/:id", async function (req, res) {

    try {

        const subject =
            await Subject.findById(
                req.params.id
            );


        if (!subject) {

            return res.status(404).json({
                success: false,
                message:
                    "Subject not found."
            });

        }


        await Subject.findByIdAndDelete(
            req.params.id
        );


        return res.json({
            success: true,
            message:
                "Subject deleted successfully."
        });


    } catch (error) {

        console.error(
            "Delete Subject Error:",
            error
        );


        return res.status(500).json({
            success: false,
            message:
                "Unable to delete subject."
        });

    }

});


module.exports = router;