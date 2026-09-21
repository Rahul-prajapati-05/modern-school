const express = require("express");

const router = express.Router();

const Notice = require("./Notice");


// =====================================================
// GET ALL NOTICES
// =====================================================

router.get("/", async function (req, res) {

    try {

        const notices =
            await Notice.find()
                .sort({
                    noticeDate: -1,
                    createdAt: -1
                });

        return res.json({

            success: true,

            count:
                notices.length,

            data:
                notices

        });

    } catch (error) {

        console.error(
            "Get Notices Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch notices."

        });

    }

});


// =====================================================
// GET SINGLE NOTICE
// =====================================================

router.get("/:id", async function (req, res) {

    try {

        const notice =
            await Notice.findById(
                req.params.id
            );

        if (!notice) {

            return res.status(404).json({

                success: false,

                message:
                    "Notice not found."

            });

        }

        return res.json({

            success: true,

            data:
                notice

        });

    } catch (error) {

        console.error(
            "Get Single Notice Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch notice."

        });

    }

});


// =====================================================
// ADD NOTICE
// =====================================================

router.post("/", async function (req, res) {

    try {

        const {
            title,
            description,
            noticeDate,
            expiryDate,
            audience,
            status
        } = req.body;


        if (
            !title ||
            !description ||
            !noticeDate
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Title, description and notice date are required."

            });

        }


        const notice =
            await Notice.create({

                title:
                    title.trim(),

                description:
                    description.trim(),

                noticeDate:
                    noticeDate,

                expiryDate:
                    expiryDate || null,

                audience:
                    audience || "All",

                status:
                    status || "active"

            });


        return res.status(201).json({

            success: true,

            message:
                "Notice added successfully.",

            data:
                notice

        });

    } catch (error) {

        console.error(
            "Add Notice Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to add notice."

        });

    }

});


// =====================================================
// UPDATE NOTICE
// =====================================================

router.put("/:id", async function (req, res) {

    try {

        const notice =
            await Notice.findById(
                req.params.id
            );


        if (!notice) {

            return res.status(404).json({

                success: false,

                message:
                    "Notice not found."

            });

        }


        const {
            title,
            description,
            noticeDate,
            expiryDate,
            audience,
            status
        } = req.body;


        if (title !== undefined)
            notice.title =
                title.trim();


        if (description !== undefined)
            notice.description =
                description.trim();


        if (noticeDate !== undefined)
            notice.noticeDate =
                noticeDate;


        if (expiryDate !== undefined)
            notice.expiryDate =
                expiryDate || null;


        if (audience !== undefined)
            notice.audience =
                audience;


        if (status !== undefined)
            notice.status =
                status;


        await notice.save();


        return res.json({

            success: true,

            message:
                "Notice updated successfully.",

            data:
                notice

        });

    } catch (error) {

        console.error(
            "Update Notice Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to update notice."

        });

    }

});


// =====================================================
// DELETE NOTICE
// =====================================================

router.delete("/:id", async function (req, res) {

    try {

        const notice =
            await Notice.findById(
                req.params.id
            );


        if (!notice) {

            return res.status(404).json({

                success: false,

                message:
                    "Notice not found."

            });

        }


        await Notice.findByIdAndDelete(
            req.params.id
        );


        return res.json({

            success: true,

            message:
                "Notice deleted successfully."

        });

    } catch (error) {

        console.error(
            "Delete Notice Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to delete notice."

        });

    }

});


module.exports = router;