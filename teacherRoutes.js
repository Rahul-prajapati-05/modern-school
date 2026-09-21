const express = require("express");
const bcrypt = require("bcryptjs");

const Teacher = require("./Teacher");
const User = require("./User");

const router = express.Router();


// =====================================================
// HELPER — NORMALIZE TEACHER
// =====================================================

function normalizeTeacher(teacher) {

    const data =
        teacher.toObject
            ? teacher.toObject()
            : teacher;

    const firstName =
        data.firstName || "";

    const lastName =
        data.lastName || "";

    const fullName =
        `${firstName} ${lastName}`.trim() ||
        "Unknown Teacher";

    return {

        ...data,

        fullName,

        id:
            data._id

    };
}


// =====================================================
// GET ALL TEACHERS
// =====================================================

router.get(
    "/",
    async function (req, res) {

        try {

            const teachers =
                await Teacher.find()
                    .populate(
                        "user",
                        "name email phone role isActive"
                    )
                    .sort({
                        createdAt: -1
                    });


            const normalizedTeachers =
                teachers.map(
                    normalizeTeacher
                );


            return res.json({

                success: true,

                count:
                    normalizedTeachers.length,

                data:
                    normalizedTeachers

            });

        } catch (error) {

            console.error(
                "Get Teachers Error:",
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
// GET SINGLE TEACHER
// =====================================================

router.get(
    "/:id",
    async function (req, res) {

        try {

            const teacher =
                await Teacher.findById(
                    req.params.id
                ).populate(
                    "user",
                    "name email phone role isActive"
                );


            if (!teacher) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Teacher not found."

                });

            }


            return res.json({

                success: true,

                data:
                    normalizeTeacher(teacher)

            });

        } catch (error) {

            console.error(
                "Get Teacher Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Unable to fetch teacher."

            });

        }

    }
);


// =====================================================
// CREATE TEACHER
// =====================================================

router.post(
    "/",
    async function (req, res) {

        try {

            const {

                employeeId,

                firstName,

                lastName,

                email,

                password,

                dateOfBirth,

                gender,

                phone,

                address,

                city,

                state,

                pincode,

                qualification,

                specialization,

                experience,

                joiningDate,

                designation,

                department

            } = req.body;


            // -------------------------------------------------
            // REQUIRED FIELDS
            // -------------------------------------------------

            if (
                !employeeId ||
                !firstName ||
                !email ||
                !password
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Employee ID, first name, email and password are required."

                });

            }


            if (password.length < 6) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Password must be at least 6 characters."

                });

            }


            // -------------------------------------------------
            // CHECK EMPLOYEE ID
            // -------------------------------------------------

            const existingTeacher =
                await Teacher.findOne({

                    employeeId:
                        employeeId.trim()

                });


            if (existingTeacher) {

                return res.status(409).json({

                    success: false,

                    message:
                        "Employee ID already exists."

                });

            }


            // -------------------------------------------------
            // CHECK EMAIL
            // -------------------------------------------------

            const existingUser =
                await User.findOne({

                    email:
                        email.toLowerCase().trim()

                });


            if (existingUser) {

                return res.status(409).json({

                    success: false,

                    message:
                        "Email is already registered."

                });

            }


            // -------------------------------------------------
            // HASH PASSWORD
            // -------------------------------------------------

            const hashedPassword =
                await bcrypt.hash(
                    password,
                    12
                );


            // -------------------------------------------------
            // CREATE USER
            // -------------------------------------------------

            const user =
                await User.create({

                    name:
                        `${firstName} ${lastName || ""}`.trim(),

                    email:
                        email.toLowerCase().trim(),

                    password:
                        hashedPassword,

                    role:
                        "teacher",

                    phone:
                        phone || "",

                    isActive:
                        true

                });


            // -------------------------------------------------
            // CREATE TEACHER
            // -------------------------------------------------

            try {

                const teacher =
                    await Teacher.create({

                        user:
                            user._id,

                        employeeId:
                            employeeId.trim(),

                        firstName:
                            firstName.trim(),

                        lastName:
                            lastName || "",

                        dateOfBirth:
                            dateOfBirth || null,

                        gender:
                            gender || "",

                        email:
                            email.toLowerCase().trim(),

                        phone:
                            phone || "",

                        address:
                            address || "",

                        city:
                            city || "",

                        state:
                            state || "",

                        pincode:
                            pincode || "",

                        qualification:
                            qualification || "",

                        specialization:
                            specialization || "",

                        experience:
                            Number(experience) || 0,

                        joiningDate:
                            joiningDate || null,

                        designation:
                            designation ||
                            "Teacher",

                        department:
                            department || "",

                        status:
                            "active"

                    });


                return res.status(201).json({

                    success: true,

                    message:
                        "Teacher created successfully.",

                    data:
                        normalizeTeacher(teacher)

                });


            } catch (teacherError) {

                // Rollback User if Teacher creation fails

                await User.findByIdAndDelete(
                    user._id
                );

                throw teacherError;

            }

        } catch (error) {

            console.error(
                "Create Teacher Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Unable to create teacher."

            });

        }

    }
);


// =====================================================
// UPDATE TEACHER
// =====================================================

router.put(
    "/:id",
    async function (req, res) {

        try {

            const teacher =
                await Teacher.findById(
                    req.params.id
                );


            if (!teacher) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Teacher not found."

                });

            }


            const {

                employeeId,

                firstName,

                lastName,

                email,

                dateOfBirth,

                gender,

                phone,

                address,

                city,

                state,

                pincode,

                qualification,

                specialization,

                experience,

                joiningDate,

                designation,

                department,

                status

            } = req.body;


            // -------------------------------------------------
            // EMPLOYEE ID
            // -------------------------------------------------

            if (
                employeeId !== undefined
            ) {

                const newEmployeeId =
                    employeeId.trim();


                if (
                    newEmployeeId &&
                    newEmployeeId !==
                        teacher.employeeId
                ) {

                    const duplicate =
                        await Teacher.findOne({

                            employeeId:
                                newEmployeeId,

                            _id: {
                                $ne:
                                    teacher._id
                            }

                        });


                    if (duplicate) {

                        return res.status(409).json({

                            success: false,

                            message:
                                "Employee ID already exists."

                        });

                    }


                    teacher.employeeId =
                        newEmployeeId;

                }

            }


            // -------------------------------------------------
            // BASIC INFORMATION
            // -------------------------------------------------

            if (
                firstName !== undefined
            ) {

                teacher.firstName =
                    firstName.trim();

            }


            if (
                lastName !== undefined
            ) {

                teacher.lastName =
                    lastName.trim();

            }


            if (
                dateOfBirth !== undefined
            ) {

                teacher.dateOfBirth =
                    dateOfBirth || null;

            }


            if (
                gender !== undefined
            ) {

                teacher.gender =
                    gender;

            }


            // -------------------------------------------------
            // CONTACT
            // -------------------------------------------------

            if (
                phone !== undefined
            ) {

                teacher.phone =
                    phone;

            }


            if (
                email !== undefined
            ) {

                teacher.email =
                    email.toLowerCase().trim();

            }


            if (
                address !== undefined
            ) {

                teacher.address =
                    address;

            }


            if (
                city !== undefined
            ) {

                teacher.city =
                    city;

            }


            if (
                state !== undefined
            ) {

                teacher.state =
                    state;

            }


            if (
                pincode !== undefined
            ) {

                teacher.pincode =
                    pincode;

            }


            // -------------------------------------------------
            // PROFESSIONAL
            // -------------------------------------------------

            if (
                qualification !== undefined
            ) {

                teacher.qualification =
                    qualification;

            }


            if (
                specialization !== undefined
            ) {

                teacher.specialization =
                    specialization;

            }


            if (
                experience !== undefined
            ) {

                teacher.experience =
                    Number(experience) || 0;

            }


            if (
                joiningDate !== undefined
            ) {

                teacher.joiningDate =
                    joiningDate || null;

            }


            if (
                designation !== undefined
            ) {

                teacher.designation =
                    designation;

            }


            if (
                department !== undefined
            ) {

                teacher.department =
                    department;

            }


            if (
                status !== undefined
            ) {

                teacher.status =
                    status;

            }


            await teacher.save();


            // -------------------------------------------------
            // UPDATE USER
            // -------------------------------------------------

            if (teacher.user) {

                const user =
                    await User.findById(
                        teacher.user
                    );


                if (user) {

                    user.name =
                        `${teacher.firstName} ${teacher.lastName || ""}`.trim();


                    if (
                        email !== undefined
                    ) {

                        user.email =
                            email.toLowerCase().trim();

                    }


                    if (
                        phone !== undefined
                    ) {

                        user.phone =
                            phone;

                    }


                    if (
                        status !== undefined
                    ) {

                        user.isActive =
                            status === "active";

                    }


                    await user.save();

                }

            }


            return res.json({

                success: true,

                message:
                    "Teacher updated successfully.",

                data:
                    normalizeTeacher(teacher)

            });

        } catch (error) {

            console.error(
                "Update Teacher Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Unable to update teacher."

            });

        }

    }
);


// =====================================================
// DELETE TEACHER
// =====================================================

router.delete(
    "/:id",
    async function (req, res) {

        try {

            const teacher =
                await Teacher.findById(
                    req.params.id
                );


            if (!teacher) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Teacher not found."

                });

            }


            // Delete linked user

            if (teacher.user) {

                await User.findByIdAndDelete(
                    teacher.user
                );

            }


            // Delete teacher

            await Teacher.findByIdAndDelete(
                req.params.id
            );


            return res.json({

                success: true,

                message:
                    "Teacher deleted successfully."

            });

        } catch (error) {

            console.error(
                "Delete Teacher Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Unable to delete teacher."

            });

        }

    }
);


// =====================================================
// EXPORT
// =====================================================

module.exports = router;