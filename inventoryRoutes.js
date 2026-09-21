const express = require("express");
const router = express.Router();


console.log("🔥 INVENTORY ROUTES LOADED");


const Inventory = require("./inventoryModel");

const InventoryIssue =
    require("./inventoryIssueModel");



// =====================================================
// GET ALL INVENTORY ITEMS
// =====================================================

router.get("/", async function (req, res) {

    console.log(
        "🔥 INVENTORY GET ROUTE HIT"
    );

    try {

        const items =
            await Inventory.find()
                .sort({ createdAt: -1 });


        res.json({

            success: true,

            data: items

        });


    } catch (error) {

        console.error(
            "Inventory Fetch Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to fetch inventory items."

        });

    }

});



// =====================================================
// ADD INVENTORY ITEM
// =====================================================

router.post("/", async function (req, res) {

    try {

        const {
            itemName,
            category,
            quantity,
            availableQuantity,
            unitPrice,
            supplier,
            purchaseDate,
            description
        } = req.body;


        // REQUIRED VALIDATION

        if (
            !itemName ||
            !category ||
            quantity === undefined ||
            availableQuantity === undefined
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Item name, category, quantity and available quantity are required."

            });

        }


        // CREATE INVENTORY ITEM

        const item =
            new Inventory({

                itemName:
                    itemName.trim(),

                category:
                    category.trim(),

                quantity:
                    Number(quantity),

                availableQuantity:
                    Number(availableQuantity),

                unitPrice:
                    Number(unitPrice) || 0,

                supplier:
                    supplier
                        ? supplier.trim()
                        : "",

                purchaseDate:
                    purchaseDate || undefined,

                description:
                    description
                        ? description.trim()
                        : ""

            });


        // SAVE ITEM

        await item.save();


        res.status(201).json({

            success: true,

            message:
                "Inventory item added successfully.",

            data: item

        });


    } catch (error) {

        console.error(
            "Add Inventory Item Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to add inventory item."

        });

    }

});



// =====================================================
// ISSUE INVENTORY ITEM
// =====================================================

router.post(
    "/:id/issue",
    async function (req, res) {

        try {

            const {
                quantity,
                issuedTo,
                issueDate,
                remarks
            } = req.body;


            // VALIDATION

            if (
                !quantity ||
                Number(quantity) <= 0
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Valid issue quantity is required."

                });

            }


            if (
                !issuedTo ||
                !issuedTo.trim()
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Issued To is required."

                });

            }


            // FIND ITEM

            const item =
                await Inventory.findById(
                    req.params.id
                );


            if (!item) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Inventory item not found."

                });

            }


            const issueQuantity =
                Number(quantity);


            // CHECK AVAILABLE STOCK

            if (
                issueQuantity >
                item.availableQuantity
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        `Only ${item.availableQuantity} items are available.`

                });

            }


            // REDUCE AVAILABLE STOCK

            item.availableQuantity -=
                issueQuantity;


            // UPDATE STATUS

            if (
                item.availableQuantity === 0
            ) {

                item.status =
                    "Out of Stock";

            }
            else if (
                item.availableQuantity <=
                Math.ceil(
                    item.quantity * 0.2
                )
            ) {

                item.status =
                    "Low Stock";

            }
            else {

                item.status =
                    "Available";

            }


            // SAVE UPDATED INVENTORY

            await item.save();



            // =================================================
            // SAVE ISSUE HISTORY
            // =================================================

            const issueRecord =
                new InventoryIssue({

                    inventoryItem:
                        item._id,

                    itemName:
                        item.itemName,

                    quantity:
                        issueQuantity,

                    returnedQuantity:
                        0,

                    issuedTo:
                        issuedTo.trim(),

                    issueDate:
                        issueDate ||
                        new Date(),

                    remarks:
                        remarks
                            ? remarks.trim()
                            : "",

                    status:
                        "Issued"

                });


            await issueRecord.save();



            // RESPONSE

            res.json({

                success: true,

                message:
                    "Inventory item issued successfully.",

                data: item

            });


        } catch (error) {

            console.error(
                "Issue Inventory Error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Unable to issue inventory item."

            });

        }

    }
);


// =====================================================
// RETURN INVENTORY ITEM
// =====================================================

router.post(
    "/issues/:issueId/return",
    async function (req, res) {

        try {

            const {
                quantity
            } = req.body;


            // VALIDATION

            if (
                !quantity ||
                Number(quantity) <= 0
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Valid return quantity is required."

                });

            }


            const returnQuantity =
                Number(quantity);


            // FIND ISSUE RECORD

            const issueRecord =
                await InventoryIssue.findById(
                    req.params.issueId
                );


            if (!issueRecord) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Inventory issue record not found."

                });

            }


            // CALCULATE PENDING QUANTITY

            const pendingQuantity =
                issueRecord.quantity -
                issueRecord.returnedQuantity;


            if (
                returnQuantity >
                pendingQuantity
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        `Only ${pendingQuantity} item(s) can be returned.`

                });

            }


            // FIND INVENTORY ITEM

            const item =
                await Inventory.findById(
                    issueRecord.inventoryItem
                );


            if (!item) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Inventory item not found."

                });

            }


            // ADD BACK TO AVAILABLE STOCK

            item.availableQuantity +=
                returnQuantity;


            // UPDATE INVENTORY STATUS

            if (
                item.availableQuantity === 0
            ) {

                item.status =
                    "Out of Stock";

            }
            else if (
                item.availableQuantity <=
                Math.ceil(
                    item.quantity * 0.2
                )
            ) {

                item.status =
                    "Low Stock";

            }
            else {

                item.status =
                    "Available";

            }


            await item.save();


            // UPDATE RETURNED QUANTITY

            issueRecord.returnedQuantity +=
                returnQuantity;


            // UPDATE ISSUE STATUS

            if (
                issueRecord.returnedQuantity >=
                issueRecord.quantity
            ) {

                issueRecord.status =
                    "Returned";

            }
            else {

                issueRecord.status =
                    "Partially Returned";

            }


            await issueRecord.save();


            res.json({

                success: true,

                message:
                    "Inventory item returned successfully.",

                data: {

                    item: item,

                    issue: issueRecord

                }

            });


        } catch (error) {

            console.error(
                "Return Inventory Error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Unable to return inventory item."

            });

        }

    }
);


// =====================================================
// MARK INVENTORY ITEM AS DAMAGED / LOST
// =====================================================

router.post(
    "/:id/damaged",
    async function (req, res) {

        try {

            const {
                quantity,
                reason
            } = req.body;

            if (
                !quantity ||
                Number(quantity) <= 0
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        "Valid damaged/lost quantity is required."
                });
            }

            const damagedQuantity =
                Number(quantity);

            const item =
                await Inventory.findById(
                    req.params.id
                );

            if (!item) {
                return res.status(404).json({
                    success: false,
                    message:
                        "Inventory item not found."
                });
            }

            if (
                damagedQuantity >
                item.availableQuantity
            ) {
                return res.status(400).json({
                    success: false,
                    message:
                        `Only ${item.availableQuantity} item(s) are available.`
                });
            }

            item.availableQuantity -=
                damagedQuantity;

            item.damagedQuantity +=
                damagedQuantity;

            if (
                item.availableQuantity === 0
            ) {
                item.status =
                    "Out of Stock";
            }
            else if (
                item.availableQuantity <=
                Math.ceil(
                    item.quantity * 0.2
                )
            ) {
                item.status =
                    "Low Stock";
            }
            else {
                item.status =
                    "Available";
            }

            await item.save();

            res.json({
                success: true,
                message:
                    "Inventory item marked as damaged/lost successfully.",
                data: {
                    item: item,
                    quantity:
                        damagedQuantity,
                    reason:
                        reason || ""
                }
            });

        } catch (error) {

            console.error(
                "Damaged Inventory Error:",
                error
            );

            res.status(500).json({
                success: false,
                message:
                    "Unable to mark inventory item as damaged/lost."
            });
        }
    }
);






// =====================================================
// GET INVENTORY ISSUE HISTORY
// =====================================================

router.get("/issues/history", async function (req, res) {

    try {

        const issues =
            await InventoryIssue.find()
                .sort({ createdAt: -1 });


        res.json({

            success: true,

            data: issues

        });


    } catch (error) {

        console.error(
            "Inventory Issue History Error:",
            error
        );


        res.status(500).json({

            success: false,

            message:
                "Unable to fetch issue history."

        });

    }

});



module.exports = router;