const bcrypt = require("bcryptjs");
const User = require("./User");

/**
 * Ensures a default Super Admin account exists in the database.
 * If not present, it will automatically create one using ADMIN_EMAIL and ADMIN_PASSWORD
 * from environment variables or defaults.
 */
async function initAdmin() {
    try {
        const adminEmail = (process.env.ADMIN_EMAIL || "admin@myschool.com").toLowerCase().trim();
        const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";
        const adminName = process.env.ADMIN_NAME || "Super Administrator";

        const existingAdmin = await User.findOne({ email: adminEmail });

        if (!existingAdmin) {
            const hashedPassword = await bcrypt.hash(adminPassword, 12);

            await User.create({
                name: adminName,
                email: adminEmail,
                password: hashedPassword,
                role: "superadmin",
                phone: "",
                isActive: true
            });

            console.log("====================================");
            console.log("👑 DEFAULT SUPER ADMIN INITIALIZED");
            console.log("Email:    " + adminEmail);
            console.log("Password: " + adminPassword);
            console.log("Role:     superadmin");
            console.log("====================================");
        } else {
            console.log("👑 Super Admin account ready: " + existingAdmin.email);
        }
    } catch (error) {
        console.error("⚠️ Default Admin initialization notice:", error.message);
    }
}

module.exports = initAdmin;
