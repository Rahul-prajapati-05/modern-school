const express = require("express");

const Homework = require("./Homework");

module.exports = function (homeworkUpload) {

    const router = express.Router();



// =====================================================
// GET ALL HOMEWORK
// =====================================================

router.get("/", async function (req, res) {

    try {

        const homework =
            await Homework.find()
                .populate("class")
                .populate("subject")
                .populate("teacher")
                .sort({
                    dueDate: 1,
                    createdAt: -1
                });

        return res.json({

            success: true,

            count:
                homework.length,

            data:
                homework

        });

    } catch (error) {

        console.error(
            "Get Homework Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch homework."

        });

    }

});


// =====================================================
// GET SINGLE HOMEWORK
// =====================================================

router.get("/:id", async function (req, res) {

    try {

        const homework =
            await Homework.findById(
                req.params.id
            )
            .populate("class")
            .populate("subject")
            .populate("teacher");

        if (!homework) {

            return res.status(404).json({

                success: false,

                message:
                    "Homework record not found."

            });

        }

        return res.json({

            success: true,

            data:
                homework

        });

    } catch (error) {

        console.error(
            "Get Single Homework Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch homework."

        });

    }

});


// =====================================================
// ADD HOMEWORK
// =====================================================

router.post(
    "/",
    homeworkUpload.single("homeworkPdf"),
    async function (req, res) {

    try {

        const {
    classId,
    section,
    subject,
    teacher,
    title,
    description,
    homeworkDate,
    dueDate
} = req.body;

const pdfFile =
    req.file
        ? `/uploads/homework/${req.file.filename}`
        : "";


        if (
            !classId ||
            !section ||
            !subject ||
            !teacher ||
            !title ||
            !homeworkDate ||
            !dueDate
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Class, section, subject, teacher, title, homework date and due date are required."

            });

        }


        const homework =
            await Homework.create({

                class:
                    classId,

                section:
                    section.trim(),

                subject:
                    subject,

                teacher:
                    teacher,

                title:
                    title.trim(),

                description:
                    description || "",

                homeworkDate:
                    homeworkDate,

                dueDate:
                    dueDate,

                pdfFile:
                    pdfFile || ""

            });


        const populatedHomework =
            await Homework.findById(
                homework._id
            )
            .populate("class")
            .populate("subject")
            .populate("teacher");


        return res.status(201).json({

            success: true,

            message:
                "Homework added successfully.",

            data:
                populatedHomework

        });

    } catch (error) {

        console.error(
            "Add Homework Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to add homework."

        });

    }

});


// =====================================================
// UPDATE HOMEWORK
// =====================================================

router.put(
    "/:id",
    homeworkUpload.single("homeworkPdf"),
    async function (req, res) {

    try {

        const homework =
            await Homework.findById(
                req.params.id
            );


        if (!homework) {

            return res.status(404).json({

                success: false,

                message:
                    "Homework record not found."

            });

        }


        const {
            classId,
            section,
            subject,
            teacher,
            title,
            description,
            homeworkDate,
            dueDate,
            
            status
        } = req.body;


        if (classId !== undefined)
            homework.class =
                classId;


        if (section !== undefined)
            homework.section =
                section;


        if (subject !== undefined)
            homework.subject =
                subject;


        if (teacher !== undefined)
            homework.teacher =
                teacher;


        if (title !== undefined)
            homework.title =
                title;


        if (description !== undefined)
            homework.description =
                description;


        if (homeworkDate !== undefined)
            homework.homeworkDate =
                homeworkDate;


        if (dueDate !== undefined)
            homework.dueDate =
                dueDate;


        if (req.file) {

    homework.pdfFile =
        `/uploads/homework/${req.file.filename}`;

}


        if (status !== undefined)
            homework.status =
                status;


        await homework.save();


        const updatedHomework =
            await Homework.findById(
                homework._id
            )
            .populate("class")
            .populate("subject")
            .populate("teacher");


        return res.json({

            success: true,

            message:
                "Homework updated successfully.",

            data:
                updatedHomework

        });

    } catch (error) {

        console.error(
            "Update Homework Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to update homework."

        });

    }

});


// =====================================================
// DELETE HOMEWORK
// =====================================================

router.delete("/:id", async function (req, res) {

    try {

        const homework =
            await Homework.findById(
                req.params.id
            );


        if (!homework) {

            return res.status(404).json({

                success: false,

                message:
                    "Homework record not found."

            });

        }


        await Homework.findByIdAndDelete(
            req.params.id
        );


        return res.json({

            success: true,

            message:
                "Homework deleted successfully."

        });

    } catch (error) {

        console.error(
            "Delete Homework Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to delete homework."

        });

    }

});

    return router;

};