const express = require("express");

const router = express.Router();

const Fee = require("./Fee");


// =====================================================
// GET ALL FEES
// =====================================================

router.get("/", async function (req, res) {

    try {

        const fees =
            await Fee.find()
                .populate(
                    "student"
                )
                .sort({
                    createdAt: -1
                });


        return res.json({

            success: true,

            count:
                fees.length,

            data:
                fees

        });

    } catch (error) {

        console.error(
            "Get Fees Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch fees."

        });

    }

});


// =====================================================
// ADD FEE
// =====================================================

router.post("/", async function (req, res) {

    try {

        const {
            student,
            feeType,
            totalAmount,
            paidAmount,
            paymentDate,
            remarks
        } = req.body;


        if (
            !student ||
            !feeType ||
            totalAmount === undefined
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Student, fee type and total amount are required."

            });

        }


        const total =
            Number(totalAmount);


        const paid =
            paidAmount === undefined
                ? 0
                : Number(paidAmount);


        if (
            Number.isNaN(total) ||
            Number.isNaN(paid)
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Amount must be a valid number."

            });

        }


        if (total < 0 || paid < 0) {

            return res.status(400).json({

                success: false,

                message:
                    "Amount cannot be negative."

            });

        }


        if (paid > total) {

            return res.status(400).json({

                success: false,

                message:
                    "Paid amount cannot be greater than total amount."

            });

        }


        const fee =
            await Fee.create({

                student:
                    student,

                feeType:
                    feeType,

                totalAmount:
                    total,

                paidAmount:
                    paid,

                paymentDate:
                    paymentDate || null,

                remarks:
                    remarks || ""

            });


        const populatedFee =
            await Fee.findById(
                fee._id
            )
            .populate(
                "student"
            );


        return res.status(201).json({

            success: true,

            message:
                "Fee added successfully.",

            data:
                populatedFee

        });

    } catch (error) {

        console.error(
            "Add Fee Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to add fee."

        });

    }

});


// =====================================================
// UPDATE FEE
// =====================================================

router.put("/:id", async function (req, res) {

    try {

        const {
            student,
            feeType,
            totalAmount,
            paidAmount,
            paymentDate,
            remarks
        } = req.body;


        const fee =
            await Fee.findById(
                req.params.id
            );


        if (!fee) {

            return res.status(404).json({

                success: false,

                message:
                    "Fee record not found."

            });

        }


        if (student !== undefined)
            fee.student = student;


        if (feeType !== undefined)
            fee.feeType = feeType;


        if (totalAmount !== undefined)
            fee.totalAmount =
                Number(totalAmount);


        if (paidAmount !== undefined)
            fee.paidAmount =
                Number(paidAmount);


        if (paymentDate !== undefined)
            fee.paymentDate =
                paymentDate || null;


        if (remarks !== undefined)
            fee.remarks =
                remarks;


        if (
            fee.totalAmount < 0 ||
            fee.paidAmount < 0
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Amount cannot be negative."

            });

        }


        if (
            fee.paidAmount >
            fee.totalAmount
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Paid amount cannot be greater than total amount."

            });

        }


        await fee.save();


        const updatedFee =
            await Fee.findById(
                fee._id
            )
            .populate(
                "student"
            );


        return res.json({

            success: true,

            message:
                "Fee updated successfully.",

            data:
                updatedFee

        });

    } catch (error) {

        console.error(
            "Update Fee Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to update fee."

        });

    }

});


// =====================================================
// DELETE FEE
// =====================================================

router.delete("/:id", async function (req, res) {

    try {

        const fee =
            await Fee.findById(
                req.params.id
            );


        if (!fee) {

            return res.status(404).json({

                success: false,

                message:
                    "Fee record not found."

            });

        }


        await Fee.findByIdAndDelete(
            req.params.id
        );


        return res.json({

            success: true,

            message:
                "Fee deleted successfully."

        });

    } catch (error) {

        console.error(
            "Delete Fee Error:",
            error
        );


        return res.status(500).json({

            success: false,

            message:
                "Unable to delete fee."

        });

    }

});


// =====================================================
// EXPORT
// =====================================================

module.exports = router;