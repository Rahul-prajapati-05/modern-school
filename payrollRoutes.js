// =====================================================
// PAYROLL ROUTES
// =====================================================

const express = require("express");
const router = express.Router();

const Payroll =
    require("./payrollModel");


// =====================================================
// GET ALL PAYROLL
// =====================================================

router.get("/", async function (req, res) {

    try {

        const payroll =
            await Payroll
                .find()
                .sort({ createdAt: -1 });

        res.json({

            success: true,

            data: payroll

        });

    } catch (error) {

        console.error(
            "Get Payroll Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to fetch payroll."

        });

    }

});
// =====================================================
// GET SINGLE PAYROLL
// =====================================================

router.get("/:id", async function (req, res) {

    try {

        const payroll =
            await Payroll.findById(req.params.id);

        if (!payroll) {

            return res.status(404).json({

                success: false,

                message:
                    "Payroll record not found."

            });

        }

        res.json({

            success: true,

            data: payroll

        });

    } catch (error) {

        console.error(
            "Get Single Payroll Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to fetch payroll."

        });

    }

});

// =====================================================
// ADD PAYROLL
// =====================================================

router.post("/", async function (req, res) {

    try {

        const {
            employeeName,
            employeeId,
            designation,
            month,
            year,
            basicSalary,
            allowances,
            deductions,
            paymentStatus,
            paymentDate,
            paymentMode,
            transactionId
        } = req.body;


        if (
            !employeeName ||
            !employeeId ||
            !month ||
            !year ||
            basicSalary === undefined
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Please fill all required fields."

            });

        }


        const basic =
            Number(basicSalary) || 0;

        const allowance =
            Number(allowances) || 0;

        const deduction =
            Number(deductions) || 0;


        const netSalary =
            basic +
            allowance -
            deduction;


        if (netSalary < 0) {

            return res.status(400).json({

                success: false,

                message:
                    "Deductions cannot be greater than salary."

            });

        }


        const payroll =
            new Payroll({

                employeeName:
                    employeeName.trim(),

                employeeId:
                    employeeId.trim(),

                designation:
                    designation
                        ? designation.trim()
                        : "",

                month:
                    Number(month),

                year:
                    Number(year),

                basicSalary:
                    basic,

                allowances:
                    allowance,

                deductions:
                    deduction,

                netSalary:
                    netSalary,

                paymentStatus:
                    paymentStatus ||
                    "Pending",

                paymentDate:
                    paymentDate || null,

                paymentMode:
                    paymentMode || "",

                transactionId:
                    transactionId
                        ? transactionId.trim()
                        : ""

            });


        const savedPayroll =
            await payroll.save();


        res.status(201).json({

            success: true,

            message:
                "Payroll added successfully.",

            data:
                savedPayroll

        });


    } catch (error) {

        console.error(
            "Add Payroll Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to add payroll."

        });

    }

});
// =====================================================
// UPDATE PAYROLL
// =====================================================

router.put("/:id", async function (req, res) {

    try {

        const {
            employeeName,
            employeeId,
            designation,
            month,
            year,
            basicSalary,
            allowances,
            deductions,
            paymentStatus,
            paymentDate,
            paymentMode,
            transactionId
        } = req.body;


        if (
            !employeeName ||
            !employeeId ||
            !month ||
            !year ||
            basicSalary === undefined
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Please fill all required fields."

            });

        }


        const basic =
            Number(basicSalary) || 0;

        const allowance =
            Number(allowances) || 0;

        const deduction =
            Number(deductions) || 0;


        const netSalary =
            basic +
            allowance -
            deduction;


        if (netSalary < 0) {

            return res.status(400).json({

                success: false,

                message:
                    "Deductions cannot be greater than salary."

            });

        }


        const updatedPayroll =
            await Payroll.findByIdAndUpdate(

                req.params.id,

                {

                    employeeName:
                        employeeName.trim(),

                    employeeId:
                        employeeId.trim(),

                    designation:
                        designation
                            ? designation.trim()
                            : "",

                    month:
                        Number(month),

                    year:
                        Number(year),

                    basicSalary:
                        basic,

                    allowances:
                        allowance,

                    deductions:
                        deduction,

                    netSalary:
                        netSalary,

                    paymentStatus:
                        paymentStatus ||
                        "Pending",

                    paymentDate:
                        paymentDate || null,

                    paymentMode:
                        paymentMode || "",

                    transactionId:
                        transactionId
                            ? transactionId.trim()
                            : ""

                },

                {
                    new: true,
                    runValidators: true
                }

            );


        if (!updatedPayroll) {

            return res.status(404).json({

                success: false,

                message:
                    "Payroll record not found."

            });

        }


        res.json({

            success: true,

            message:
                "Payroll updated successfully.",

            data:
                updatedPayroll

        });


    } catch (error) {

        console.error(
            "Update Payroll Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to update payroll."

        });

    }

});
// =====================================================
// DELETE PAYROLL
// =====================================================

router.delete("/:id", async function (req, res) {

    try {

        const deletedPayroll =
            await Payroll.findByIdAndDelete(
                req.params.id
            );

        if (!deletedPayroll) {

            return res.status(404).json({

                success: false,

                message:
                    "Payroll record not found."

            });

        }

        res.json({

            success: true,

            message:
                "Payroll deleted successfully.",

            data:
                deletedPayroll

        });

    } catch (error) {

        console.error(
            "Delete Payroll Error:",
            error
        );

        res.status(500).json({

            success: false,

            message:
                "Unable to delete payroll."

        });

    }

});


module.exports = router;