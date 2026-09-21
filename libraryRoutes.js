const express = require("express");

const router = express.Router();

const LibraryBook = require("./LibraryBook");
const LibraryIssue = require("./LibraryIssue");


// =====================================================
// GET ALL BOOKS
// =====================================================

router.get("/", async function (req, res) {

    try {

        const books =
            await LibraryBook.find()
                .sort({
                    createdAt: -1
                });

        return res.json({

            success: true,

            count:
                books.length,

            data:
                books

        });

    } catch (error) {

        console.error(
            "Get Library Books Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch library books."

        });

    }

});
// =====================================================
// GET ALL ISSUED BOOKS
// =====================================================

router.get("/issues", async function (req, res) {

    try {

        const issues =
            await LibraryIssue.find()
                .populate(
                    "student",
                    "firstName lastName name admissionNumber admissionNo"
                )
                .populate(
                    "book",
                    "title author isbn"
                )
                .sort({
                    createdAt: -1
                });

        return res.json({

            success: true,

            count:
                issues.length,

            data:
                issues

        });

    } catch (error) {

        console.error(
            "Get Library Issues Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch issued books."

        });

    }

});


// =====================================================
// GET SINGLE BOOK
// =====================================================

router.get("/:id", async function (req, res) {

    try {

        const book =
            await LibraryBook.findById(
                req.params.id
            );

        if (!book) {

            return res.status(404).json({

                success: false,

                message:
                    "Book not found."

            });

        }

        return res.json({

            success: true,

            data:
                book

        });

    } catch (error) {

        console.error(
            "Get Library Book Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to fetch book."

        });

    }

});


// =====================================================
// ADD BOOK
// =====================================================

router.post("/", async function (req, res) {

    try {

        const {
            title,
            author,
            publisher,
            isbn,
            category,
            totalCopies,
            shelfNumber,
            description,
            status
        } = req.body;


        if (
            !title ||
            !author ||
            !totalCopies
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Title, author and total copies are required."

            });

        }


        const copies =
            Number(totalCopies);


        if (
            !Number.isInteger(copies) ||
            copies < 1
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Total copies must be at least 1."

            });

        }


        const book =
            await LibraryBook.create({

                title:
                    title.trim(),

                author:
                    author.trim(),

                publisher:
                    publisher || "",

                isbn:
                    isbn || "",

                category:
                    category || "General",

                totalCopies:
                    copies,

                availableCopies:
                    copies,

                shelfNumber:
                    shelfNumber || "",

                description:
                    description || "",

                status:
                    status || "active"

            });


        return res.status(201).json({

            success: true,

            message:
                "Book added successfully.",

            data:
                book

        });

    } catch (error) {

        console.error(
            "Add Library Book Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to add book."

        });

    }

});


// =====================================================
// UPDATE BOOK
// =====================================================

router.put("/:id", async function (req, res) {

    try {

        const book =
            await LibraryBook.findById(
                req.params.id
            );

        if (!book) {

            return res.status(404).json({

                success: false,

                message:
                    "Book not found."

            });

        }


        const {
            title,
            author,
            publisher,
            isbn,
            category,
            totalCopies,
            shelfNumber,
            description,
            status
        } = req.body;


        if (title !== undefined)
            book.title =
                title.trim();


        if (author !== undefined)
            book.author =
                author.trim();


        if (publisher !== undefined)
            book.publisher =
                publisher;


        if (isbn !== undefined)
            book.isbn =
                isbn;


        if (category !== undefined)
            book.category =
                category;


        if (shelfNumber !== undefined)
            book.shelfNumber =
                shelfNumber;


        if (description !== undefined)
            book.description =
                description;


        if (status !== undefined)
            book.status =
                status;


        if (totalCopies !== undefined) {

            const newTotal =
                Number(totalCopies);

            if (
                !Number.isInteger(newTotal) ||
                newTotal < 1
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Total copies must be at least 1."

                });

            }


            const issuedCopies =
                book.totalCopies -
                book.availableCopies;


            if (
                newTotal <
                issuedCopies
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Total copies cannot be less than issued copies."

                });

            }


            book.totalCopies =
                newTotal;

            book.availableCopies =
                newTotal -
                issuedCopies;

        }


        await book.save();


        return res.json({

            success: true,

            message:
                "Book updated successfully.",

            data:
                book

        });

    } catch (error) {

        console.error(
            "Update Library Book Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to update book."

        });

    }

});


// =====================================================
// DELETE BOOK
// =====================================================

router.delete("/:id", async function (req, res) {

    try {

        const book =
            await LibraryBook.findById(
                req.params.id
            );

        if (!book) {

            return res.status(404).json({

                success: false,

                message:
                    "Book not found."

            });

        }


        if (
            book.availableCopies <
            book.totalCopies
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "This book cannot be deleted because copies are currently issued."

            });

        }


        await LibraryBook.findByIdAndDelete(
            req.params.id
        );


        return res.json({

            success: true,

            message:
                "Book deleted successfully."

        });

    } catch (error) {

        console.error(
            "Delete Library Book Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to delete book."

        });

    }

});

// =====================================================
// ISSUE BOOK
// =====================================================

router.post("/issue", async function (req, res) {

    try {

        const {
            studentId,
            bookId,
            issueDate,
            dueDate
        } = req.body;


        if (
            !studentId ||
            !bookId ||
            !issueDate ||
            !dueDate
        ) {

            return res.status(400).json({

                success: false,

                message:
                    "Student, book, issue date and due date are required."

            });

        }


        const book =
            await LibraryBook.findById(bookId);


        if (!book) {

            return res.status(404).json({

                success: false,

                message:
                    "Book not found."

            });

        }


        if (book.availableCopies <= 0) {

            return res.status(400).json({

                success: false,

                message:
                    "No copies of this book are currently available."

            });

        }


        const issue =
            await LibraryIssue.create({

                student:
                    studentId,

                book:
                    bookId,

                issueDate:
                    issueDate,

                dueDate:
                    dueDate,

                status:
                    "issued"

            });


        book.availableCopies =
            book.availableCopies - 1;

        await book.save();


        return res.status(201).json({

            success: true,

            message:
                "Book issued successfully.",

            data:
                issue

        });

    } catch (error) {

        console.error(
            "Issue Library Book Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to issue book."

        });

    }

});

// =====================================================
// RETURN LIBRARY BOOK
// =====================================================

router.put(
    "/return/:issueId",
    async function (req, res) {

        try {

            const issue =
                await LibraryIssue.findById(
                    req.params.issueId
                );

            if (!issue) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Issue record not found."

                });

            }


            if (
                issue.status === "returned"
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "This book has already been returned."

                });

            }


            issue.status =
                "returned";

            issue.returnDate =
                new Date();


            await issue.save();


            const book =
                await LibraryBook.findById(
                    issue.book
                );

            if (book) {

                book.availableCopies =
                    Math.min(
                        book.availableCopies + 1,
                        book.totalCopies
                    );

                await book.save();

            }


            res.json({

                success: true,

                message:
                    "Book returned successfully.",

                data: issue

            });


        } catch (error) {

            console.error(
                "Return Library Book Error:",
                error
            );


            res.status(500).json({

                success: false,

                message:
                    "Unable to return library book."

            });

        }

    }
);
// // =====================================================
// // GET ALL ISSUED BOOKS
// // =====================================================

// router.get("/issues", async function (req, res) {

//     try {

//         const issues =
//             await LibraryIssue.find()
//                 .populate(
//                     "student",
//                     "firstName lastName name admissionNumber admissionNo"
//                 )
//                 .populate(
//                     "book",
//                     "title author isbn"
//                 )
//                 .sort({
//                     createdAt: -1
//                 });

//         return res.json({

//             success: true,

//             count:
//                 issues.length,

//             data:
//                 issues

//         });

//     } catch (error) {

//         console.error(
//             "Get Library Issues Error:",
//             error
//         );

//         return res.status(500).json({

//             success: false,

//             message:
//                 "Unable to fetch issued books."

//         });

//     }

// });
module.exports = router;