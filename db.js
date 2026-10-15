const mongoose = require("mongoose");

async function connectDatabase() {
    try {
        const mongoURI = process.env.MONGODB_URI;

        if (!mongoURI) {
            throw new Error(
                "MONGODB_URI is not defined in environment variables. Please set MONGODB_URI in your .env or Render Dashboard Environment settings."
            );
        }

        if (
            (mongoURI.includes("127.0.0.1") || mongoURI.includes("localhost")) &&
            (process.env.RENDER || process.env.NODE_ENV === "production")
        ) {
            throw new Error(
                "Cannot connect to MongoDB at localhost / 127.0.0.1 on Render. Render instances do not host a local MongoDB database. Please configure MONGODB_URI with a cloud MongoDB connection string (e.g., MongoDB Atlas: mongodb+srv://...)."
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