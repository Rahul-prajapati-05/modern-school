const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");

const Leave = require("./leaveModel");
const LeaveType = require("./leaveTypeModel");


// =====================================================
// LEAVE PDF UPLOAD SETUP
// =====================================================

const uploadDir = path.join(
    __dirname,
    "uploads",
    "leave"
);

// Create uploads/leave folder automatically
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {
        recursive: true
    });
}


// =====================================================
// MULTER STORAGE
// =====================================================

const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            Math.round(Math.random() * 1E9) +
            path.extname(file.originalname);

        cb(null, uniqueName);
    }
});


// =====================================================
// MULTER UPLOAD
// =====================================================

const upload = multer({

    storage: storage,

    fileFilter: function (req, file, cb) {

        const extension =
            path.extname(file.originalname)
                .toLowerCase();

        if (extension !== ".pdf") {

            return cb(
                new Error(
                    "Only PDF files are allowed."
                )
            );
        }

        cb(null, true);
    },

    limits: {
        fileSize: 5 * 1024 * 1024
    }
});


// =====================================================
// GET ALL LEAVES
// =====================================================

router.get("/", async (req, res) => {

    try {

        const leaves =
            await Leave.find()
                .sort({
                    createdAt: -1
                });

        res.json({
            success: true,
            data: leaves
        });

    } catch (error) {

        console.error(
            "Get Leaves Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to load leave applications.",
            error: error.message
        });
    }
});

// =====================================================
// LEAVE TYPE ROUTES
// =====================================================


// GET ALL LEAVE TYPES
router.get("/types/all", async (req, res) => {

    try {

        const leaveTypes = await LeaveType.find()
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            data: leaveTypes
        });

    } catch (error) {

        console.error(
            "Get Leave Types Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to load leave types.",
            error: error.message
        });
    }
});


// ADD LEAVE TYPE
router.post("/types", async (req, res) => {

    try {

        const {
            leaveType,
            description,
            maximumDays,
            status
        } = req.body;


        // Required validation
        if (
            !leaveType ||
            !maximumDays
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Leave type and maximum days are required."
            });
        }


        // Check duplicate leave type
        const existingLeaveType =
            await LeaveType.findOne({
                leaveType: leaveType.trim()
            });


        if (existingLeaveType) {

            return res.status(400).json({
                success: false,
                message:
                    "This leave type already exists."
            });
        }


        // Create leave type
        const newLeaveType =
            new LeaveType({

                leaveType:
                    leaveType.trim(),

                description:
                    description
                        ? description.trim()
                        : "",

                maximumDays:
                    Number(maximumDays),

                status:
                    status || "Active"
            });


        await newLeaveType.save();


        res.status(201).json({

            success: true,

            message:
                "Leave type added successfully.",

            data: newLeaveType
        });


    } catch (error) {

        console.error(
            "Add Leave Type Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                error.message ||
                "Unable to add leave type.",

            error:
                error.toString()
        });
    }
});


// =====================================================
// UPDATE LEAVE TYPE
// =====================================================

router.put("/types/:id", async (req, res) => {

    console.log("🔥 PUT LEAVE TYPE HIT");
    console.log("ID:", req.params.id);

    try {

        const {
            leaveType,
            description,
            maximumDays,
            status
        } = req.body;

        console.log("BODY:", req.body);

        const updatedLeaveType =
            await LeaveType.findByIdAndUpdate(
                req.params.id,
                {
                    leaveType: leaveType.trim(),
                    description: description || "",
                    maximumDays: Number(maximumDays),
                    status: status || "Active"
                },
                {
                    new: true,
                    runValidators: true
                }
            );

        if (!updatedLeaveType) {

            return res.status(404).json({
                success: false,
                message: "Leave type not found."
            });

        }

        return res.json({
            success: true,
            message: "Leave type updated successfully.",
            data: updatedLeaveType
        });

    } catch (error) {

        console.error("🔥 UPDATE ERROR:", error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

});


// =====================================================
// DELETE LEAVE TYPE
// =====================================================

router.delete("/types/:id", async (req, res) => {

    try {

        const deletedLeaveType =
            await LeaveType.findByIdAndDelete(
                req.params.id
            );


        if (!deletedLeaveType) {

            return res.status(404).json({
                success: false,
                message: "Leave type not found."
            });

        }


        res.json({
            success: true,
            message: "Leave type deleted successfully."
        });


    } catch (error) {

        console.error(
            "Delete Leave Type Error:",
            error
        );


        res.status(500).json({
            success: false,
            message: "Unable to delete leave type.",
            error: error.message
        });

    }

});


// =====================================================
// GET SINGLE LEAVE
// =====================================================

router.get("/:id", async (req, res) => {

    try {

        const leave =
            await Leave.findById(
                req.params.id
            );

        if (!leave) {

            return res.status(404).json({
                success: false,
                message:
                    "Leave application not found."
            });
        }

        res.json({
            success: true,
            data: leave
        });

    } catch (error) {

        console.error(
            "Get Leave Error:",
            error
        );

        res.status(500).json({
            success: false,
            message:
                "Unable to load leave application.",
            error: error.message
        });
    }
});
router.use((error, req, res, next) => {
    console.error("Leave Upload Error:", error);

    return res.status(400).json({
        success: false,
        message: error.message || "Leave PDF upload failed.",
        error: error.toString()
    });
});

// =====================================================
// CREATE LEAVE APPLICATION + PDF
// =====================================================

router.post(
    "/",
    upload.single("applicationPdf"),
    async (req, res) => {

        try {

            const {
                applicantType,
                applicantId,
                applicantName,
                className,
                rollNumber,
                department,
                leaveType,
                fromDate,
                toDate,
                totalDays,
                reason
            } = req.body;


            // =============================================
            // REQUIRED FIELDS
            // =============================================

            if (
                !applicantType ||
                !applicantId ||
                !applicantName ||
                !leaveType ||
                !fromDate ||
                !toDate ||
                !totalDays ||
                !reason
            ) {

                // If PDF was uploaded but required
                // fields are missing, remove the file
                if (req.file) {

                    fs.unlink(
                        req.file.path,
                        () => {}
                    );
                }

                return res.status(400).json({
                    success: false,
                    message:
                        "Please fill all required fields."
                });
            }


            // =============================================
            // VALIDATE APPLICANT TYPE
            // =============================================

            if (
                applicantType !== "Student" &&
                applicantType !== "Teacher"
            ) {

                if (req.file) {

                    fs.unlink(
                        req.file.path,
                        () => {}
                    );
                }

                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid applicant type."
                });
            }


            // =============================================
            // DATE VALIDATION
            // =============================================

            const startDate =
                new Date(fromDate);

            const endDate =
                new Date(toDate);


            if (
                isNaN(startDate.getTime()) ||
                isNaN(endDate.getTime())
            ) {

                if (req.file) {

                    fs.unlink(
                        req.file.path,
                        () => {}
                    );
                }

                return res.status(400).json({
                    success: false,
                    message:
                        "Invalid leave dates."
                });
            }


            if (endDate < startDate) {

                if (req.file) {

                    fs.unlink(
                        req.file.path,
                        () => {}
                    );
                }

                return res.status(400).json({
                    success: false,
                    message:
                        "To date cannot be before From date."
                });
            }


            // =============================================
            // CREATE LEAVE OBJECT
            // =============================================

            const leave =
                new Leave({

                    applicantType,

                    applicantId,

                    applicantName,

                    className:
                        applicantType === "Student"
                            ? className || ""
                            : "",

                    rollNumber:
                        applicantType === "Student"
                            ? rollNumber || ""
                            : "",

                    department:
                        applicantType === "Teacher"
                            ? department || ""
                            : "",

                    leaveType,

                    fromDate:
                        startDate,

                    toDate:
                        endDate,

                    totalDays:
                        Number(totalDays),

                    reason,

                    applicationPdf:
                        req.file
                            ? {
                                fileName:
                                    req.file.originalname,

                                filePath:
                                    "/uploads/leave/" +
                                    req.file.filename
                            }
                            : {
                                fileName: "",
                                filePath: ""
                            },

                    status: "Pending",

                    adminRemarks: "",

                    actionDate: null
                });


            // =============================================
            // SAVE TO DATABASE
            // =============================================

            await leave.save();


            // =============================================
            // SUCCESS RESPONSE
            // =============================================

            res.status(201).json({

                success: true,

                message:
                    "Leave application submitted successfully.",

                data: leave
            });

        } catch (error) {

            console.error(
                "Create Leave Error:",
                error
            );


            // Delete uploaded file if database
            // save failed
            if (req.file) {

                fs.unlink(
                    req.file.path,
                    () => {}
                );
            }


            res.status(500).json({

                success: false,

                message:
                    error.message ||
                    "Unable to submit leave application.",

                error:
                    error.toString()
            });
        }
    }
);


// =====================================================
// UPDATE LEAVE STATUS
// =====================================================

router.put("/:id/status", async (req, res) => {

    try {

        const {
            status,
            adminRemarks
        } = req.body;


        if (
            status !== "Approved" &&
            status !== "Rejected"
        ) {

            return res.status(400).json({
                success: false,
                message:
                    "Invalid leave status."
            });
        }


        const leave =
            await Leave.findById(
                req.params.id
            );


        if (!leave) {

            return res.status(404).json({
                success: false,
                message:
                    "Leave application not found."
            });
        }


        leave.status =
            status;

        leave.adminRemarks =
            adminRemarks || "";

        leave.actionDate =
            new Date();


        await leave.save();


        res.json({

            success: true,

            message:
                `Leave ${status.toLowerCase()} successfully.`,

            data: leave
        });

    } catch (error) {

        console.error(
            "Update Leave Status Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to update leave status.",

            error:
                error.message
        });
    }
});


// =====================================================
// DELETE LEAVE
// =====================================================

router.delete("/:id", async (req, res) => {

    try {

        const leave =
            await Leave.findByIdAndDelete(
                req.params.id
            );


        if (!leave) {

            return res.status(404).json({
                success: false,
                message:
                    "Leave application not found."
            });
        }


        res.json({

            success: true,

            message:
                "Leave application deleted successfully."
        });

    } catch (error) {

        console.error(
            "Delete Leave Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to delete leave application.",

            error:
                error.message
        });
    }
});


module.exports = router;