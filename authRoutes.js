const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const User = require("./User");

const router = express.Router();


// =====================================================
// REGISTER
// =====================================================

router.post("/register", async function (req, res) {

    try {

        const {
            name,
            email,
            password,
            role,
            phone
        } = req.body;


        // Required fields
        if (!name || !email || !password || !role) {

            return res.status(400).json({
                success: false,
                message:
                    "Name, email, password and role are required."
            });

        }


        // Password length
        if (password.length < 6) {

            return res.status(400).json({
                success: false,
                message:
                    "Password must be at least 6 characters."
            });

        }


        // Admin cannot be created through public registration
        const allowedRoles = [
            "student",
            "teacher",
            "parent"
        ];

        if (!allowedRoles.includes(role)) {

            return res.status(400).json({
                success: false,
                message:
                    "Invalid registration role."
            });

        }


        // Check existing user
        const existingUser =
            await User.findOne({
                email: email.toLowerCase().trim()
            });


        if (existingUser) {

            return res.status(409).json({
                success: false,
                message:
                    "An account with this email already exists."
            });

        }


        // Hash password
        const hashedPassword =
            await bcrypt.hash(password, 12);


        // Create user
        const user =
            await User.create({

                name: name.trim(),

                email:
                    email.toLowerCase().trim(),

                password: hashedPassword,

                role: role,

                phone: phone || "",

                isActive: true

            });


        return res.status(201).json({

            success: true,

            message:
                "Account created successfully.",

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });

    } catch (error) {

        console.error(
            "Register Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to create account."

        });

    }

});


// =====================================================
// LOGIN
// =====================================================

router.post("/login", async function (req, res) {

    try {

        const {
            email,
            password
        } = req.body;


        if (!email || !password) {

            return res.status(400).json({

                success: false,

                message:
                    "Email and password are required."

            });

        }


        // Find user
        const user =
            await User.findOne({
                email: email.toLowerCase().trim()
            });


        if (!user) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password."

            });

        }


        // Check account status
        if (!user.isActive) {

            return res.status(403).json({

                success: false,

                message:
                    "Your account has been deactivated."

            });

        }


        // Compare password
        const passwordMatch =
            await bcrypt.compare(
                password,
                user.password
            );


        if (!passwordMatch) {

            return res.status(401).json({

                success: false,

                message:
                    "Invalid email or password."

            });

        }


        // JWT payload
        const token =
            jwt.sign(

                {
                    id: user._id.toString(),
                    email: user.email,
                    role: user.role
                },

                process.env.JWT_SECRET,

                {
                    expiresIn:
                        process.env.JWT_EXPIRES_IN ||
                        "7d"
                }

            );


        // Update last login
        user.lastLogin = new Date();

        await user.save();


        return res.json({

            success: true,

            message:
                "Login successful.",

            token: token,

            user: {

                id: user._id,

                name: user.name,

                email: user.email,

                role: user.role,

                phone: user.phone,

                profileImage:
                    user.profileImage

            }

        });

    } catch (error) {

        console.error(
            "Login Error:",
            error
        );

        return res.status(500).json({

            success: false,

            message:
                "Unable to login."

        });

    }

});


// =====================================================
// FORGOT PASSWORD
// =====================================================

router.post(
    "/forgot-password",
    async function (req, res) {

        try {

            const {
                email
            } = req.body;


            if (!email) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Email is required."

                });

            }


            const user =
                await User.findOne({
                    email:
                        email.toLowerCase().trim()
                });


            /*
             * For security, do not reveal whether
             * an email exists.
             */

            if (!user) {

                return res.json({

                    success: true,

                    message:
                        "If the account exists, password reset instructions have been sent."

                });

            }


            // Generate secure reset token
            const resetToken =
                crypto.randomBytes(32).toString("hex");


            // Hash token before storing
            const hashedToken =
                crypto
                    .createHash("sha256")
                    .update(resetToken)
                    .digest("hex");


            user.resetPasswordToken =
                hashedToken;


            // Token valid for 15 minutes
            user.resetPasswordExpires =
                new Date(
                    Date.now() +
                    15 * 60 * 1000
                );


            await user.save();


            /*
             * For development:
             * return reset URL in response.
             *
             * Production email sending will be
             * connected later through sendEmail.js.
             */

            const resetUrl =
                `/reset-password.html?token=${resetToken}`;


            return res.json({

                success: true,

                message:
                    "Password reset link generated.",

                resetUrl:
                    resetUrl

            });

        } catch (error) {

            console.error(
                "Forgot Password Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Unable to process password reset."

            });

        }

    }
);


// =====================================================
// RESET PASSWORD
// =====================================================

router.post(
    "/reset-password",
    async function (req, res) {

        try {

            const {
                token,
                password
            } = req.body;


            if (!token || !password) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Reset token and new password are required."

                });

            }


            if (password.length < 6) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Password must be at least 6 characters."

                });

            }


            // Hash incoming token
            const hashedToken =
                crypto
                    .createHash("sha256")
                    .update(token)
                    .digest("hex");


            // Find valid token
            const user =
                await User.findOne({

                    resetPasswordToken:
                        hashedToken,

                    resetPasswordExpires: {
                        $gt: new Date()
                    }

                });


            if (!user) {

                return res.status(400).json({

                    success: false,

                    message:
                        "Invalid or expired reset token."

                });

            }


            // Hash new password
            user.password =
                await bcrypt.hash(
                    password,
                    12
                );


            // Remove reset token
            user.resetPasswordToken =
                null;

            user.resetPasswordExpires =
                null;


            await user.save();


            return res.json({

                success: true,

                message:
                    "Password reset successfully."

            });

        } catch (error) {

            console.error(
                "Reset Password Error:",
                error
            );

            return res.status(500).json({

                success: false,

                message:
                    "Unable to reset password."

            });

        }

    }
);


module.exports = router;