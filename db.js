const mongoose = require("mongoose");

async function connectDatabase() {
    try {
        const mongoURI = process.env.MONGODB_URI;

        if (!mongoURI) {
            throw new Error(
                "MONGODB_URI is not defined in .env file"
            );
        }

        await mongoose.connect(mongoURI);

        console.log(
            "MongoDB Connected Successfully"
        );

    } catch (error) {

        console.error(
            "MongoDB Connection Error:",
            error.message
        );

        throw error;
    }
}

module.exports = connectDatabase;