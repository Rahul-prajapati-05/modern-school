require("dotenv").config();

const express = require("express");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const connectDatabase = require("./db");

const authRoutes = require("./authRoutes");
const studentRoutes = require("./studentRoutes");
const teacherRoutes = require("./teacherRoutes");


const User = require("./User");




const classRoutes = require("./classRoutes");
const subjectRoutes = require("./subjectRoutes");
const attendanceRoutes = require("./attendanceRoutes");
const examRoutes = require("./examRoutes");
const resultRoutes = require("./resultRoutes");
const feeRoutes = require("./feeRoutes");
const timetableRoutes = require("./timetableRoutes");
const homeworkRoutes = require("./homeworkRoutes");
const noticeRoutes = require("./noticeRoutes");
const libraryRoutes = require("./libraryRoutes");
const transportRoutes = require("./transportRoutes");
const routeRoutes =
    require("./routeRoutes");
const payrollRoutes = require("./payrollRoutes"); 
const hostelRoutes = require("./hostelRoutes");  
const leaveRoutes = require("./leaveRoutes");
const inventoryRoutes = require("./inventoryRoutes");
console.log("🔥 LOADED LEAVE ROUTES FROM:", require.resolve("./leaveRoutes"));



const app = express();

const PORT = process.env.PORT || 5000;
// =====================================================
// PDF UPLOAD SETUP
// =====================================================

const uploadDir = path.join(__dirname, "uploads", "homework");

const fs = require("fs");

if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, {
        recursive: true
    });
}


const storage = multer.diskStorage({

    destination: function (req, file, cb) {

        cb(null, uploadDir);

    },

    filename: function (req, file, cb) {

        const uniqueName =
            Date.now() +
            "-" +
            file.originalname
                .replace(/\s+/g, "-");

        cb(
            null,
            uniqueName
        );

    }

});


const homeworkUpload =
    multer({

        storage: storage,

        fileFilter: function (
            req,
            file,
            cb
        ) {

            if (
                file.mimetype ===
                "application/pdf"
            ) {

                cb(null, true);

            } else {

                cb(
                    new Error(
                        "Only PDF files are allowed."
                    )
                );

            }

        }

    });


// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());

app.use(express.json());

app.use(
    express.urlencoded({
        extended: true
    })
);


// =====================================================
// STATIC FILES
// =====================================================

app.use(
    express.static(__dirname)
);
app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);


// =====================================================
// API ROUTES
// =====================================================

app.use(
    "/api/auth",
    authRoutes
);

app.use(
    "/api/students",
    studentRoutes
);

app.use(
    "/api/teachers",
    teacherRoutes
);
app.use(
    "/api/classes",
    classRoutes
);
app.use(
    "/api/subjects",
    subjectRoutes
);
app.use(
    "/api/attendance",
    attendanceRoutes

);
app.use(
    "/api/exams",
    examRoutes
);
app.use(
    "/api/results",
    resultRoutes
);
app.use(
    "/api/fees",
    feeRoutes
);
app.use("/api/timetable", timetableRoutes);
app.use("/api/homework", homeworkRoutes(homeworkUpload));
app.use("/api/notices", noticeRoutes);
app.use("/api/library", libraryRoutes);
app.use("/api/transport", transportRoutes);
app.use(
    "/api/routes",
    routeRoutes
);
app.use(
    "/api/payroll",
    payrollRoutes
);
app.use(
    "/api/hostels",
    hostelRoutes
);

app.use("/api/inventory", inventoryRoutes);





app.get("/api/users", async function (req, res) {

    try {

        const users = await User.find()
            .select("-password");

        res.json({
            success: true,
            data: users
        });

    } catch (error) {

        console.error(
            "Get Users Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Unable to fetch users."
        });

    }

});




app.use(
    "/api/leaves",
    function (req, res, next) {

        console.log(
            "🔥 LEAVE REQUEST:",
            req.method,
            req.originalUrl
        );

        next();

    },
    leaveRoutes
);


// =====================================================
// HEALTH CHECK
// =====================================================

app.get(
    "/api/health",
    function (req, res) {

        res.json({
            success: true,
            message:
                "School Management System Server is Running"
        });

    }
);


// =====================================================
// HOME PAGE
// =====================================================

app.get(
    "/",
    function (req, res) {

        res.sendFile(
            path.join(
                __dirname,
                "index.html"
            )
        );

    }
);


// =====================================================
// LOGIN PAGE
// =====================================================

app.get(
    "/login",
    function (req, res) {

        res.sendFile(
            path.join(
                __dirname,
                "login.html"
            )
        );

    }
);


// =====================================================
// REGISTER PAGE
// =====================================================

app.get(
    "/register",
    function (req, res) {

        res.sendFile(
            path.join(
                __dirname,
                "register.html"
            )
        );

    }
);


// =====================================================
// ADMIN PAGE
// =====================================================

app.get(
    "/admin",
    function (req, res) {

        res.sendFile(
            path.join(
                __dirname,
                "admin.html"
            )
        );

    }
);


// =====================================================
// 404 HANDLER
// =====================================================

app.use(
    function (req, res) {

        res.status(404).json({

            success: false,

            message:
                "Route not found"

        });

    }
);


// =====================================================
// START SERVER
// =====================================================

async function startServer() {

    try {

        await connectDatabase();

        app.listen(
            PORT,
            function () {

                console.log(
                    "===================================="
                );

                console.log(
                    "My Modern School"
                );

                console.log(
                    `Server running at http://localhost:${PORT}`
                );

                console.log(
                    "Authentication API connected"
                );

                console.log(
                    "Student API connected"
                );

                console.log(
                    "Teacher API connected"
                );
                console.log(
    "Class API connected"
);
console.log(
    "Subject API connected"
);
console.log(
    "Attendance API connected"
);
console.log(
    "Exam API connected"
);
console.log(
    "Result API connected"
);
console.log("fees api connected");
console.log("Timetable API connected");
console.log("Homework API connected");
console.log("Notice API connected");
console.log("Library API connected");

                console.log(
                    "===================================="
                );
                

            }
        );

    } catch (error) {

        console.error(
            "Server Startup Error:",
            error.message
        );

        process.exit(1);

    }

}


startServer();