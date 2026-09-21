const mongoose = require("mongoose");

async function fixIndex() {

    try {

        await mongoose.connect(
            "mongodb://127.0.0.1:27017/school_management"
        );

        console.log(
            "MongoDB Connected"
        );

        const db =
            mongoose.connection.db;

        const result =
            await db
                .collection("students")
                .dropIndex("admissionNo_1");

        console.log(
            "Index deleted successfully:",
            result
        );

        await mongoose.disconnect();

    } catch (error) {

        console.error(
            "Index Delete Error:",
            error.message
        );

    }

}

fixIndex();