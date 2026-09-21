const express = require("express");

const Class = require("./Class");
const Teacher = require("./Teacher");

const router = express.Router();


// =====================================================
// HELPER
// =====================================================

function normalizeClass(classItem) {

    const data =
        classItem.toObject
            ? classItem.toObject()
            : classItem;


    return {

        ...data,

        id:
            data._id,

        sectionCount:
            data.sections
                ? data.sections.length
                : 0

    };

}


// =====================================================
// GET ALL CLASSES
// =====================================================

router.get(
    "/",
    async function (req, res) {

        try {

            const classes =
                await Class.find()
                    .populate(
                        "sections.classTeacher",
                        "employeeId firstName lastName designation"
                    )
                    .sort({
                        className: 1
                    });


            const data =
                classes.map(
                    normalizeClass
                );


            return res.json({

                success: true,

                count:
                    data.length,

                data:
                    data

            });

        } catch (error) {

            console.error(
                "Get Classes Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to fetch classes."

            });

        }

    }
);


// =====================================================
// GET SINGLE CLASS
// =====================================================

router.get(
    "/:id",
    async function (req, res) {

        try {

            const classItem =
                await Class.findById(
                    req.params.id
                ).populate(
                    "sections.classTeacher",
                    "employeeId firstName lastName designation"
                );


            if (!classItem) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Class not found."

                });

            }


            return res.json({

                success: true,

                data:
                    normalizeClass(
                        classItem
                    )

            });

        } catch (error) {

            console.error(
                "Get Class Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to fetch class."

            });

        }

    }
);


// =====================================================
// CREATE CLASS
// =====================================================

router.post(
    "/",
    async function (req, res) {

        try {

            const {

                className,

                classCode,

                description,

                status

            } = req.body;


            if (!className) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Class name is required."

                });

            }


            const existingClass =
                await Class.findOne({

                    className:
                        className.trim()

                });


            if (existingClass) {

                return res.status(409).json({

                    success: false,

                    message:
                        "Class already exists."

                });

            }


            if (classCode) {

                const existingCode =
                    await Class.findOne({

                        classCode:
                            classCode
                                .trim()
                                .toUpperCase()

                    });


                if (existingCode) {

                    return res.status(409).json({

                        success: false,

                        message:
                            "Class code already exists."

                    });

                }

            }


            const classItem =
                await Class.create({

                    className:
                        className.trim(),

                    classCode:
                        classCode
                            ? classCode
                                .trim()
                                .toUpperCase()
                            : undefined,

                    description:
                        description || "",

                    status:
                        status || "active",

                    sections:
                        []

                });


            return res.status(201).json({

                success: true,

                message:
                    "Class created successfully.",

                data:
                    normalizeClass(
                        classItem
                    )

            });

        } catch (error) {

            console.error(
                "Create Class Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to create class."

            });

        }

    }
);


// =====================================================
// UPDATE CLASS
// =====================================================

router.put(
    "/:id",
    async function (req, res) {

        try {

            const classItem =
                await Class.findById(
                    req.params.id
                );


            if (!classItem) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Class not found."

                });

            }


            const {

                className,

                classCode,

                description,

                status

            } = req.body;


            if (
                className !== undefined
            ) {

                const newName =
                    className.trim();


                if (
                    newName &&
                    newName !==
                        classItem.className
                ) {

                    const duplicate =
                        await Class.findOne({

                            className:
                                newName,

                            _id: {
                                $ne:
                                    classItem._id
                            }

                        });


                    if (duplicate) {

                        return res.status(409).json({

                            success: false,

                            message:
                                "Class name already exists."

                        });

                    }


                    classItem.className =
                        newName;

                }

            }


            if (
                classCode !== undefined
            ) {

                const newCode =
                    classCode
                        ? classCode
                            .trim()
                            .toUpperCase()
                        : "";


                if (
                    newCode &&
                    newCode !==
                        classItem.classCode
                ) {

                    const duplicate =
                        await Class.findOne({

                            classCode:
                                newCode,

                            _id: {
                                $ne:
                                    classItem._id
                            }

                        });


                    if (duplicate) {

                        return res.status(409).json({

                            success: false,

                            message:
                                "Class code already exists."

                        });

                    }

                }


                classItem.classCode =
                    newCode || undefined;

            }


            if (
                description !== undefined
            ) {

                classItem.description =
                    description;

            }


            if (
                status !== undefined
            ) {

                classItem.status =
                    status;

            }


            await classItem.save();


            return res.json({

                success: true,

                message:
                    "Class updated successfully.",

                data:
                    normalizeClass(
                        classItem
                    )

            });

        } catch (error) {

            console.error(
                "Update Class Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to update class."

            });

        }

    }
);


// =====================================================
// DELETE CLASS
// =====================================================

router.delete(
    "/:id",
    async function (req, res) {

        try {

            const classItem =
                await Class.findById(
                    req.params.id
                );


            if (!classItem) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Class not found."

                });

            }


            await Class.findByIdAndDelete(
                req.params.id
            );


            return res.json({

                success: true,

                message:
                    "Class deleted successfully."

            });

        } catch (error) {

            console.error(
                "Delete Class Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to delete class."

            });

        }

    }
);


// =====================================================
// ADD SECTION TO CLASS
// =====================================================

router.post(
    "/:id/sections",
    async function (req, res) {

        try {

            const classItem =
                await Class.findById(
                    req.params.id
                );


            if (!classItem) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Class not found."

                });

            }


            const {

                name,

                capacity,

                classTeacher

            } = req.body;


            if (!name) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Section name is required."

                });

            }


            const sectionName =
                name.trim();


            const duplicate =
                classItem.sections.find(
                    function (section) {

                        return (
                            section.name
                                .toLowerCase() ===
                            sectionName
                                .toLowerCase()
                        );

                    }
                );


            if (duplicate) {

                return res.status(409).json({

                    success: false,

                    message:
                        "Section already exists in this class."

                });

            }


            if (classTeacher) {

                const teacher =
                    await Teacher.findById(
                        classTeacher
                    );


                if (!teacher) {

                    return res.status(404).json({

                        success: false,

                        message:
                            "Selected teacher not found."

                    });

                }

            }


            classItem.sections.push({

                name:
                    sectionName,

                capacity:
                    Number(capacity) || 40,

                classTeacher:
                    classTeacher || null,

                status:
                    "active"

            });


            await classItem.save();


            const updatedClass =
                await Class.findById(
                    classItem._id
                ).populate(
                    "sections.classTeacher",
                    "employeeId firstName lastName designation"
                );


            return res.status(201).json({

                success: true,

                message:
                    "Section added successfully.",

                data:
                    normalizeClass(
                        updatedClass
                    )

            });

        } catch (error) {

            console.error(
                "Add Section Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to add section."

            });

        }

    }
);


// =====================================================
// UPDATE SECTION
// =====================================================

router.put(
    "/:id/sections/:sectionId",
    async function (req, res) {

        try {

            const classItem =
                await Class.findById(
                    req.params.id
                );


            if (!classItem) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Class not found."

                });

            }


            const section =
                classItem.sections.id(
                    req.params.sectionId
                );


            if (!section) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Section not found."

                });

            }


            const {

                name,

                capacity,

                classTeacher,

                status

            } = req.body;


            if (name !== undefined) {

                const newName =
                    name.trim();


                const duplicate =
                    classItem.sections.find(
                        function (item) {

                            return (
                                item._id.toString() !==
                                    section._id.toString() &&
                                item.name
                                    .toLowerCase() ===
                                    newName.toLowerCase()
                            );

                        }
                    );


                if (duplicate) {

                    return res.status(409).json({

                        success: false,

                        message:
                            "Section name already exists."

                    });

                }


                section.name =
                    newName;

            }


            if (
                capacity !== undefined
            ) {

                section.capacity =
                    Number(capacity) || 40;

            }


            if (
                classTeacher !== undefined
            ) {

                if (classTeacher) {

                    const teacher =
                        await Teacher.findById(
                            classTeacher
                        );


                    if (!teacher) {

                        return res.status(404).json({

                            success: false,

                            message:
                                "Selected teacher not found."

                        });

                    }

                }


                section.classTeacher =
                    classTeacher || null;

            }


            if (
                status !== undefined
            ) {

                section.status =
                    status;

            }


            await classItem.save();


            const updatedClass =
                await Class.findById(
                    classItem._id
                ).populate(
                    "sections.classTeacher",
                    "employeeId firstName lastName designation"
                );


            return res.json({

                success: true,

                message:
                    "Section updated successfully.",

                data:
                    normalizeClass(
                        updatedClass
                    )

            });

        } catch (error) {

            console.error(
                "Update Section Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to update section."

            });

        }

    }
);


// =====================================================
// DELETE SECTION
// =====================================================

router.delete(
    "/:id/sections/:sectionId",
    async function (req, res) {

        try {

            const classItem =
                await Class.findById(
                    req.params.id
                );


            if (!classItem) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Class not found."

                });

            }


            const section =
                classItem.sections.id(
                    req.params.sectionId
                );


            if (!section) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Section not found."

                });

            }


            section.deleteOne();


            await classItem.save();


            return res.json({

                success: true,

                message:
                    "Section deleted successfully."

            });

        } catch (error) {

            console.error(
                "Delete Section Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to delete section."

            });

        }

    }
);


// =====================================================
// GET AVAILABLE TEACHERS
// =====================================================

router.get(
    "/teachers/list",
    async function (req, res) {

        try {

            const teachers =
                await Teacher.find({

                    status:
                        "active"

                }).select(
                    "employeeId firstName lastName designation"
                ).sort({

                    firstName: 1

                });


            return res.json({

                success: true,

                count:
                    teachers.length,

                data:
                    teachers

            });

        } catch (error) {

            console.error(
                "Get Class Teachers Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to fetch teachers."

            });

        }

    }
);


// =====================================================
// EXPORT
// =====================================================

module.exports =
    router;