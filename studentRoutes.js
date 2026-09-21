const express = require("express");
const bcrypt = require("bcryptjs");

const Student = require("./Student");
const User = require("./User");

const router = express.Router();


// =====================================================
// HELPER — OLD + NEW DATA FORMAT
// =====================================================

function normalizeStudent(student) {

    const data =
        student.toObject
            ? student.toObject()
            : student;


    const firstName =
        data.firstName ||
        data.name ||
        "";


    const lastName =
        data.lastName ||
        "";


    const admissionNumber =
        data.admissionNumber ||
        data.admissionNo ||
        "";


    const dateOfBirth =
        data.dateOfBirth ||
        data.dob ||
        null;


    const className =
        data.className ||
        "";


    const fatherName =
        data.fatherName ||
        data.guardianName ||
        "";


    const motherName =
        data.motherName ||
        "";


    const fullName =
        `${firstName} ${lastName}`.trim() ||
        "Unknown Student";


    return {

        ...data,

        admissionNumber,

        admissionNo:
            data.admissionNo ||
            admissionNumber,

        firstName,

        lastName,

        name:
            data.name ||
            fullName,

        fullName,

        dateOfBirth,

        dob:
            data.dob ||
            dateOfBirth,

        className,

        fatherName,

        motherName,

        id:
            data._id

    };

}


// =====================================================
// GET ALL STUDENTS
// =====================================================

router.get(
    "/",
    async function (req, res) {

        try {

            const students =
                await Student.find()
                    .populate(
                        "user",
                        "name email phone role isActive"
                    )
                    .sort({
                        createdAt: -1
                    });


            const normalizedStudents =
                students.map(
                    normalizeStudent
                );


            return res.json({

                success: true,

                count:
                    normalizedStudents.length,

                data:
                    normalizedStudents

            });

        } catch (error) {

            console.error(
                "Get Students Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to fetch students."

            });

        }

    }
);


// =====================================================
// GET SINGLE STUDENT
// =====================================================

router.get(
    "/:id",
    async function (req, res) {

        try {

            const student =
                await Student.findById(
                    req.params.id
                ).populate(
                    "user",
                    "name email phone role isActive"
                );


            if (!student) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Student not found."

                });

            }


            return res.json({

                success: true,

                data:
                    normalizeStudent(student)

            });

        } catch (error) {

            console.error(
                "Get Student Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to fetch student."

            });

        }

    }
);


// =====================================================
// CREATE STUDENT
// =====================================================

router.post(
    "/",
    async function (req, res) {

        try {

            const {

                admissionNumber,
                admissionNo,

                firstName,
                name,

                lastName,

                email,
                password,

                dateOfBirth,
                dob,

                gender,
                phone,

                address,

                city,
                state,
                pincode,

                section,
                rollNumber,

                admissionDate,

                className,

                fatherName,
                motherName,

                guardianName,
                guardianPhone,
                guardianRelation,

                bloodGroup

            } = req.body;


            // -------------------------------------------------
            // NORMALIZE INPUT
            // -------------------------------------------------

            const finalAdmissionNumber =
                (
                    admissionNumber ||
                    admissionNo ||
                    ""
                ).trim();


            const finalFirstName =
                (
                    firstName ||
                    name ||
                    ""
                ).trim();


            const finalLastName =
                (
                    lastName ||
                    ""
                ).trim();


            const finalDateOfBirth =
                dateOfBirth ||
                dob ||
                null;


            const finalGuardianName =
                guardianName ||
                fatherName ||
                "";


            // -------------------------------------------------
            // REQUIRED FIELDS
            // -------------------------------------------------

            if (
                !finalAdmissionNumber ||
                !finalFirstName ||
                !email ||
                !password
            ) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Admission number, name, email and password are required."

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
            // DUPLICATE ADMISSION NUMBER
            // -------------------------------------------------

            const existingStudent =
                await Student.findOne({

                    $or: [
                        {
                            admissionNumber:
                                finalAdmissionNumber
                        },
                        {
                            admissionNo:
                                finalAdmissionNumber
                        }
                    ]

                });


            if (existingStudent) {

                return res.status(409).json({

                    success: false,

                    message:
                        "Admission number already exists."

                });

            }


            // -------------------------------------------------
            // DUPLICATE EMAIL
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
                        `${finalFirstName} ${finalLastName}`.trim(),

                    email:
                        email.toLowerCase().trim(),

                    password:
                        hashedPassword,

                    role:
                        "student",

                    phone:
                        phone || "",

                    isActive:
                        true

                });


            // -------------------------------------------------
            // CREATE STUDENT
            // -------------------------------------------------

            try {

                const student =
                    await Student.create({

                        user:
                            user._id,

                        admissionNumber:
                            finalAdmissionNumber,

                        firstName:
                            finalFirstName,

                        lastName:
                            finalLastName,

                        dateOfBirth:
                            finalDateOfBirth,

                        gender:
                            gender || "",

                        phone:
                            phone || "",

                        email:
                            email.toLowerCase().trim(),

                        address:
                            address || "",

                        city:
                            city || "",

                        state:
                            state || "",

                        pincode:
                            pincode || "",

                        section:
                            section || "",

                        rollNumber:
                            rollNumber || "",

                        admissionDate:
                            admissionDate ||
                            new Date(),

                        guardianName:
                            finalGuardianName,

                        guardianPhone:
                            guardianPhone || "",

                        guardianRelation:
                            guardianRelation || "",

                        bloodGroup:
                            bloodGroup || "",

                        status:
                            "active"

                    });


                return res.status(201).json({

                    success: true,

                    message:
                        "Student created successfully.",

                    data:
                        normalizeStudent(student)

                });


            } catch (studentError) {

                await User.findByIdAndDelete(
                    user._id
                );

                throw studentError;

            }

        } catch (error) {

            console.error(
                "Create Student Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to create student."

            });

        }

    }
);


// =====================================================
// UPDATE STUDENT
// =====================================================

router.put(
    "/:id",
    async function (req, res) {

        try {

            const student =
                await Student.findById(
                    req.params.id
                );


            if (!student) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Student not found."

                });

            }


            const {

                admissionNumber,
                admissionNo,

                firstName,
                name,

                lastName,

                dateOfBirth,
                dob,

                gender,
                phone,
                email,

                address,

                city,
                state,
                pincode,

                section,
                rollNumber,

                admissionDate,

                fatherName,
                motherName,

                guardianName,
                guardianPhone,
                guardianRelation,

                bloodGroup,
                status

            } = req.body;


            // -------------------------------------------------
            // UPDATE ADMISSION NUMBER
            // -------------------------------------------------

            if (
                admissionNumber !== undefined ||
                admissionNo !== undefined
            ) {

                const newAdmissionNumber =
                    (
                        admissionNumber ||
                        admissionNo ||
                        ""
                    ).trim();


                if (newAdmissionNumber) {

                    student.admissionNumber =
                        newAdmissionNumber;

                }

            }


            // -------------------------------------------------
            // UPDATE NAME
            // -------------------------------------------------

            if (
                firstName !== undefined ||
                name !== undefined
            ) {

                student.firstName =
                    (
                        firstName ||
                        name ||
                        ""
                    ).trim();

            }


            if (lastName !== undefined) {

                student.lastName =
                    lastName.trim();

            }


            // -------------------------------------------------
            // UPDATE DOB
            // -------------------------------------------------

            if (
                dateOfBirth !== undefined ||
                dob !== undefined
            ) {

                student.dateOfBirth =
                    dateOfBirth ||
                    dob ||
                    null;

            }


            // -------------------------------------------------
            // OTHER FIELDS
            // -------------------------------------------------

            if (gender !== undefined) {

                student.gender =
                    gender;

            }


            if (phone !== undefined) {

                student.phone =
                    phone;

            }


            if (email !== undefined) {

                student.email =
                    email.toLowerCase().trim();

            }


            if (address !== undefined) {

                student.address =
                    address;

            }


            if (city !== undefined) {

                student.city =
                    city;

            }


            if (state !== undefined) {

                student.state =
                    state;

            }


            if (pincode !== undefined) {

                student.pincode =
                    pincode;

            }


            if (section !== undefined) {

                student.section =
                    section;

            }


            if (rollNumber !== undefined) {

                student.rollNumber =
                    rollNumber;

            }


            if (admissionDate !== undefined) {

                student.admissionDate =
                    admissionDate;

            }


            if (
                guardianName !== undefined ||
                fatherName !== undefined
            ) {

                student.guardianName =
                    guardianName ||
                    fatherName ||
                    "";

            }


            if (guardianPhone !== undefined) {

                student.guardianPhone =
                    guardianPhone;

            }


            if (guardianRelation !== undefined) {

                student.guardianRelation =
                    guardianRelation;

            }


            if (bloodGroup !== undefined) {

                student.bloodGroup =
                    bloodGroup;

            }


            if (status !== undefined) {

                student.status =
                    status;

            }


            await student.save();


            // -------------------------------------------------
            // UPDATE USER
            // -------------------------------------------------

            if (student.user) {

                const user =
                    await User.findById(
                        student.user
                    );


                if (user) {

                    user.name =
                        `${student.firstName} ${student.lastName || ""}`.trim();


                    if (email !== undefined) {

                        user.email =
                            email.toLowerCase().trim();

                    }


                    if (phone !== undefined) {

                        user.phone =
                            phone;

                    }


                    if (status !== undefined) {

                        user.isActive =
                            status === "active";

                    }


                    await user.save();

                }

            }


            return res.json({

                success: true,

                message:
                    "Student updated successfully.",

                data:
                    normalizeStudent(student)

            });

        } catch (error) {

            console.error(
                "Update Student Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to update student."

            });

        }

    }
);


// =====================================================
// DELETE STUDENT
// =====================================================

router.delete(
    "/:id",
    async function (req, res) {

        try {

            const student =
                await Student.findById(
                    req.params.id
                );


            if (!student) {

                return res.status(404).json({

                    success: false,

                    message:
                        "Student not found."

                });

            }


            // Delete linked user
            if (student.user) {

                await User.findByIdAndDelete(
                    student.user
                );

            }


            // Delete student
            await Student.findByIdAndDelete(
                req.params.id
            );


            return res.json({

                success: true,

                message:
                    "Student deleted successfully."

            });

        } catch (error) {

            console.error(
                "Delete Student Error:",
                error
            );


            return res.status(500).json({

                success: false,

                message:
                    "Unable to delete student."

            });

        }

    }
);


module.exports = router;