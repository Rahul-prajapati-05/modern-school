require("dotenv").config();

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = require("./User");


// =====================================================
// CREATE SUPER ADMIN
// =====================================================

async function createAdmin() {

    try {

        // Connect MongoDB
        await mongoose.connect(
            process.env.MONGODB_URI
        );

        console.log(
            "MongoDB Connected"
        );


        const adminEmail =
            process.env.ADMIN_EMAIL ||
            "admin@myschool.com";

        const adminPassword =
            process.env.ADMIN_PASSWORD ||
            "Admin@12345";


        // Check existing admin
        const existingAdmin =
            await User.findOne({
                email: adminEmail.toLowerCase()
            });


        if (existingAdmin) {

            console.log(
                "Admin already exists."
            );

            console.log(
                "Email:",
                adminEmail
            );

            await mongoose.connection.close();

            return;

        }


        // Hash password
        const hashedPassword =
            await bcrypt.hash(
                adminPassword,
                12
            );


        // Create Super Admin
        const admin =
            await User.create({

                name:
                    "Super Administrator",

                email:
                    adminEmail.toLowerCase(),

                password:
                    hashedPassword,

                role:
                    "superadmin",

                phone:
                    "",

                isActive:
                    true

            });


        console.log(
            "===================================="
        );

        console.log(
            "SUPER ADMIN CREATED SUCCESSFULLY"
        );

        console.log(
            "===================================="
        );

        console.log(
            "Email:",
            admin.email
        );

        console.log(
            "Password:",
            adminPassword
        );

        console.log(
            "Role:",
            admin.role
        );

        console.log(
            "===================================="
        );


        await mongoose.connection.close();


    } catch (error) {

        console.error(
            "Create Admin Error:",
            error.message
        );

        process.exit(1);

    }

}


createAdmin();