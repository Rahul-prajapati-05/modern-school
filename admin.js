document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // ELEMENTS
    // =====================================================

    const menuItems = document.querySelectorAll(".menu-item");
    const quickCards = document.querySelectorAll(".quick-card");

    const dashboardSection =
        document.getElementById("dashboardSection");

    const moduleSection =
        document.getElementById("moduleSection");

    const pageTitle =
        document.getElementById("pageTitle");

    const pageSubtitle =
        document.getElementById("pageSubtitle");

    const moduleLabel =
        document.getElementById("moduleLabel");

    const moduleTitle =
        document.getElementById("moduleTitle");

    const moduleDescription =
        document.getElementById("moduleDescription");

    const moduleContent =
        document.getElementById("moduleContent");

    const moduleAddButton =
        document.getElementById("moduleAddButton");

    const logoutButton =
        document.getElementById("logoutButton");

    const themeToggle =
        document.getElementById("themeToggle");

    const notificationButton =
        document.getElementById("notificationButton");

    const toast =
        document.getElementById("toast");

    const adminName =
        document.getElementById("adminName");

    const welcomeAdminName =
        document.getElementById("welcomeAdminName");


    // =====================================================
    // MODULE INFORMATION
    // =====================================================

    const modules = {

        students: {
            title: "Students",
            label: "STUDENT MANAGEMENT",
            description:
                "Add, edit, search and manage students.",
            icon: "👨‍🎓"
        },

        teachers: {
            title: "Teachers",
            label: "TEACHER MANAGEMENT",
            description:
                "Add, edit, search and manage teachers.",
            icon: "👩‍🏫"
        },

        parents: {
            title: "Parents",
            label: "PARENT MANAGEMENT",
            description:
                "Manage parents and link their children.",
            icon: "👨‍👩‍👧"
        },

        classes: {
            title: "Classes & Sections",
            label: "CLASS MANAGEMENT",
            description:
                "Create classes, sections and assign class teachers.",
            icon: "🏫"
        },

        subjects: {
            title: "Subjects",
            label: "SUBJECT MANAGEMENT",
            description:
                "Manage subjects and teacher assignments.",
            icon: "📚"
        },

        attendance: {
            title: "Attendance",
            label: "ATTENDANCE MANAGEMENT",
            description:
                "Manage student and teacher attendance.",
            icon: "✅"
        },

        exams: {
            title: "Exams & Results",
            label: "EXAM MANAGEMENT",
            description:
                "Create exams, enter marks and manage results.",
            icon: "📝"
        },

        fees: {
            title: "Fees",
            label: "FEE MANAGEMENT",
            description:
                "Manage fee structures, payments and receipts.",
            icon: "💰"
        },

        timetable: {
            title: "Timetable",
            label: "TIMETABLE MANAGEMENT",
            description:
                "Create and manage class and teacher timetables.",
            icon: "🕐"
        },

        homework: {
            title: "Homework",
            label: "HOMEWORK MANAGEMENT",
            description:
                "Create and manage homework and assignments.",
            icon: "📖"
        },

        notices: {
            title: "Notices",
            label: "NOTICE MANAGEMENT",
            description:
                "Create and publish school announcements.",
            icon: "📢"
        },

        library: {
            title: "Library",
            label: "LIBRARY MANAGEMENT",
            description:
                "Manage books, issues, returns and fines.",
            icon: "📚"
        },

        transport: {
            title: "Transport",
            label: "TRANSPORT MANAGEMENT",
            description:
                "Manage buses, routes, drivers and students.",
            icon: "🚌"
        },

        hostel: {
            title: "Hostel",
            label: "HOSTEL MANAGEMENT",
            description:
                "Manage hostels, rooms and student allocation.",
            icon: "🏠"
        },

        inventory: {
            title: "Inventory",
            label: "INVENTORY MANAGEMENT",
            description:
                "Manage stock, purchases and inventory items.",
            icon: "📦"
        },

        leave: {
            title: "Leave",
            label: "LEAVE MANAGEMENT",
            description:
                "Approve, reject and manage leave requests.",
            icon: "🗓️"
        },

        payroll: {
            title: "Payroll",
            label: "PAYROLL MANAGEMENT",
            description:
                "Manage salaries, deductions and payslips.",
            icon: "💼"
        },

        certificates: {
            title: "Certificates",
            label: "CERTIFICATE MANAGEMENT",
            description:
                "Generate and manage school certificates.",
            icon: "📄"
        },

        reports: {
            title: "Reports",
            label: "REPORT MANAGEMENT",
            description:
                "View and export school reports.",
            icon: "📊"
        },

        users: {
            title: "Users & Permissions",
            label: "USER MANAGEMENT",
            description:
                "Manage users, roles and permissions.",
            icon: "👥"
        },

        settings: {
            title: "Settings",
            label: "SCHOOL SETTINGS",
            description:
                "Manage school information and system settings.",
            icon: "⚙️"
        }

    };


    let currentModule = "dashboard";


    // =====================================================
    // AUTHENTICATION
    // =====================================================

    function checkAuthentication() {

        const token =
            localStorage.getItem("school_auth_token");

        if (!token) {

            window.location.href = "/login";

            return false;
        }

        return true;
    }


    // =====================================================
    // USER INFORMATION
    // =====================================================

    function getLoggedInUser() {

        try {

            const savedUser =
                localStorage.getItem("school_user");

            if (!savedUser) {
                return null;
            }

            return JSON.parse(savedUser);

        } catch (error) {

            console.error(
                "User data error:",
                error
            );

            return null;
        }
    }


    function formatRole(role) {

        return String(role || "Admin")
            .replace(/_/g, " ")
            .replace(/\b\w/g, function (letter) {
                return letter.toUpperCase();
            });
    }


    function loadAdminInformation() {

        const user =
            getLoggedInUser();

        if (!user) {
            return;
        }

        const name =
            user.name || "School Administrator";

        if (adminName) {
            adminName.textContent = name;
        }

        if (welcomeAdminName) {
            welcomeAdminName.textContent = name;
        }

        const adminRole =
            document.getElementById("adminRole");

        if (adminRole) {
            adminRole.textContent =
                formatRole(user.role);
        }
    }


    // =====================================================
    // TOAST
    // =====================================================

    let toastTimer;

    function showToast(message) {

        if (!toast) {
            return;
        }

        toast.textContent = message;

        toast.classList.add("show");

        clearTimeout(toastTimer);

        toastTimer = setTimeout(function () {

            toast.classList.remove("show");

        }, 2500);
    }


    // =====================================================
    // ACTIVE MENU
    // =====================================================

    function setActiveMenu(section) {

        menuItems.forEach(function (item) {

            item.classList.toggle(
                "active",
                item.dataset.section === section
            );

        });
    }


    // =====================================================
    // DASHBOARD
    // =====================================================

    function showDashboard() {

        currentModule = "dashboard";

        dashboardSection.classList.add(
            "active-section"
        );

        moduleSection.classList.remove(
            "active-section"
        );

        pageTitle.textContent =
            "Dashboard";

        pageSubtitle.textContent =
            "School overview";

        setActiveMenu("dashboard");

        loadStudentCount();




        loadTeacherCount();





        loadClassCount();




        loadUserCount();




        loadFeeCollection();




    }


    // =====================================================
    // SHOW MODULE
    // =====================================================

    function showModule(section) {



console.log("MODULE CLICKED:", section);







        const module =
            modules[section];

        if (!module) {

            showToast(
                "Module not available."
            );

            return;
        }

        currentModule = section;










       

const libraryIssueButton =
    document.getElementById("libraryIssueButton");

if (libraryIssueButton) {
    libraryIssueButton.style.display =
        section === "library" ? "inline-block" : "none";
}




//         moduleAddButton.textContent = "+ Add";
// moduleAddButton.onclick = null;







        dashboardSection.classList.remove(
            "active-section"
        );

        moduleSection.classList.add(
            "active-section"
        );

        pageTitle.textContent =
            module.title;

        pageSubtitle.textContent =
            "School management";

        moduleLabel.textContent =
            module.label;

        moduleTitle.textContent =
            module.title;

        moduleDescription.textContent =
            module.description;

        setActiveMenu(section);





    





   

// if (
//     section !== "timetable" &&
//     section !== "homework" &&
//     section !== "notices" &&
//     section !== "library" &&
//     section !== "transport" &&
//     section !== "payroll"
// ) {
//     moduleAddButton.textContent = "+ Add";
//     moduleAddButton.onclick = null;
// }





        // -------------------------------------------------
        // STUDENTS
        // -------------------------------------------------

        if (section === "students") {

            loadStudents();

            return;
        }
        // -------------------------------------------------
// TEACHERS
// -------------------------------------------------

if (section === "teachers") {

    loadTeachers();

    return;
}
// -------------------------------------------------
// CLASSES
// -------------------------------------------------

if (section === "classes") {

    loadClasses();

    return;
}

if (section === "subjects") {

    loadSubjects();

    return;
}
// -------------------------------------------------
// ATTENDANCE
// -------------------------------------------------

if (section === "attendance") {

    loadAttendance();

    return;
}
if (section === "exams") {

    loadExams();

    return;
}
if (section === "fees") {

    loadFees();

    return;
}
if (section === "timetable") {
    loadTimetable();
    return;
}
if (section === "homework") {
    loadHomework();
    return;
}
if (section === "notices") {
    loadNotices();
    return;
}
if (section === "leave") {

    loadLeave();

    return;
}

if (section === "library") {
    loadLibrary();
    return;
}
if (section === "transport") {

    loadTransport();

    return;
}
// -------------------------------------------------
// PAYROLL
// -------------------------------------------------

if (section === "payroll") {

    loadPayroll();

    return;
}
// -------------------------------------------------
// HOSTEL
// -------------------------------------------------

if (section === "hostel") {

    loadHostels();

    return;
}





// -------------------------------------------------
// INVENTORY
// -------------------------------------------------

if (section === "inventory") {

    loadInventory();

    return;
}








        // -------------------------------------------------
        // OTHER MODULES
        // -------------------------------------------------

        renderComingSoon(section);
    }


// =====================================================
// LOAD LEAVE MANAGEMENT
// =====================================================

async function loadLeave() {

    moduleAddButton.textContent = "+ Add Leave";

    moduleAddButton.onclick = function () {
        showAddLeaveForm();
    };

    moduleContent.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">🗓️</div>
            <h3>Loading Leave Applications...</h3>
            <p>Please wait.</p>
        </div>
    `;

    try {

        const response = await fetch("/api/leaves");

        const leaveTypesResponse =
    await fetch("/api/leaves/types/all");

const leaveTypesResult =
    await leaveTypesResponse.json();

if (
    !leaveTypesResponse.ok ||
    !leaveTypesResult.success
) {
    throw new Error(
        leaveTypesResult.message ||
        "Unable to load leave types."
    );
}

const leaveTypes =
    leaveTypesResult.data || [];



        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.message || "Unable to load leaves."
            );
        }

        // =============================================
        // SEPARATE STUDENT & TEACHER LEAVES
        // =============================================

        const studentLeaves = result.data.filter(function (leave) {
            return leave.applicantType === "Student";
        });

        const teacherLeaves = result.data.filter(function (leave) {
            return leave.applicantType === "Teacher";
        });


        // =============================================
        // STUDENT TABLE
        // =============================================

        const studentTable = studentLeaves.length
            ? `
                <div class="table-container" style="margin-bottom:30px;">

                    <div class="table-header">
                        <h2>Student Leave Applications</h2>
                    </div>

                    <div class="table-wrapper">

                        <table class="data-table">

                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th>Class</th>
                                    <th>Roll No.</th>
                                    <th>Leave Type</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Days</th>
                                    <th>Reason</th>
                                    <th>PDF</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>

                                ${studentLeaves.map(function (leave) {

                                    const fromDate =
                                        new Date(
                                            leave.fromDate
                                        ).toLocaleDateString("en-IN");

                                    const toDate =
                                        new Date(
                                            leave.toDate
                                        ).toLocaleDateString("en-IN");


                                    let statusClass = "status-pending";

                                    if (leave.status === "Approved") {
                                        statusClass = "status-approved";
                                    } else if (leave.status === "Rejected") {
                                        statusClass = "status-rejected";
                                    }


                                    return `
                                        <tr>

                                            <td>
                                                ${leave.applicantName || "-"}
                                            </td>

                                            <td>
                                                ${leave.className || "-"}
                                            </td>

                                            <td>
                                                ${leave.rollNumber || "-"}
                                            </td>

                                            <td>
                                                ${leave.leaveType || "-"}
                                            </td>

                                            <td>
                                                ${fromDate}
                                            </td>

                                            <td>
                                                ${toDate}
                                            </td>

                                            <td>
                                                ${leave.totalDays || 0}
                                            </td>

                                            <td>
                                                ${leave.reason || "-"}
                                            </td>

                                            <td>

                                                ${
                                                    leave.applicationPdf &&
                                                    leave.applicationPdf.filePath

                                                    ?

                                                    `
                                                    <a
                                                        href="${leave.applicationPdf.filePath}"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        class="action-btn"
                                                    >
                                                        📄 View PDF
                                                    </a>
                                                    `

                                                    :

                                                    `
                                                    <span>No PDF</span>
                                                    `
                                                }

                                            </td>

                                            <td>

                                                <span class="${statusClass}">
                                                    ${leave.status}
                                                </span>

                                            </td>

                                            <td>

                                                ${
                                                    leave.status === "Pending"

                                                    ?

                                                    `
                                                    <button
                                                        class="action-btn"
                                                        onclick="approveLeave('${leave._id}')"
                                                    >
                                                        ✓ Approve
                                                    </button>

                                                    <button
                                                        class="action-btn"
                                                        onclick="rejectLeave('${leave._id}')"
                                                    >
                                                        ✕ Reject
                                                    </button>
                                                    `

                                                    :

                                                    `
                                                    <span>Completed</span>
                                                    `
                                                }

                                            </td>

                                        </tr>
                                    `;

                                }).join("")}

                            </tbody>

                        </table>

                    </div>

                </div>
            `

            :

            `
                <div class="table-container" style="margin-bottom:30px;">

                    <div class="empty-state">

                        <div class="empty-icon">🎓</div>

                        <h3>No Student Leave Applications</h3>

                        <p>No student leave application found.</p>

                    </div>

                </div>
            `;


        // =============================================
        // TEACHER TABLE
        // =============================================

        const teacherTable = teacherLeaves.length
            ? `
                <div class="table-container">

                    <div class="table-header">
                        <h2>Teacher Leave Applications</h2>
                    </div>

                    <div class="table-wrapper">

                        <table class="data-table">

                            <thead>

                                <tr>
                                    <th>Teacher</th>
                                    <th>Department</th>
                                    <th>Leave Type</th>
                                    <th>From</th>
                                    <th>To</th>
                                    <th>Days</th>
                                    <th>Reason</th>
                                    <th>PDF</th>
                                    <th>Status</th>
                                    <th>Action</th>
                                </tr>

                            </thead>

                            <tbody>

                                ${teacherLeaves.map(function (leave) {

                                    const fromDate =
                                        new Date(
                                            leave.fromDate
                                        ).toLocaleDateString("en-IN");

                                    const toDate =
                                        new Date(
                                            leave.toDate
                                        ).toLocaleDateString("en-IN");


                                    let statusClass = "status-pending";

                                    if (leave.status === "Approved") {
                                        statusClass = "status-approved";
                                    } else if (leave.status === "Rejected") {
                                        statusClass = "status-rejected";
                                    }


                                    return `
                                        <tr>

                                            <td>
                                                ${leave.applicantName || "-"}
                                            </td>

                                            <td>
                                                ${leave.department || "-"}
                                            </td>

                                            <td>
                                                ${leave.leaveType || "-"}
                                            </td>

                                            <td>
                                                ${fromDate}
                                            </td>

                                            <td>
                                                ${toDate}
                                            </td>

                                            <td>
                                                ${leave.totalDays || 0}
                                            </td>

                                            <td>
                                                ${leave.reason || "-"}
                                            </td>

                                            <td>

                                                ${
                                                    leave.applicationPdf &&
                                                    leave.applicationPdf.filePath

                                                    ?

                                                    `
                                                    <a
                                                        href="${leave.applicationPdf.filePath}"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        class="action-btn"
                                                    >
                                                        📄 View PDF
                                                    </a>
                                                    `

                                                    :

                                                    `
                                                    <span>No PDF</span>
                                                    `
                                                }

                                            </td>

                                            <td>

                                                <span class="${statusClass}">
                                                    ${leave.status}
                                                </span>

                                            </td>

                                            <td>

                                                ${
                                                    leave.status === "Pending"

                                                    ?

                                                    `
                                                    <button
                                                        class="action-btn"
                                                        onclick="approveLeave('${leave._id}')"
                                                    >
                                                        ✓ Approve
                                                    </button>

                                                    <button
                                                        class="action-btn"
                                                        onclick="rejectLeave('${leave._id}')"
                                                    >
                                                        ✕ Reject
                                                    </button>
                                                    `

                                                    :

                                                    `
                                                    <span>Completed</span>
                                                    `
                                                }

                                            </td>

                                        </tr>
                                    `;

                                }).join("")}

                            </tbody>

                        </table>

                    </div>

                </div>
            `

            :

            `
                <div class="table-container">

                    <div class="empty-state">

                        <div class="empty-icon">👩‍🏫</div>

                        <h3>No Teacher Leave Applications</h3>

                        <p>No teacher leave application found.</p>

                    </div>

                </div>
            `;




            // =============================================
// LEAVE TYPES TABLE
// =============================================

const leaveTypesTable = `
    <div
        class="table-container"
        style="
            margin-top:30px;
            margin-bottom:30px;
        "
    >

        <div
            class="table-header"
            style="
                display:flex;
                justify-content:space-between;
                align-items:center;
            "
        >

            <h2>Leave Types</h2>

            <button
                class="action-btn"
                onclick="showAddLeaveTypeForm()"
            >
                + Add Leave Type
            </button>

        </div>

        <div class="table-wrapper">

            <table class="data-table">

                <thead>

                    <tr>
                        <th>Leave Type</th>
                        <th>Description</th>
                        <th>Maximum Days</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>

                </thead>

                <tbody>

                    ${
                        leaveTypes.length
                            ?

                            leaveTypes.map(function (leaveType) {

                                const statusClass =
                                    leaveType.status === "Active"
                                        ? "status-approved"
                                        : "status-rejected";

                                return `
                                    <tr>

                                        <td>
                                            ${leaveType.leaveType || "-"}
                                        </td>

                                        <td>
                                            ${leaveType.description || "-"}
                                        </td>

                                        <td>
                                            ${leaveType.maximumDays || 0}
                                        </td>

                                        <td>
                                            <span class="${statusClass}">
                                                ${leaveType.status || "Active"}
                                            </span>
                                        </td>

                                        <td>

                                            <button
                                                class="action-btn"
                                                onclick="editLeaveType('${leaveType._id}')"
                                            >
                                                ✏️ Edit
                                            </button>

                                            <button
                                                class="action-btn"
                                                onclick="deleteLeaveType('${leaveType._id}')"
                                            >
                                                🗑️ Delete
                                            </button>

                                        </td>

                                    </tr>
                                `;

                            }).join("")

                            :

                            `
                                <tr>

                                    <td
                                        colspan="5"
                                        style="
                                            text-align:center;
                                            padding:30px;
                                        "
                                    >
                                        No Leave Types Found
                                    </td>

                                </tr>
                            `
                    }

                </tbody>

            </table>

        </div>

    </div>
`;





        // =============================================
        // SHOW BOTH TABLES
        // =============================================

moduleContent.innerHTML = `

    <!-- =============================================
         LEAVE SUMMARY CARDS
    ============================================== -->

    <div
        style="
            display:grid;
            grid-template-columns:repeat(4, 1fr);
            gap:16px;
            margin-bottom:30px;
        "
    >

        <!-- TOTAL -->

        <div
            style="
                background:#ffffff;
                padding:20px;
                border-radius:12px;
                border:1px solid #e5e7eb;
                box-shadow:0 2px 8px rgba(0,0,0,0.06);
            "
        >

            <div style="font-size:14px; color:#666;">
                Total Leaves
            </div>

            <div
                style="
                    font-size:30px;
                    font-weight:700;
                    margin-top:8px;
                    color:#2563eb;
                "
            >
                ${result.data.length}
            </div>

        </div>


        <!-- PENDING -->

        <div
            style="
                background:#ffffff;
                padding:20px;
                border-radius:12px;
                border:1px solid #e5e7eb;
                box-shadow:0 2px 8px rgba(0,0,0,0.06);
            "
        >

            <div style="font-size:14px; color:#666;">
                Pending
            </div>

            <div
                style="
                    font-size:30px;
                    font-weight:700;
                    margin-top:8px;
                    color:#f59e0b;
                "
            >
                ${
                    result.data.filter(function (leave) {
                        return leave.status === "Pending";
                    }).length
                }
            </div>

        </div>


        <!-- APPROVED -->

        <div
            style="
                background:#ffffff;
                padding:20px;
                border-radius:12px;
                border:1px solid #e5e7eb;
                box-shadow:0 2px 8px rgba(0,0,0,0.06);
            "
        >

            <div style="font-size:14px; color:#666;">
                Approved
            </div>

            <div
                style="
                    font-size:30px;
                    font-weight:700;
                    margin-top:8px;
                    color:#22c55e;
                "
            >
                ${
                    result.data.filter(function (leave) {
                        return leave.status === "Approved";
                    }).length
                }
            </div>

        </div>


        <!-- REJECTED -->

        <div
            style="
                background:#ffffff;
                padding:20px;
                border-radius:12px;
                border:1px solid #e5e7eb;
                box-shadow:0 2px 8px rgba(0,0,0,0.06);
            "
        >

            <div style="font-size:14px; color:#666;">
                Rejected
            </div>

            <div
                style="
                    font-size:30px;
                    font-weight:700;
                    margin-top:8px;
                    color:#ef4444;
                "
            >
                ${
                    result.data.filter(function (leave) {
                        return leave.status === "Rejected";
                    }).length
                }
            </div>

        </div>

    </div>


    <!-- =============================================
         STUDENT + TEACHER TABLES
    ============================================== -->

   ${studentTable}

${teacherTable}

${leaveTypesTable}

`;


    } catch (error) {

        console.error(
            "Load Leave Error:",
            error
        );

        moduleContent.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">⚠️</div>

                <h3>Unable to Load Leaves</h3>

                <p>${error.message}</p>

            </div>

        `;
    }
}
// =====================================================
// SHOW ADD LEAVE FORM
// =====================================================

function showAddLeaveForm() {

    moduleContent.innerHTML = `

        <div class="form-container">

            <h2>Add Leave Application</h2>

            <form id="leaveForm">

                <div class="form-grid">

                    <!-- Applicant Type -->
                    <div class="form-group">

                        <label>Applicant Type</label>

                        <select
                            id="leaveApplicantType"
                            required
                            onchange="toggleLeaveApplicantFields()"
                        >

                            <option value="">
                                Select Applicant Type
                            </option>

                            <option value="Student">
                                Student
                            </option>

                            <option value="Teacher">
                                Teacher
                            </option>

                        </select>

                    </div>


                    <!-- Applicant ID -->
                    <div class="form-group">

                        <label>Applicant ID</label>

                        <input
                            type="text"
                            id="leaveApplicantId"
                            placeholder="Enter applicant ID"
                            required
                        >

                    </div>


                    <!-- Applicant Name -->
                    <div class="form-group">

                        <label>Name</label>

                        <input
                            type="text"
                            id="leaveApplicantName"
                            placeholder="Enter name"
                            required
                        >

                    </div>


                    <!-- Student Class -->
                    <div
                        class="form-group"
                        id="leaveClassGroup"
                        style="display:none;"
                    >

                        <label>Class</label>

                        <input
                            type="text"
                            id="leaveClassName"
                            placeholder="Enter class"
                        >

                    </div>


                    <!-- Student Roll Number -->
                    <div
                        class="form-group"
                        id="leaveRollGroup"
                        style="display:none;"
                    >

                        <label>Roll No.</label>

                        <input
                            type="text"
                            id="leaveRollNumber"
                            placeholder="Enter roll number"
                        >

                    </div>


                    <!-- Teacher Department -->
                    <div
                        class="form-group"
                        id="leaveDepartmentGroup"
                        style="display:none;"
                    >

                        <label>Department</label>

                        <input
                            type="text"
                            id="leaveDepartment"
                            placeholder="Enter department"
                        >

                    </div>


                    <!-- Leave Type -->
                    <div class="form-group">

                        <label>Leave Type</label>

                        <select
                            id="leaveType"
                            required
                        >

                            <option value="">
                                Select Leave Type
                            </option>

                            <option value="Sick Leave">
                                Sick Leave
                            </option>

                            <option value="Medical Leave">
                                Medical Leave
                            </option>

                            <option value="Casual Leave">
                                Casual Leave
                            </option>

                            <option value="Emergency Leave">
                                Emergency Leave
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>


                    <!-- From Date -->
                    <div class="form-group">

                        <label>From Date</label>

                        <input
                            type="date"
                            id="leaveFromDate"
                            required
                        >

                    </div>


                    <!-- To Date -->
                    <div class="form-group">

                        <label>To Date</label>

                        <input
                            type="date"
                            id="leaveToDate"
                            required
                        >

                    </div>


                    <!-- Total Days -->
                    <div class="form-group">

                        <label>Total Days</label>

                        <input
                            type="number"
                            id="leaveTotalDays"
                            min="1"
                            placeholder="Enter total days"
                            required
                        >

                    </div>


                    <!-- Reason -->
                    <div
                        class="form-group"
                        style="grid-column: 1 / -1;"
                    >

                        <label>Reason</label>

                        <textarea
                            id="leaveReason"
                            rows="4"
                            placeholder="Enter reason for leave"
                            required
                        ></textarea>

                    </div>


                    <!-- PDF -->
                    <div
                        class="form-group"
                        style="grid-column: 1 / -1;"
                    >

                        <label>
                            Leave Application PDF
                        </label>

                        <input
                            type="file"
                            id="leavePdf"
                            accept=".pdf,application/pdf"
                        >

                        <small>
                            Only PDF file allowed. Maximum 5 MB.
                        </small>

                    </div>

                </div>


                <!-- Buttons -->

                <div class="form-actions">

                    <button
                        type="submit"
                        class="btn-primary"
                    >
                        Submit Leave
                    </button>

                    <button
                        type="button"
                        class="btn-secondary"
                        onclick="loadLeave()"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    `;


    // Submit event

    document
        .getElementById("leaveForm")
        .addEventListener(
            "submit",
            saveLeaveApplication
        );
}

// =====================================================
// TOGGLE STUDENT / TEACHER FIELDS
// =====================================================

function toggleLeaveApplicantFields() {

    const type =
        document.getElementById(
            "leaveApplicantType"
        ).value;


    const classGroup =
        document.getElementById(
            "leaveClassGroup"
        );

    const rollGroup =
        document.getElementById(
            "leaveRollGroup"
        );

    const departmentGroup =
        document.getElementById(
            "leaveDepartmentGroup"
        );


    if (type === "Student") {

        classGroup.style.display = "block";

        rollGroup.style.display = "block";

        departmentGroup.style.display = "none";

    } else if (type === "Teacher") {

        classGroup.style.display = "none";

        rollGroup.style.display = "none";

        departmentGroup.style.display = "block";

    } else {

        classGroup.style.display = "none";

        rollGroup.style.display = "none";

        departmentGroup.style.display = "none";
    }
}

// =====================================================
// SAVE LEAVE APPLICATION
// =====================================================

async function saveLeaveApplication(event) {

    event.preventDefault();

    try {

        const applicantType =
            document.getElementById(
                "leaveApplicantType"
            ).value;

        const applicantId =
            document.getElementById(
                "leaveApplicantId"
            ).value.trim();

        const applicantName =
            document.getElementById(
                "leaveApplicantName"
            ).value.trim();

        const className =
            document.getElementById(
                "leaveClassName"
            ).value.trim();

        const rollNumber =
            document.getElementById(
                "leaveRollNumber"
            ).value.trim();

        const department =
            document.getElementById(
                "leaveDepartment"
            ).value.trim();

        const leaveType =
            document.getElementById(
                "leaveType"
            ).value;

        const fromDate =
            document.getElementById(
                "leaveFromDate"
            ).value;

        const toDate =
            document.getElementById(
                "leaveToDate"
            ).value;

        const totalDays =
            document.getElementById(
                "leaveTotalDays"
            ).value;

        const reason =
            document.getElementById(
                "leaveReason"
            ).value.trim();

        const pdfInput =
            document.getElementById(
                "leavePdf"
            );

        const pdfFile =
            pdfInput.files[0];


        // =============================================
        // BASIC VALIDATION
        // =============================================

        if (
            !applicantType ||
            !applicantId ||
            !applicantName ||
            !leaveType ||
            !fromDate ||
            !toDate ||
            !totalDays ||
            !reason
        ) {

            alert(
                "Please fill all required fields."
            );

            return;
        }


        // =============================================
        // PDF VALIDATION
        // =============================================

        if (pdfFile) {

            if (
                pdfFile.type !==
                "application/pdf"
            ) {

                alert(
                    "Only PDF files are allowed."
                );

                return;
            }


            if (
                pdfFile.size >
                5 * 1024 * 1024
            ) {

                alert(
                    "PDF file must be 5 MB or smaller."
                );

                return;
            }
        }


        // =============================================
        // DATE VALIDATION
        // =============================================

        if (
            new Date(toDate) <
            new Date(fromDate)
        ) {

            alert(
                "To date cannot be before From date."
            );

            return;
        }


        // =============================================
        // CREATE FORM DATA
        // =============================================

        const formData =
            new FormData();


        formData.append(
            "applicantType",
            applicantType
        );

        formData.append(
            "applicantId",
            applicantId
        );

        formData.append(
            "applicantName",
            applicantName
        );

        formData.append(
            "className",
            className
        );

        formData.append(
            "rollNumber",
            rollNumber
        );

        formData.append(
            "department",
            department
        );

        formData.append(
            "leaveType",
            leaveType
        );

        formData.append(
            "fromDate",
            fromDate
        );

        formData.append(
            "toDate",
            toDate
        );

        formData.append(
            "totalDays",
            totalDays
        );

        formData.append(
            "reason",
            reason
        );


        // =============================================
        // ADD PDF
        // =============================================

        if (pdfFile) {

            formData.append(
                "applicationPdf",
                pdfFile
            );
        }


        // =============================================
        // DISABLE SUBMIT BUTTON
        // =============================================

        const submitButton =
            document.querySelector(
                "#leaveForm button[type='submit']"
            );

        if (submitButton) {

            submitButton.disabled = true;

            submitButton.textContent =
                "Submitting...";
        }


        // =============================================
        // SEND TO SERVER
        // =============================================

        const response =
            await fetch(
                "/api/leaves",
                {
                    method: "POST",
                    body: formData
                }
            );


        const result =
            await response.json();


        // =============================================
        // CHECK RESPONSE
        // =============================================

        if (
            !response.ok ||
            !result.success
        ) {

            throw new Error(
                result.message ||
                "Unable to submit leave application."
            );
        }


        // =============================================
        // SUCCESS
        // =============================================

        alert(
            "Leave application submitted successfully."
        );


        // Reload Leave table

        await loadLeave();


    } catch (error) {

        console.error(
            "Save Leave Error:",
            error
        );

        alert(
            error.message ||
            "Unable to submit leave application."
        );

    }
}

// =====================================================
// APPROVE LEAVE
// =====================================================

async function approveLeave(id) {

    const remarks =
        prompt(
            "Enter admin remarks:",
            "Leave approved by admin."
        );

    if (remarks === null) {
        return;
    }

    try {

        const response =
            await fetch(
                `/api/leaves/${id}/status`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        status: "Approved",
                        adminRemarks: remarks
                    })
                }
            );


        const result =
            await response.json();


        if (
            !response.ok ||
            !result.success
        ) {

            throw new Error(
                result.message ||
                "Unable to approve leave."
            );
        }


        alert(
            "Leave approved successfully."
        );


       window.location.reload();


    } catch (error) {

        console.error(
            "Approve Leave Error:",
            error
        );

        alert(
            error.message ||
            "Unable to approve leave."
        );
    }
}


// =====================================================
// REJECT LEAVE
// =====================================================

async function rejectLeave(id) {

    const remarks =
        prompt(
            "Enter reason for rejection:",
            "Leave rejected by admin."
        );

    if (remarks === null) {
        return;
    }


    try {

        const response =
            await fetch(
                `/api/leaves/${id}/status`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        status: "Rejected",
                        adminRemarks: remarks
                    })
                }
            );


        const result =
            await response.json();


        if (
            !response.ok ||
            !result.success
        ) {

            throw new Error(
                result.message ||
                "Unable to reject leave."
            );
        }


        alert(
            "Leave rejected successfully."
        );


        await loadLeave();


    } catch (error) {

        console.error(
            "Reject Leave Error:",
            error
        );

        alert(
            error.message ||
            "Unable to reject leave."
        );
    }
}

    // =====================================================
// LOAD TIMETABLE
// =====================================================

async function loadTimetable() {

    moduleAddButton.textContent =
        "+ Add Timetable";

    moduleAddButton.onclick =
        openAddTimetableForm;


    moduleContent.innerHTML = `
        <div class="empty-state">

            <div class="empty-icon">
                ⏳
            </div>

            <h3>
                Loading Timetable...
            </h3>

            <p>
                Please wait.
            </p>

        </div>
    `;


    try {

        const response =
            await fetch("/api/timetable");


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to fetch timetable."
            );

        }


        renderTimetable(
            data.data || []
        );


    } catch (error) {

        console.error(
            "Timetable Loading Error:",
            error
        );


        moduleContent.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to Load Timetable
                </h3>

                <p>
                    ${escapeHtml(
                        error.message
                    )}
                </p>

            </div>
        `;

    }

}
// =====================================================
// LOAD HOMEWORK
// =====================================================

async function loadHomework() {

    moduleAddButton.textContent =
        "+ Add Homework";

    moduleAddButton.onclick =
        openAddHomeworkForm;


    moduleContent.innerHTML = `
        <div class="empty-state">

            <div class="empty-icon">
                ⏳
            </div>

            <h3>
                Loading Homework...
            </h3>

            <p>
                Please wait.
            </p>

        </div>
    `;


    try {

        const response =
            await fetch("/api/homework");


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to fetch homework."
            );

        }


        renderHomework(
            data.data || []
        );


    } catch (error) {

        console.error(
            "Homework Loading Error:",
            error
        );


        moduleContent.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to Load Homework
                </h3>

                <p>
                    ${escapeHtml(
                        error.message
                    )}
                </p>

            </div>
        `;

    }

}

// =====================================================
// LOAD NOTICES
// =====================================================

async function loadNotices() {

    moduleAddButton.textContent =
        "+ Add Notice";

    moduleAddButton.onclick =
        openAddNoticeForm;


    moduleContent.innerHTML = `
        <div class="empty-state">

            <div class="empty-icon">
                📢
            </div>

            <h3>
                Loading Notices...
            </h3>

            <p>
                Please wait.
            </p>

        </div>
    `;


    try {

        const response =
            await fetch("/api/notices");


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to fetch notices."
            );

        }


        renderNotices(
            data.data || []
        );


    } catch (error) {

        console.error(
            "Notice Loading Error:",
            error
        );


        moduleContent.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to Load Notices
                </h3>

                <p>
                    ${escapeHtml(
                        error.message
                    )}
                </p>

            </div>
        `;

    }

}
// =====================================================
// LOAD LIBRARY
// =====================================================

async function loadLibrary() {

    moduleAddButton.textContent =
    "+ Add Book";

moduleAddButton.onclick =
    openAddBookForm;






    const libraryIssueButton =
    document.getElementById("libraryIssueButton");

if (libraryIssueButton) {

    libraryIssueButton.style.display =
        "inline-block";

    libraryIssueButton.onclick =
        openIssueBookForm;

}

// // Issue Book button
// const issueBookButton =
//     document.createElement("button");

// issueBookButton.textContent =
//     "+ Issue Book";

// issueBookButton.className =
//     "primary-button";

// issueBookButton.style.marginLeft =
//     "10px";

// issueBookButton.onclick =
//     openIssueBookForm;

// if (moduleAddButton.parentElement) {

//     moduleAddButton.parentElement.appendChild(
//         issueBookButton
//     );

// }


    moduleContent.innerHTML = `
        <div class="empty-state">

            <div class="empty-icon">
                📚
            </div>

            <h3>
                Loading Library...
            </h3>

            <p>
                Please wait.
            </p>

        </div>
    `;


    try {

        const response =
            await fetch("/api/library");


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to fetch library books."
            );

        }


        renderLibrary(
            data.data || []
        );
        // =====================================================
// LOAD ISSUE HISTORY
// =====================================================

try {

    const issueResponse =
        await fetch("/api/library/issues");

    const issueData =
        await issueResponse.json();

    if (
        issueResponse.ok &&
        issueData.success
    ) {

        renderLibraryIssues(
            issueData.data || []
        );

    }

} catch (issueError) {

    console.error(
        "Issue History Loading Error:",
        issueError
    );

}


    } catch (error) {

        console.error(
            "Library Loading Error:",
            error
        );


        moduleContent.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to Load Library
                </h3>

                <p>
                    ${escapeHtml(
                        error.message
                    )}
                </p>

            </div>
        `;

    }

}
// =====================================================
// LOAD TRANSPORT
// =====================================================

async function loadTransport() {

    moduleAddButton.textContent = "+ Add Vehicle";

    moduleAddButton.onclick = openAddVehicleForm;


    moduleContent.innerHTML = `
        <div class="empty-state">

            <div class="empty-icon">🚌</div>

            <h3>Loading Transport...</h3>

            <p>Please wait.</p>

        </div>
    `;


    try {

        const [
            vehicleResponse,
            routeResponse
        ] = await Promise.all([

            fetch("/api/transport"),

            fetch("/api/routes")

        ]);


        const vehicleData =
            await vehicleResponse.json();

        const routeData =
            await routeResponse.json();


        if (
            !vehicleResponse.ok ||
            !vehicleData.success
        ) {

            throw new Error(
                vehicleData.message ||
                "Unable to load transport vehicles."
            );

        }


        if (
            !routeResponse.ok ||
            !routeData.success
        ) {

            throw new Error(
                routeData.message ||
                "Unable to load transport routes."
            );

        }


        const vehicles =
            vehicleData.data || [];

        const routes =
            routeData.data || [];


        renderTransportVehicles(
            vehicles,
            routes
        );


    } catch (error) {

        console.error(
            "Transport Loading Error:",
            error
        );


        moduleContent.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to Load Transport
                </h3>

                <p>
                    ${escapeHtml(
                        error.message
                    )}
                </p>

            </div>
        `;

    }

}
// =====================================================
// LOAD PAYROLL
// =====================================================

async function loadPayroll() {

    moduleAddButton.textContent = "+ Add Payroll";

    moduleAddButton.onclick = openAddPayrollForm;

    moduleContent.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">💰</div>
            <h3>Loading Payroll...</h3>
            <p>Please wait.</p>
        </div>
    `;

    try {

        const response =
            await fetch("/api/payroll");

        const data =
            await response.json();

        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to load payroll."
            );

        }

        renderPayrollTable(
            data.data || []
        );

    } catch (error) {

        console.error(
            "Payroll Loading Error:",
            error
        );

        moduleContent.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">⚠️</div>

                <h3>
                    Unable to Load Payroll
                </h3>

                <p>
                    ${escapeHtml(error.message)}
                </p>

            </div>
        `;

    }

}
window.loadPayroll = loadPayroll;

// =====================================================
// PAYROLL SEARCH + FILTER
// =====================================================

let currentPayrollList = [];


// =====================================================
// RENDER PAYROLL TABLE
// =====================================================

function renderPayrollTable(payrollList) {

    currentPayrollList = payrollList || [];


    moduleContent.innerHTML = `

        <div class="table-container">

            <!-- ========================================= -->
            <!-- HEADER -->
            <!-- ========================================= -->

            <div class="table-header">

                <h2>
                    Payroll Records
                </h2>

            </div>


            <!-- ========================================= -->
            <!-- SEARCH + FILTER -->
            <!-- ========================================= -->

            <div
                class="payroll-filter-box"
                style="
                    display:grid;
                    grid-template-columns:
                        minmax(200px, 2fr)
                        minmax(150px, 1fr)
                        minmax(150px, 1fr)
                        minmax(150px, 1fr);
                    gap:12px;
                    padding:15px;
                    margin-bottom:15px;
                    background:#f8f9fa;
                    border:1px solid #ddd;
                    border-radius:8px;
                "
            >

                <!-- SEARCH -->

                <input
                    type="text"
                    id="payrollSearch"
                    placeholder="🔍 Search Employee Name or ID..."
                    oninput="filterPayrollTable()"
                    style="
                        width:100%;
                        padding:10px 12px;
                        border:1px solid #ccc;
                        border-radius:6px;
                        box-sizing:border-box;
                    "
                >


                <!-- MONTH -->

                <select
                    id="payrollMonthFilter"
                    onchange="filterPayrollTable()"
                    style="
                        width:100%;
                        padding:10px 12px;
                        border:1px solid #ccc;
                        border-radius:6px;
                        box-sizing:border-box;
                    "
                >

                    <option value="">
                        All Months
                    </option>

                    <option value="1">January</option>
                    <option value="2">February</option>
                    <option value="3">March</option>
                    <option value="4">April</option>
                    <option value="5">May</option>
                    <option value="6">June</option>
                    <option value="7">July</option>
                    <option value="8">August</option>
                    <option value="9">September</option>
                    <option value="10">October</option>
                    <option value="11">November</option>
                    <option value="12">December</option>

                </select>


                <!-- YEAR -->

                <select
                    id="payrollYearFilter"
                    onchange="filterPayrollTable()"
                    style="
                        width:100%;
                        padding:10px 12px;
                        border:1px solid #ccc;
                        border-radius:6px;
                        box-sizing:border-box;
                    "
                >

                    <option value="">
                        All Years
                    </option>

                    ${
                        [...new Set(
                            currentPayrollList
                                .map(function(payroll) {
                                    return payroll.year;
                                })
                                .filter(Boolean)
                        )]
                        .sort(function(a, b) {
                            return b - a;
                        })
                        .map(function(year) {

                            return `
                                <option value="${year}">
                                    ${year}
                                </option>
                            `;

                        })
                        .join("")
                    }

                </select>


                <!-- STATUS -->

                <select
                    id="payrollStatusFilter"
                    onchange="filterPayrollTable()"
                    style="
                        width:100%;
                        padding:10px 12px;
                        border:1px solid #ccc;
                        border-radius:6px;
                        box-sizing:border-box;
                    "
                >

                    <option value="">
                        All Status
                    </option>

                    <option value="Paid">
                        Paid
                    </option>

                    <option value="Pending">
                        Pending
                    </option>

                </select>

            </div>


            <!-- ========================================= -->
            <!-- TABLE -->
            <!-- ========================================= -->

            <div class="table-wrapper">

                <table class="data-table">

                    <thead>

                        <tr>

                            <th>Employee</th>
                            <th>Employee ID</th>
                            <th>Designation</th>
                            <th>Month</th>
                            <th>Basic Salary</th>
                            <th>Allowance</th>
                            <th>Deduction</th>
                            <th>Net Salary</th>
                            <th>Status</th>
                            <th>Actions</th>

                        </tr>

                    </thead>


                    <tbody id="payrollTableBody">

                    </tbody>

                </table>

            </div>

        </div>

    `;


    // First render

    renderFilteredPayrollRows(
        currentPayrollList
    );

}


// =====================================================
// FILTER PAYROLL
// =====================================================

function filterPayrollTable() {

    const searchInput =
        document.getElementById(
            "payrollSearch"
        );

    const monthFilter =
        document.getElementById(
            "payrollMonthFilter"
        );

    const yearFilter =
        document.getElementById(
            "payrollYearFilter"
        );

    const statusFilter =
        document.getElementById(
            "payrollStatusFilter"
        );


    if (
        !searchInput ||
        !monthFilter ||
        !yearFilter ||
        !statusFilter
    ) {

        return;

    }


    const search =
        searchInput.value
            .trim()
            .toLowerCase();


    const selectedMonth =
        monthFilter.value;


    const selectedYear =
        yearFilter.value;


    const selectedStatus =
        statusFilter.value;


    const filteredList =
        currentPayrollList.filter(
            function(payroll) {

                // =====================================
                // SEARCH NAME / ID
                // =====================================

                const employeeName =
                    String(
                        payroll.employeeName || ""
                    ).toLowerCase();


                const employeeId =
                    String(
                        payroll.employeeId || ""
                    ).toLowerCase();


                const matchesSearch =
                    !search ||
                    employeeName.includes(search) ||
                    employeeId.includes(search);


                // =====================================
                // MONTH
                // =====================================

                const matchesMonth =
                    !selectedMonth ||
                    String(
                        payroll.month
                    ) === selectedMonth;


                // =====================================
                // YEAR
                // =====================================

                const matchesYear =
                    !selectedYear ||
                    String(
                        payroll.year
                    ) === selectedYear;


                // =====================================
                // STATUS
                // =====================================

                const matchesStatus =
                    !selectedStatus ||
                    String(
                        payroll.paymentStatus ||
                        "Pending"
                    ) === selectedStatus;


                return (
                    matchesSearch &&
                    matchesMonth &&
                    matchesYear &&
                    matchesStatus
                );

            }
        );


    renderFilteredPayrollRows(
        filteredList
    );

}
// =====================================================
// MAKE PAYROLL FUNCTIONS GLOBAL
// =====================================================

window.filterPayrollTable = filterPayrollTable;

window.renderFilteredPayrollRows =
    renderFilteredPayrollRows;


// =====================================================
// RENDER FILTERED PAYROLL ROWS
// =====================================================

function renderFilteredPayrollRows(
    payrollList
) {

    const tbody =
        document.getElementById(
            "payrollTableBody"
        );


    if (!tbody) {

        return;

    }


    // ================================================
    // NO RESULT
    // ================================================

    if (!payrollList.length) {

        tbody.innerHTML = `

            <tr>

                <td
                    colspan="10"
                    style="
                        text-align:center;
                        padding:30px;
                    "
                >

                    <div
                        style="
                            font-size:30px;
                            margin-bottom:8px;
                        "
                    >
                        🔍
                    </div>

                    <strong>
                        No Payroll Records Found
                    </strong>

                    <div
                        style="
                            margin-top:5px;
                            color:#777;
                        "
                    >
                        Try changing your search
                        or filters.
                    </div>

                </td>

            </tr>

        `;

        return;

    }


    // ================================================
    // ROWS
    // ================================================

    tbody.innerHTML =

        payrollList
            .map(function(payroll) {

                return `

                    <tr>

                        <td>
                            ${escapeHtml(
                                payroll.employeeName || ""
                            )}
                        </td>


                        <td>
                            ${escapeHtml(
                                payroll.employeeId || ""
                            )}
                        </td>


                        <td>
                            ${escapeHtml(
                                payroll.designation || ""
                            )}
                        </td>


                        <td>

                            ${escapeHtml(
                                String(
                                    payroll.month || ""
                                )
                            )}

                            /

                            ${escapeHtml(
                                String(
                                    payroll.year || ""
                                )
                            )}

                        </td>


                        <td>

                            ₹${Number(
                                payroll.basicSalary || 0
                            ).toLocaleString(
                                "en-IN"
                            )}

                        </td>


                        <td>

                            ₹${Number(
                                payroll.allowances || 0
                            ).toLocaleString(
                                "en-IN"
                            )}

                        </td>


                        <td>

                            ₹${Number(
                                payroll.deductions || 0
                            ).toLocaleString(
                                "en-IN"
                            )}

                        </td>


                        <td>

                            ₹${Number(
                                payroll.netSalary || 0
                            ).toLocaleString(
                                "en-IN"
                            )}

                        </td>


                        <td>

                            <span class="status-badge">

                                ${escapeHtml(
                                    payroll.paymentStatus ||
                                    "Pending"
                                )}

                            </span>

                        </td>


                        <td>

                            <button
                                type="button"
                                class="btn btn-small"
                                onclick="viewPayrollSlip('${payroll._id}')"
                            >
                                📄 View Slip
                            </button>


                            <button
                                type="button"
                                class="btn btn-small"
                                onclick="editPayroll('${payroll._id}')"
                            >
                                ✏️ Edit
                            </button>


                            <button
                                type="button"
                                class="btn btn-danger btn-small"
                                onclick="deletePayroll('${payroll._id}')"
                            >
                                🗑️ Delete
                            </button>

                        </td>

                    </tr>

                `;

            })
            .join("");

}
// =====================================================
// LOAD HOSTELS
// =====================================================

async function loadHostels() {
    moduleAddButton.textContent = "+ Add Hostel";

moduleAddButton.onclick = function () {
    showAddHostelForm();
};

    try {

        const response = await fetch("/api/hostels");

        const result = await response.json();

        console.log("Hostel API Response:", result);

        if (!response.ok || !result.success) {

            throw new Error(
                result.message || "Failed to load hostels."
            );

        }

        renderHostelTable(result.data || []);

    } catch (error) {

        console.error("Load Hostels Error:", error);

        moduleContent.innerHTML = `
            <div class="empty-state">
                <div class="empty-icon">⚠️</div>

                <h3>
                    Failed to Load Hostels
                </h3>

                <p>
                    ${escapeHtml(error.message)}
                </p>
            </div>
        `;

    }

}









// =====================================================
// LOAD INVENTORY
// =====================================================

async function loadInventory() {

    moduleAddButton.textContent = "+ Add Item";

    moduleAddButton.onclick = openAddInventoryForm;


    moduleContent.innerHTML = `
        <div class="empty-state">

            <div class="empty-icon">
                📦
            </div>

            <h3>
                Loading Inventory...
            </h3>

            <p>
                Please wait.
            </p>

        </div>
    `;


    try {

        const response =
            await fetch("/api/inventory");


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to load inventory."
            );

        }


        const items =
            data.data || [];


        renderInventoryTable(items);






        await loadInventoryIssueHistory();







    } catch (error) {

        console.error(
            "Inventory Loading Error:",
            error
        );


        moduleContent.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to Load Inventory
                </h3>

                <p>
                    ${escapeHtml(error.message)}
                </p>

            </div>
        `;

    }

}










// =====================================================
// ADD INVENTORY FORM
// =====================================================

function openAddInventoryForm() {

    moduleContent.innerHTML = `

        <div style="
            background: #111c2e;
            border-radius: 12px;
            padding: 24px;
        ">

            <h2 style="margin-bottom: 24px;">
                Add Inventory Item
            </h2>


            <form id="inventoryForm">

                <div style="
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    gap: 20px;
                ">

                    <!-- ITEM NAME -->
                    <div>
                        <label>
                            Item Name
                        </label>

                        <input
                            type="text"
                            id="inventoryItemName"
                            placeholder="e.g. Computer"
                            required
                        >
                    </div>


                    <!-- CATEGORY -->
                    <div>
                        <label>
                            Category
                        </label>

                        <input
                            type="text"
                            id="inventoryCategory"
                            placeholder="e.g. Electronics"
                            required
                        >
                    </div>


                    <!-- QUANTITY -->
                    <div>
                        <label>
                            Total Quantity
                        </label>

                        <input
                            type="number"
                            id="inventoryQuantity"
                            min="0"
                            placeholder="e.g. 20"
                            required
                        >
                    </div>


                    <!-- AVAILABLE QUANTITY -->
                    <div>
                        <label>
                            Available Quantity
                        </label>

                        <input
                            type="number"
                            id="inventoryAvailableQuantity"
                            min="0"
                            placeholder="e.g. 20"
                            required
                        >
                    </div>


                    <!-- UNIT PRICE -->
                    <div>
                        <label>
                            Unit Price
                        </label>

                        <input
                            type="number"
                            id="inventoryUnitPrice"
                            min="0"
                            placeholder="e.g. 45000"
                        >
                    </div>


                    <!-- SUPPLIER -->
                    <div>
                        <label>
                            Supplier
                        </label>

                        <input
                            type="text"
                            id="inventorySupplier"
                            placeholder="e.g. ABC Computers"
                        >
                    </div>


                    <!-- PURCHASE DATE -->
                    <div>
                        <label>
                            Purchase Date
                        </label>

                        <input
                            type="date"
                            id="inventoryPurchaseDate"
                        >
                    </div>


                    <!-- DESCRIPTION -->
                    <div>
                        <label>
                            Description
                        </label>

                        <input
                            type="text"
                            id="inventoryDescription"
                            placeholder="Item description"
                        >
                    </div>

                </div>


                <!-- BUTTONS -->

                <div style="
                    display: flex;
                    gap: 12px;
                    margin-top: 24px;
                ">

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        Save Item
                    </button>


                    <button
                        type="button"
                        class="secondary-button"
                        id="inventoryCancelButton"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    `;


    // CANCEL BUTTON

    document
        .getElementById("inventoryCancelButton")
        .addEventListener(
            "click",
            function () {

                loadInventory();

            }
        );


    // FORM SUBMIT

    document
        .getElementById("inventoryForm")
        .addEventListener(
            "submit",
            handleInventoryFormSubmit
        );

}





// =====================================================
// HANDLE INVENTORY FORM SUBMIT
// =====================================================

async function handleInventoryFormSubmit(event) {

    event.preventDefault();


    const itemName =
        document.getElementById("inventoryItemName").value.trim();

    const category =
        document.getElementById("inventoryCategory").value.trim();

    const quantity =
        Number(document.getElementById("inventoryQuantity").value);

    const availableQuantity =
        Number(
            document.getElementById(
                "inventoryAvailableQuantity"
            ).value
        );

    const unitPrice =
        Number(
            document.getElementById("inventoryUnitPrice").value
        ) || 0;

    const supplier =
        document.getElementById("inventorySupplier").value.trim();

    const purchaseDate =
        document.getElementById("inventoryPurchaseDate").value;

    const description =
        document.getElementById("inventoryDescription").value.trim();


    // VALIDATION

    if (availableQuantity > quantity) {

        alert(
            "Available quantity cannot be greater than total quantity."
        );

        return;
    }


    try {

        const response = await fetch(
            "/api/inventory",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    itemName,
                    category,
                    quantity,
                    availableQuantity,
                    unitPrice,
                    supplier,
                    purchaseDate,
                    description

                })
            }
        );


        const data =
            await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to add inventory item."
            );

        }


        alert(
            "Inventory item added successfully."
        );


        // GO BACK TO INVENTORY LIST

        loadInventory();


    } catch (error) {

        console.error(
            "Add Inventory Error:",
            error
        );


        alert(
            error.message ||
            "Unable to add inventory item."
        );

    }

}









// =====================================================
// RENDER INVENTORY TABLE
// =====================================================

function renderInventoryTable(items) {

    if (!items || items.length === 0) {

        moduleContent.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    📦
                </div>

                <h3>
                    No Inventory Items
                </h3>

                <p>
                    No inventory items have been added yet.
                </p>

            </div>
        `;

        return;
    }


    // TOTAL STOCK
    const totalStock = items.reduce(
        function (sum, item) {
            return sum + Number(item.quantity || 0);
        },
        0
    );


    // AVAILABLE STOCK
    const availableStock = items.reduce(
        function (sum, item) {
            return sum + Number(item.availableQuantity || 0);
        },
        0
    );


    // ISSUED STOCK
    const issuedStock =
        totalStock - availableStock;







   // DAMAGED / LOST
const damagedStock = items.reduce(
    function (sum, item) {
        return sum + Number(item.damagedQuantity || 0);
    },
    0
);









    moduleContent.innerHTML = `

        <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px;">

            <div class="stat-card">
                <h4>Total Items</h4>
                <div class="stat-value">
                    ${items.length}
                </div>
            </div>

            <div class="stat-card">
                <h4>Total Stock</h4>
                <div class="stat-value">
                    ${totalStock}
                </div>
            </div>

            <div class="stat-card">
                <h4>Issued</h4>
                <div class="stat-value">
                    ${issuedStock}
                </div>
            </div>

            <div class="stat-card">
                <h4>Damaged</h4>
                <div class="stat-value">
                    ${damagedStock}
                </div>
            </div>

        </div>


        <div style="background: #111c2e; border-radius: 12px; padding: 20px;">

            <div style="overflow-x: auto;">

                <table style="width: 100%; border-collapse: collapse;">

                    <thead>

                        <tr>

                            <th style="text-align: left; padding: 14px;">
                                Item
                            </th>

                            <th style="text-align: left; padding: 14px;">
                                Category
                            </th>

                            <th style="text-align: center; padding: 14px;">
                                Total
                            </th>

                            <th style="text-align: center; padding: 14px;">
                                Available
                            </th>

                            <th style="text-align: center; padding: 14px;">
                                Unit Price
                            </th>

                            <th style="text-align: left; padding: 14px;">
                                Supplier
                            </th>

                            <th style="text-align: center; padding: 14px;">
                                Status
                            </th>

<th style="text-align: center; padding: 14px;">
    Action
</th>


                        </tr>

                    </thead>


                    <tbody>

                        ${items.map(function (item) {

                            return `

                                <tr style="border-top: 1px solid rgba(255,255,255,0.08);">

                                    <td style="padding: 14px;">
                                        ${escapeHtml(item.itemName || "-")}
                                    </td>

                                    <td style="padding: 14px;">
                                        ${escapeHtml(item.category || "-")}
                                    </td>

                                    <td style="text-align: center; padding: 14px;">
                                        ${Number(item.quantity || 0)}
                                    </td>

                                    <td style="text-align: center; padding: 14px;">
                                        ${Number(item.availableQuantity || 0)}
                                    </td>

                                    <td style="text-align: center; padding: 14px;">
                                        ₹${Number(item.unitPrice || 0).toLocaleString("en-IN")}
                                    </td>

                                    <td style="padding: 14px;">
                                        ${escapeHtml(item.supplier || "-")}
                                    </td>

                                    <td style="text-align: center; padding: 14px;">
                                        ${escapeHtml(item.status || "Available")}
                                    </td>

<td style="text-align: center; padding: 14px;">

    <button
        type="button"
        class="primary-button"
        onclick="openIssueInventoryForm('${item._id}')"
        ${Number(item.availableQuantity || 0) <= 0 ? "disabled" : ""}
    >
        Issue
    </button>
    <button
    type="button"
    class="primary-button"
    onclick="markInventoryDamaged('${item._id}')"
    ${Number(item.availableQuantity || 0) <= 0 ? "disabled" : ""}
    style="margin-left: 6px;"
>
    ⚠ Damaged
</button>

</td>



                                </tr>

                            `;

                        }).join("")}

                    </tbody>

                </table>

            </div>

        </div>

    `;
}




// =====================================================
// MARK INVENTORY ITEM AS DAMAGED / LOST
// =====================================================

async function markInventoryDamaged(itemId) {

    try {

        const quantity =
            prompt("Enter damaged/lost quantity:");

        if (
            quantity === null ||
            Number(quantity) <= 0
        ) {
            return;
        }

        const reason =
            prompt("Enter reason:");

        if (reason === null) {
            return;
        }

        const response =
            await fetch(
                `/api/inventory/${itemId}/damaged`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        quantity:
                            Number(quantity),
                        reason:
                            reason.trim()
                    })
                }
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {
            throw new Error(
                data.message ||
                "Unable to mark item as damaged/lost."
            );
        }

        alert(
            "Inventory item marked as damaged/lost successfully."
        );

        // Refresh inventory
        loadInventory();

    } catch (error) {

        console.error(
            "Damaged Inventory Error:",
            error
        );

        alert(
            error.message ||
            "Unable to mark inventory item as damaged/lost."
        );
    }
}

window.markInventoryDamaged = markInventoryDamaged;


// =====================================================
// LOAD INVENTORY ISSUE HISTORY
// =====================================================

async function loadInventoryIssueHistory() {

    try {

        const response =
            await fetch(
                "/api/inventory/issues/history"
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to load issue history."
            );

        }

        const issues =
            data.data || [];

        const historySection =
            document.createElement("div");

        historySection.id =
            "inventoryIssueHistory";

        historySection.style.marginTop =
            "24px";

        historySection.innerHTML = `

            <div
                style="
                    background: #111c2e;
                    border-radius: 12px;
                    padding: 20px;
                "
            >

                <div
                    style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 18px;
                    "
                >

                    <h2>
                        Issue History
                    </h2>

                    <span>
                        ${issues.length} Records
                    </span>

                </div>


                ${
                    issues.length
                        ? `

                            <div
                                style="
                                    overflow-x: auto;
                                "
                            >

                                <table
                                    style="
                                        width: 100%;
                                        border-collapse: collapse;
                                    "
                                >

                                    <thead>

                                        <tr>

                                            <th
                                                style="
                                                    text-align: left;
                                                    padding: 14px;
                                                "
                                            >
                                                Item
                                            </th>

                                            <th
                                                style="
                                                    text-align: center;
                                                    padding: 14px;
                                                "
                                            >
                                                Quantity
                                            </th>

                                            <th
                                                style="
                                                    text-align: left;
                                                    padding: 14px;
                                                "
                                            >
                                                Issued To
                                            </th>

                                            <th
                                                style="
                                                    text-align: center;
                                                    padding: 14px;
                                                "
                                            >
                                                Issue Date
                                            </th>

                                            <th
                                                style="
                                                    text-align: left;
                                                    padding: 14px;
                                                "
                                            >
                                                Remarks
                                            </th>

                                            <th
                                                style="
                                                    text-align: center;
                                                    padding: 14px;
                                                "
                                            >
                                                Status
                                            </th>


                                            <th
    style="
        text-align: center;
        padding: 14px;
    "
>
    Action
</th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        ${issues.map(
                                            function (issue) {

                                                const issueDate =
                                                    issue.issueDate
                                                        ? new Date(
                                                            issue.issueDate
                                                        ).toLocaleDateString(
                                                            "en-IN"
                                                        )
                                                        : "-";

                                                return `

                                                    <tr
                                                        style="
                                                            border-top:
                                                                1px solid
                                                                rgba(
                                                                    255,
                                                                    255,
                                                                    255,
                                                                    0.08
                                                                );
                                                        "
                                                    >

                                                        <td
                                                            style="
                                                                padding: 14px;
                                                            "
                                                        >
                                                            ${escapeHtml(
                                                                issue.itemName ||
                                                                "-"
                                                            )}
                                                        </td>


                                                        <td
                                                            style="
                                                                text-align: center;
                                                                padding: 14px;
                                                            "
                                                        >
                                                            ${Number(
                                                                issue.quantity ||
                                                                0
                                                            )}
                                                        </td>


                                                        <td
                                                            style="
                                                                padding: 14px;
                                                            "
                                                        >
                                                            ${escapeHtml(
                                                                issue.issuedTo ||
                                                                "-"
                                                            )}
                                                        </td>


                                                        <td
                                                            style="
                                                                text-align: center;
                                                                padding: 14px;
                                                            "
                                                        >
                                                            ${issueDate}
                                                        </td>


                                                        <td
                                                            style="
                                                                padding: 14px;
                                                            "
                                                        >
                                                            ${escapeHtml(
                                                                issue.remarks ||
                                                                "-"
                                                            )}
                                                        </td>


                                                        <td
                                                            style="
                                                                text-align: center;
                                                                padding: 14px;
                                                            "
                                                        >
                                                            ${escapeHtml(
                                                                issue.status ||
                                                                "Issued"
                                                            )}
                                                        </td>


                                                        <td
    style="
        text-align: center;
        padding: 14px;
    "
>

    ${
        issue.status === "Returned"
            ? `
                <span>
                    Returned
                </span>
            `
            : `
                <button
                    type="button"
                    class="primary-button"
                    onclick="returnInventoryItem('${issue._id}')"
                    style="
                        padding: 8px 12px;
                    "
                >
                    ↩ Return
                </button>
            `
    }

</td>

                                                    </tr>

                                                `;

                                            }
                                        ).join("")}

                                    </tbody>

                                </table>

                            </div>

                        `
                        : `

                            <div
                                class="empty-state"
                            >

                                <div
                                    class="empty-icon"
                                >
                                    📤
                                </div>

                                <h3>
                                    No Issue History
                                </h3>

                                <p>
                                    No inventory items
                                    have been issued yet.
                                </p>

                            </div>

                        `
                }

            </div>

        `;


        moduleContent.appendChild(
            historySection
        );


    } catch (error) {

        console.error(
            "Inventory Issue History Error:",
            error
        );

    }

}


// =====================================================
// RETURN INVENTORY ITEM
// =====================================================

async function returnInventoryItem(issueId) {

    try {

        const quantity =
            prompt("Enter return quantity:");

        if (
            quantity === null ||
            Number(quantity) <= 0
        ) {
            return;
        }


        const response =
            await fetch(
                `/api/inventory/issues/${issueId}/return`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        quantity:
                            Number(quantity)
                    })
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to return inventory item."
            );

        }


        alert(
            "Inventory item returned successfully."
        );


        // REFRESH INVENTORY + ISSUE HISTORY

        loadInventory();


    } catch (error) {

        console.error(
            "Return Inventory Error:",
            error
        );


        alert(
            error.message ||
            "Unable to return inventory item."
        );

    }

}

window.returnInventoryItem = returnInventoryItem;




// =====================================================
// OPEN ISSUE INVENTORY FORM
// =====================================================

async function openIssueInventoryForm(itemId) {

    try {

        const response = await fetch(
            "/api/inventory"
        );

        const data =
            await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to load inventory."
            );

        }


        const item =
            data.data.find(
                function (inventoryItem) {
                    return inventoryItem._id === itemId;
                }
            );


        if (!item) {

            alert("Inventory item not found.");

            return;
        }


        moduleContent.innerHTML = `

            <div style="
                background: #111c2e;
                border-radius: 12px;
                padding: 24px;
            ">

                <h2 style="margin-bottom: 8px;">
                    Issue Inventory Item
                </h2>

                <p style="
                    color: #9fb3c8;
                    margin-bottom: 24px;
                ">
                    ${escapeHtml(item.itemName)}
                    — Available:
                    <strong>
                        ${Number(item.availableQuantity)}
                    </strong>
                </p>


                <form id="issueInventoryForm">

                    <!-- QUANTITY -->

                    <div style="margin-bottom: 20px;">

                        <label>
                            Issue Quantity
                        </label>

                        <input
                            type="number"
                            id="issueInventoryQuantity"
                            min="1"
                            max="${Number(item.availableQuantity)}"
                            required
                            placeholder="Enter quantity"
                        >

                    </div>


                    <!-- ISSUED TO -->

                    <div style="margin-bottom: 20px;">

                        <label>
                            Issued To
                        </label>

                        <input
                            type="text"
                            id="issueInventoryIssuedTo"
                            required
                            placeholder="Student / Teacher / Department"
                        >

                    </div>


                    <!-- ISSUE DATE -->

                    <div style="margin-bottom: 20px;">

                        <label>
                            Issue Date
                        </label>

                        <input
                            type="date"
                            id="issueInventoryDate"
                            required
                        >

                    </div>


                    <!-- REMARKS -->

                    <div style="margin-bottom: 20px;">

                        <label>
                            Remarks
                        </label>

                        <input
                            type="text"
                            id="issueInventoryRemarks"
                            placeholder="Optional remarks"
                        >

                    </div>


                    <!-- BUTTONS -->

                    <div style="
                        display: flex;
                        gap: 12px;
                        margin-top: 24px;
                    ">

                        <button
                            type="submit"
                            class="primary-button"
                        >
                            Issue Item
                        </button>


                        <button
                            type="button"
                            class="secondary-button"
                            id="cancelIssueInventory"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;


        // SET TODAY'S DATE

        const today =
            new Date()
                .toISOString()
                .split("T")[0];


        document
            .getElementById("issueInventoryDate")
            .value = today;


        // CANCEL

        document
            .getElementById("cancelIssueInventory")
            .addEventListener(
                "click",
                function () {

                    loadInventory();

                }
            );


        // SUBMIT

        document
            .getElementById("issueInventoryForm")
            .addEventListener(
                "submit",
                function (event) {

                    handleIssueInventorySubmit(
                        event,
                        itemId
                    );

                }
            );


    } catch (error) {

        console.error(
            "Open Issue Form Error:",
            error
        );

        alert(
            error.message ||
            "Unable to open issue form."
        );

    }

}




window.openIssueInventoryForm = openIssueInventoryForm;



// =====================================================
// HANDLE ISSUE INVENTORY SUBMIT
// =====================================================

async function handleIssueInventorySubmit(event, itemId) {

    event.preventDefault();


    const quantity =
        Number(
            document.getElementById(
                "issueInventoryQuantity"
            ).value
        );


    const issuedTo =
        document.getElementById(
            "issueInventoryIssuedTo"
        ).value.trim();


    const issueDate =
        document.getElementById(
            "issueInventoryDate"
        ).value;


    const remarks =
        document.getElementById(
            "issueInventoryRemarks"
        ).value.trim();


    if (!quantity || quantity <= 0) {

        alert("Please enter a valid quantity.");

        return;
    }


    if (!issuedTo) {

        alert("Please enter Issued To.");

        return;
    }


    try {

        const response = await fetch(
            `/api/inventory/${itemId}/issue`,
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    quantity,
                    issuedTo,
                    issueDate,
                    remarks

                })
            }
        );


        const data =
            await response.json();


        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to issue inventory item."
            );

        }


        alert(
            "Inventory item issued successfully."
        );


        // RETURN TO INVENTORY LIST

        loadInventory();


    } catch (error) {

        console.error(
            "Issue Inventory Error:",
            error
        );


        alert(
            error.message ||
            "Unable to issue inventory item."
        );

    }

}









// =====================================================
// RENDER HOSTEL TABLE
// =====================================================

function renderHostelTable(hostelList) {

    if (!hostelList || !hostelList.length) {

        moduleContent.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    🏠
                </div>

                <h3>
                    No Hostels Found
                </h3>

                <p>
                    Add your first hostel.
                </p>

                <button
                    type="button"
                    class="btn btn-primary"
                    onclick="showAddHostelForm()"
                >
                    + Add Hostel
                </button>

            </div>

        `;

        return;
    }


    moduleContent.innerHTML = `

        <div class="table-container">

            <div class="table-header">

                <h2>
                    Hostel Records
                </h2>

                <button
                    type="button"
                    class="btn btn-primary"
                    onclick="showAddHostelForm()"
                >
                    + Add Hostel
                </button>

            </div>


            <div class="table-wrapper">

                <table class="data-table">

                    <thead>

                        <tr>

                            <th>Hostel Name</th>
                            <th>Type</th>
                            <th>Warden</th>
                            <th>Phone</th>
                            <th>Rooms</th>
                            <th>Total Beds</th>
                            <th>Occupied</th>
                            <th>Available</th>
                            <th>Monthly Fee</th>
                            <th>Status</th>

                        </tr>

                    </thead>


                    <tbody>

                        ${hostelList.map(function (hostel) {

                            const availableBeds =
                                Math.max(
                                    0,
                                    Number(hostel.totalBeds || 0) -
                                    Number(hostel.occupiedBeds || 0)
                                );

                            return `

                                <tr>

                                    <td>
                                        ${escapeHtml(
                                            hostel.hostelName || ""
                                        )}
                                    </td>

                                    <td>
                                        ${escapeHtml(
                                            hostel.hostelType || ""
                                        )}
                                    </td>

                                    <td>
                                        ${escapeHtml(
                                            hostel.wardenName || ""
                                        )}
                                    </td>

                                    <td>
                                        ${escapeHtml(
                                            hostel.wardenPhone || ""
                                        )}
                                    </td>

                                    <td>
                                        ${Number(
                                            hostel.totalRooms || 0
                                        )}
                                    </td>

                                    <td>
                                        ${Number(
                                            hostel.totalBeds || 0
                                        )}
                                    </td>

                                    <td>
                                        ${Number(
                                            hostel.occupiedBeds || 0
                                        )}
                                    </td>

                                    <td>
                                        ${availableBeds}
                                    </td>

                                    <td>
                                        ₹${Number(
                                            hostel.monthlyFee || 0
                                        ).toLocaleString("en-IN")}
                                    </td>

                                    <td>
                                        ${escapeHtml(
                                            hostel.status || "active"
                                        )}
                                    </td>

                                </tr>

                            `;

                        }).join("")}

                    </tbody>

                </table>

            </div>

        </div>

    `;

}
// =====================================================
// SHOW ADD HOSTEL FORM
// =====================================================

function showAddHostelForm() {

    moduleContent.innerHTML = `

        <div class="form-container">

            <div class="form-header">

                <h2>Add Hostel</h2>

                <button
                    type="button"
                    class="btn btn-secondary"
                    onclick="loadHostels()"
                >
                    ← Back
                </button>

            </div>


            <form
                id="hostelForm"
                onsubmit="saveHostel(event)"
            >

                <div class="form-grid">


                    <div class="form-group">

                        <label>
                            Hostel Name *
                        </label>

                        <input
                            type="text"
                            id="hostelName"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label>
                            Hostel Type *
                        </label>

                        <select
                            id="hostelType"
                            required
                        >

                            <option value="">
                                Select Type
                            </option>

                            <option value="Boys">
                                Boys
                            </option>

                            <option value="Girls">
                                Girls
                            </option>

                            <option value="Mixed">
                                Mixed
                            </option>

                        </select>

                    </div>


                    <div class="form-group">

                        <label>
                            Warden Name *
                        </label>

                        <input
                            type="text"
                            id="wardenName"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label>
                            Warden Phone *
                        </label>

                        <input
                            type="tel"
                            id="wardenPhone"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label>
                            Total Rooms
                        </label>

                        <input
                            type="number"
                            id="totalRooms"
                            min="0"
                            value="0"
                        >

                    </div>


                    <div class="form-group">

                        <label>
                            Total Beds
                        </label>

                        <input
                            type="number"
                            id="totalBeds"
                            min="0"
                            value="0"
                        >

                    </div>


                    <div class="form-group">

                        <label>
                            Monthly Fee
                        </label>

                        <input
                            type="number"
                            id="monthlyFee"
                            min="0"
                            value="0"
                        >

                    </div>


                    <div class="form-group">

                        <label>
                            Status
                        </label>

                        <select id="hostelStatus">

                            <option value="active">
                                Active
                            </option>

                            <option value="inactive">
                                Inactive
                            </option>

                        </select>

                    </div>


                    <div class="form-group form-group-full">

                        <label>
                            Address
                        </label>

                        <textarea
                            id="hostelAddress"
                            rows="3"
                        ></textarea>

                    </div>


                </div>


                <div class="form-actions">

                    <button
                        type="button"
                        class="btn btn-secondary"
                        onclick="loadHostels()"
                    >
                        Cancel
                    </button>

                    <button
                        type="submit"
                        class="btn btn-primary"
                    >
                        Save Hostel
                    </button>

                </div>

            </form>

        </div>

    `;

}





// =====================================================
// SAVE HOSTEL
// =====================================================

async function saveHostel(event) {

    event.preventDefault();

    const data = {

        hostelName:
            document.getElementById("hostelName").value.trim(),

        hostelType:
            document.getElementById("hostelType").value,

        wardenName:
            document.getElementById("wardenName").value.trim(),

        wardenPhone:
            document.getElementById("wardenPhone").value.trim(),

        totalRooms:
            Number(
                document.getElementById("totalRooms").value
            ) || 0,

        totalBeds:
            Number(
                document.getElementById("totalBeds").value
            ) || 0,

        monthlyFee:
            Number(
                document.getElementById("monthlyFee").value
            ) || 0,

        address:
            document.getElementById("hostelAddress").value.trim(),

        status:
            document.getElementById("hostelStatus").value || "active"

    };


    if (
        !data.hostelName ||
        !data.hostelType ||
        !data.wardenName ||
        !data.wardenPhone
    ) {

        alert("Please fill all required fields.");

        return false;
    }


    try {

        const response = await fetch(
            "/api/hostels",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(data)
            }
        );


        const result = await response.json();

        console.log(
            "Hostel Save Response:",
            result
        );


        if (!response.ok || !result.success) {

            alert(
                result.message ||
                "Failed to save hostel."
            );

            return false;
        }


        alert("Hostel added successfully.");

        await loadHostels();

        return false;


    } catch (error) {

        console.error(
            "Save Hostel Error:",
            error
        );

        alert(
            "Unable to connect to server."
        );

        return false;
    }

}

















// =====================================================
// LOAD STUDENTS
// =====================================================

async function getStudentsForAllocation() {

    const response =
        await fetch("/api/students");

    const result =
        await response.json();


    if (!result.success) {

        throw new Error(
            result.message ||
            "Unable to load students."
        );

    }


    return result.data || [];

}


// =====================================================
// LOAD HOSTELS
// =====================================================

async function getHostelsForAllocation() {

    const response =
        await fetch("/api/hostels");

    const result =
        await response.json();


    if (!result.success) {

        throw new Error(
            result.message ||
            "Unable to load hostels."
        );

    }


    return result.data || [];

}


// =====================================================
// SHOW ALLOCATION FORM
// =====================================================

async function showHostelAllocationForm() {

    try {

        const [
            students,
            hostels
        ] = await Promise.all([

            getStudentsForAllocation(),

            getHostelsForAllocation()

        ]);


        if (!students.length) {

            alert(
                "Please add a student first."
            );

            return;

        }


        if (!hostels.length) {

            alert(
                "Please add a hostel first."
            );

            return;

        }


        moduleContent.innerHTML = `

            <div class="form-container">

                <div class="form-header">

                    <h2>
                        Allocate Hostel Bed
                    </h2>

                </div>


                <form
                    onsubmit="saveHostelAllocation(event)"
                >

                    <div class="form-grid">


                        <!-- STUDENT -->

                        <div class="form-group">

                            <label>
                                Student *
                            </label>

                            <select
                                id="allocationStudent"
                                required
                            >

                                <option value="">
                                    Select Student
                                </option>

                                ${students.map(
                                    function(student) {

                                        const name =
                                            student.name ||
                                            student.studentName ||
                                            "Student";

                                        const sid =
                                            student.studentId ||
                                            "";

                                        return `

                                            <option
                                                value="${student._id}"
                                            >
                                                ${escapeHtml(
                                                    name
                                                )}
                                                ${
                                                    sid
                                                        ? " (" +
                                                          escapeHtml(
                                                              sid
                                                          ) +
                                                          ")"
                                                        : ""
                                                }
                                            </option>

                                        `;

                                    }
                                ).join("")}

                            </select>

                        </div>


                        <!-- HOSTEL -->

                        <div class="form-group">

                            <label>
                                Hostel *
                            </label>

                            <select
                                id="allocationHostel"
                                required
                                onchange="loadAllocationRooms()"
                            >

                                <option value="">
                                    Select Hostel
                                </option>

                                ${hostels.map(
                                    function(hostel) {

                                        return `

                                            <option
                                                value="${hostel._id}"
                                            >
                                                ${escapeHtml(
                                                    hostel.hostelName
                                                )}
                                            </option>

                                        `;

                                    }
                                ).join("")}

                            </select>

                        </div>


                        <!-- ROOM -->

                        <div class="form-group">

                            <label>
                                Room *
                            </label>

                            <select
                                id="allocationRoom"
                                required
                                onchange="loadAvailableBeds()"
                            >

                                <option value="">
                                    Select Hostel First
                                </option>

                            </select>

                        </div>


                        <!-- BED -->

                        <div class="form-group">

                            <label>
                                Bed *
                            </label>

                            <select
                                id="allocationBed"
                                required
                            >

                                <option value="">
                                    Select Room First
                                </option>

                            </select>

                        </div>


                        <!-- DATE -->

                        <div class="form-group">

                            <label>
                                Allocation Date *
                            </label>

                            <input
                                type="date"
                                id="allocationDate"
                                value="${
                                    new Date()
                                        .toISOString()
                                        .split("T")[0]
                                }"
                                required
                            >

                        </div>


                        <!-- REMARKS -->

                        <div
                            class="form-group"
                            style="
                                grid-column:1/-1;
                            "
                        >

                            <label>
                                Remarks
                            </label>

                            <textarea
                                id="allocationRemarks"
                                rows="3"
                                placeholder="Optional remarks"
                            ></textarea>

                        </div>

                    </div>


                    <div
                        style="
                            display:flex;
                            gap:10px;
                            margin-top:20px;
                        "
                    >

                        <button
                            type="submit"
                            class="btn btn-primary"
                        >
                            🛏️ Allocate Bed
                        </button>


                        <button
                            type="button"
                            class="btn"
                            onclick="loadHostelAllocations()"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;

    } catch (error) {

        console.error(
            "Allocation Form Error:",
            error
        );

        alert(
            "Unable to load allocation form."
        );

    }

}


// =====================================================
// LOAD ROOMS AFTER HOSTEL SELECTION
// =====================================================

async function loadAllocationRooms() {

    const hostelId =
        document.getElementById(
            "allocationHostel"
        )?.value;


    const roomSelect =
        document.getElementById(
            "allocationRoom"
        );


    const bedSelect =
        document.getElementById(
            "allocationBed"
        );


    if (!roomSelect) return;


    roomSelect.innerHTML = `
        <option value="">
            Loading rooms...
        </option>
    `;


    bedSelect.innerHTML = `
        <option value="">
            Select Room First
        </option>
    `;


    if (!hostelId) {

        roomSelect.innerHTML = `
            <option value="">
                Select Hostel First
            </option>
        `;

        return;

    }


    try {

        const response =
            await fetch(
                `/api/rooms/hostel/${hostelId}`
            );


        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.message
            );

        }


        const rooms =
            (result.data || []).filter(
                function(room) {

                    return (
                        room.status === "active" &&
                        Number(
                            room.occupiedBeds || 0
                        ) <
                        Number(
                            room.totalBeds || 0
                        )
                    );

                }
            );


        if (!rooms.length) {

            roomSelect.innerHTML = `
                <option value="">
                    No available rooms
                </option>
            `;

            return;

        }


        roomSelect.innerHTML = `

            <option value="">
                Select Room
            </option>

            ${rooms.map(
                function(room) {

                    const available =
                        Number(
                            room.totalBeds || 0
                        ) -
                        Number(
                            room.occupiedBeds || 0
                        );

                    return `

                        <option
                            value="${room._id}"
                        >
                            Room ${escapeHtml(
                                room.roomNumber
                            )}
                            -
                            ${escapeHtml(
                                room.roomType
                            )}
                            -
                            ${available}
                            beds available
                        </option>

                    `;

                }
            ).join("")}

        `;

    } catch (error) {

        console.error(
            "Load Allocation Rooms Error:",
            error
        );

        roomSelect.innerHTML = `
            <option value="">
                Unable to load rooms
            </option>
        `;

    }

}


// =====================================================
// LOAD AVAILABLE BEDS
// =====================================================

async function loadAvailableBeds() {

    const roomId =
        document.getElementById(
            "allocationRoom"
        )?.value;


    const bedSelect =
        document.getElementById(
            "allocationBed"
        );


    if (!bedSelect) return;


    bedSelect.innerHTML = `
        <option value="">
            Loading beds...
        </option>
    `;


    if (!roomId) {

        bedSelect.innerHTML = `
            <option value="">
                Select Room First
            </option>
        `;

        return;

    }


    try {

        const response =
            await fetch(
                `/api/rooms/${roomId}`
            );


        const result =
            await response.json();


        if (!result.success) {

            throw new Error(
                result.message
            );

        }


        const room =
            result.data;


        const totalBeds =
            Number(
                room.totalBeds || 0
            );


        /*
         * Existing allocations are loaded
         * to identify occupied beds.
         */

        const allocationResponse =
            await fetch(
                "/api/hostel-allocations"
            );


        const allocationResult =
            await allocationResponse.json();


        const occupiedBeds =
            (
                allocationResult.data || []
            )
            .filter(
                function(allocation) {

                    return (
                        String(
                            allocation.roomId?._id ||
                            allocation.roomId
                        ) ===
                        String(roomId) &&
                        allocation.status ===
                        "active"
                    );

                }
            )
            .map(
                function(allocation) {

                    return String(
                        allocation.bedNumber
                    );

                }
            );


        const availableBeds = [];


        for (
            let i = 1;
            i <= totalBeds;
            i++
        ) {

            if (
                !occupiedBeds.includes(
                    String(i)
                )
            ) {

                availableBeds.push(i);

            }

        }


        if (!availableBeds.length) {

            bedSelect.innerHTML = `
                <option value="">
                    No beds available
                </option>
            `;

            return;

        }


        bedSelect.innerHTML = `

            <option value="">
                Select Bed
            </option>

            ${availableBeds.map(
                function(bed) {

                    return `

                        <option
                            value="${bed}"
                        >
                            Bed ${bed}
                        </option>

                    `;

                }
            ).join("")}

        `;

    } catch (error) {

        console.error(
            "Load Available Beds Error:",
            error
        );

        bedSelect.innerHTML = `
            <option value="">
                Unable to load beds
            </option>
        `;

    }

}


// =====================================================
// SAVE ALLOCATION
// =====================================================

async function saveHostelAllocation(
    event
) {

    event.preventDefault();


    const data = {

        studentId:
            document.getElementById(
                "allocationStudent"
            ).value,

        hostelId:
            document.getElementById(
                "allocationHostel"
            ).value,

        roomId:
            document.getElementById(
                "allocationRoom"
            ).value,

        bedNumber:
            document.getElementById(
                "allocationBed"
            ).value,

        allocationDate:
            document.getElementById(
                "allocationDate"
            ).value,

        remarks:
            document.getElementById(
                "allocationRemarks"
            ).value.trim()

    };


    try {

        const response =
            await fetch(
                "/api/hostel-allocations",
                {

                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(data)

                }
            );


        const result =
            await response.json();


        if (!result.success) {

            alert(
                result.message ||
                "Failed to allocate bed."
            );

            return;

        }


        alert(
            "Bed allocated successfully."
        );


        loadHostelAllocations();

    } catch (error) {

        console.error(
            "Save Allocation Error:",
            error
        );

        alert(
            "Unable to allocate bed."
        );

    }

}


// =====================================================
// VACATE BED
// =====================================================

async function vacateHostelBed(id) {

    if (
        !confirm(
            "Are you sure you want to vacate this bed?"
        )
    ) {

        return;

    }


    try {

        const response =
            await fetch(
                `/api/hostel-allocations/${id}/vacate`,
                {

                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        leavingDate:
                            new Date()

                    })

                }
            );


        const result =
            await response.json();


        if (!result.success) {

            alert(
                result.message ||
                "Unable to vacate bed."
            );

            return;

        }


        alert(
            "Bed vacated successfully."
        );


        loadHostelAllocations();

    } catch (error) {

        console.error(
            "Vacate Bed Error:",
            error
        );

        alert(
            "Unable to vacate bed."
        );

    }

}


// =====================================================
// DELETE ALLOCATION
// =====================================================

async function deleteHostelAllocation(
    id
) {

    if (
        !confirm(
            "Are you sure you want to delete this allocation?"
        )
    ) {

        return;

    }


    try {

        const response =
            await fetch(
                `/api/hostel-allocations/${id}`,
                {
                    method: "DELETE"
                }
            );


        const result =
            await response.json();


        if (!result.success) {

            alert(
                result.message ||
                "Unable to delete allocation."
            );

            return;

        }


        alert(
            "Allocation deleted successfully."
        );


        loadHostelAllocations();

    } catch (error) {

        console.error(
            "Delete Allocation Error:",
            error
        );

        alert(
            "Unable to delete allocation."
        );

    }

}
// =====================================================
// VIEW PAYROLL SALARY SLIP
// =====================================================

async function viewPayrollSlip(id) {

    try {

        const response =
            await fetch(`/api/payroll/${id}`);

        const result =
            await response.json();

        if (!result.success) {

            alert(
                result.message ||
                "Unable to load salary slip."
            );

            return;

        }

        const payroll =
            result.data;

        const monthNames = [
            "",
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ];

        const monthName =
            monthNames[payroll.month] ||
            "";

        const paymentDate =
            payroll.paymentDate
                ? new Date(
                    payroll.paymentDate
                ).toLocaleDateString("en-IN")
                : "-";


        const basic =
            Number(
                payroll.basicSalary || 0
            );

        const allowances =
            Number(
                payroll.allowances || 0
            );

        const deductions =
            Number(
                payroll.deductions || 0
            );

        const netSalary =
            Number(
                payroll.netSalary || 0
            );

        const totalEarnings =
            basic + allowances;


        // =================================================
        // SALARY SLIP
        // =================================================

        moduleContent.innerHTML = `

            <div class="salary-slip-actions">

                <button
                    type="button"
                    class="btn btn-primary"
                    onclick="printPayrollSlip()"
                >
                    🖨️ Print
                </button>

                <button
                    type="button"
                    class="btn btn-success"
                    onclick="downloadPayrollSlip()"
                >
                    📥 Download PDF
                </button>

                <button
                    type="button"
                    class="btn"
                    onclick="loadPayroll()"
                >
                    ← Back
                </button>

            </div>


            <div
                id="salarySlip"
                class="salary-slip-page"
            >

                <!-- ===================================== -->
                <!-- HEADER -->
                <!-- ===================================== -->

                <div class="salary-slip-header">

                    <div class="school-logo">

                        <div class="logo-circle">
                            🏫
                        </div>

                    </div>


                    <div class="school-details">

                        <h1>
                            MY MODERN SCHOOL
                        </h1>

                        <p>
                            School Management System
                        </p>

                        <small>
                            Salary Department
                        </small>

                    </div>


                    <div class="slip-title">

                        <h2>
                            SALARY SLIP
                        </h2>

                        <p>
                            ${monthName} ${payroll.year}
                        </p>

                    </div>

                </div>


                <!-- ===================================== -->
                <!-- EMPLOYEE INFORMATION -->
                <!-- ===================================== -->

                <div class="section-heading">
                    EMPLOYEE INFORMATION
                </div>


                <div class="employee-info-grid">

                    <div>
                        <strong>Employee Name</strong>
                        <span>
                            ${escapeHtml(
                                payroll.employeeName || "-"
                            )}
                        </span>
                    </div>


                    <div>
                        <strong>Employee ID</strong>
                        <span>
                            ${escapeHtml(
                                payroll.employeeId || "-"
                            )}
                        </span>
                    </div>


                    <div>
                        <strong>Designation</strong>
                        <span>
                            ${escapeHtml(
                                payroll.designation || "-"
                            )}
                        </span>
                    </div>


                    <div>
                        <strong>Salary Month</strong>
                        <span>
                            ${monthName} ${payroll.year}
                        </span>
                    </div>

                </div>


                <!-- ===================================== -->
                <!-- EARNINGS / DEDUCTIONS -->
                <!-- ===================================== -->

                <div class="salary-columns">


                    <!-- EARNINGS -->

                    <div class="salary-box">

                        <div class="salary-box-title">
                            EARNINGS
                        </div>


                        <div class="salary-row">

                            <span>
                                Basic Salary
                            </span>

                            <strong>
                                ₹${basic.toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                        </div>


                        <div class="salary-row">

                            <span>
                                Allowances
                            </span>

                            <strong>
                                ₹${allowances.toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                        </div>


                        <div class="salary-total">

                            <span>
                                TOTAL EARNINGS
                            </span>

                            <strong>
                                ₹${totalEarnings.toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                        </div>

                    </div>


                    <!-- DEDUCTIONS -->

                    <div class="salary-box">

                        <div class="salary-box-title">
                            DEDUCTIONS
                        </div>


                        <div class="salary-row">

                            <span>
                                Deductions
                            </span>

                            <strong>
                                ₹${deductions.toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                        </div>


                        <div class="salary-row">

                            <span>
                                Other Deductions
                            </span>

                            <strong>
                                ₹0
                            </strong>

                        </div>


                        <div class="salary-total">

                            <span>
                                TOTAL DEDUCTIONS
                            </span>

                            <strong>
                                ₹${deductions.toLocaleString(
                                    "en-IN"
                                )}
                            </strong>

                        </div>

                    </div>

                </div>


                <!-- ===================================== -->
                <!-- NET SALARY -->
                <!-- ===================================== -->

                <div class="net-salary-box">

                    <div>

                        <span>
                            NET SALARY
                        </span>

                        <small>
                            Basic + Allowances - Deductions
                        </small>

                    </div>


                    <strong>
                        ₹${netSalary.toLocaleString(
                            "en-IN"
                        )}
                    </strong>

                </div>


                <!-- ===================================== -->
                <!-- PAYMENT DETAILS -->
                <!-- ===================================== -->

                <div class="section-heading payment-heading">
                    PAYMENT DETAILS
                </div>


                <div class="payment-info-grid">

                    <div>

                        <strong>
                            Payment Status
                        </strong>

                        <span>
                            ${escapeHtml(
                                payroll.paymentStatus ||
                                "Pending"
                            )}
                        </span>

                    </div>


                    <div>

                        <strong>
                            Payment Date
                        </strong>

                        <span>
                            ${paymentDate}
                        </span>

                    </div>


                    <div>

                        <strong>
                            Payment Mode
                        </strong>

                        <span>
                            ${escapeHtml(
                                payroll.paymentMode ||
                                "-"
                            )}
                        </span>

                    </div>


                    <div>

                        <strong>
                            Transaction ID
                        </strong>

                        <span>
                            ${escapeHtml(
                                payroll.transactionId ||
                                "-"
                            )}
                        </span>

                    </div>

                </div>


                <!-- ===================================== -->
                <!-- SIGNATURES -->
                <!-- ===================================== -->

                <div class="signature-area">

                    <div class="signature-box">

                        <div class="signature-line">
                        </div>

                        <strong>
                            Employee Signature
                        </strong>

                        <small>
                            Employee
                        </small>

                    </div>


                    <div class="signature-box">

                        <div class="signature-line">
                        </div>

                        <strong>
                            Authorized Signature
                        </strong>

                        <small>
                            Principal / Authorized Person
                        </small>

                    </div>

                </div>


                <!-- ===================================== -->
                <!-- FOOTER -->
                <!-- ===================================== -->

                <div class="slip-footer">

                    This is a computer generated
                    salary slip.

                </div>

            </div>


            <!-- ========================================= -->
            <!-- SALARY SLIP CSS -->
            <!-- ========================================= -->

            <style>

                .salary-slip-actions {

                    display: flex;

                    gap: 10px;

                    margin-bottom: 20px;

                }


                /* ===================================== */
                /* A4 PAGE */
                /* ===================================== */

                .salary-slip-page {

                    width: 210mm;

                    height: 297mm;

                    background: #ffffff;

                    margin: 0 auto;

                    padding: 12mm;

                    box-sizing: border-box;

                    border: 1px solid #d5d5d5;

                    font-family:
                        Arial,
                        Helvetica,
                        sans-serif;

                    color: #222;

                    overflow: hidden;

                }


                /* ===================================== */
                /* HEADER */
                /* ===================================== */

                .salary-slip-header {

                    display: grid;

                    grid-template-columns:
                        70px 1fr 230px;

                    align-items: center;

                    gap: 15px;

                    padding-bottom: 15px;

                    border-bottom:
                        3px solid #183b66;

                }


                .school-logo {

                    display: flex;

                    justify-content: center;

                    align-items: center;

                }


                .logo-circle {

                    width: 55px;

                    height: 55px;

                    border-radius: 50%;

                    background: #183b66;

                    color: white;

                    display: flex;

                    align-items: center;

                    justify-content: center;

                    font-size: 25px;

                }


                .school-details h1 {

                    margin: 0;

                    font-size: 22px;

                    letter-spacing: 1px;

                }


                .school-details p {

                    margin: 4px 0;

                    font-size: 12px;

                    color: #555;

                }


                .school-details small {

                    font-size: 11px;

                    color: #777;

                }


                .slip-title {

                    text-align: right;

                }


                .slip-title h2 {

                    margin: 0;

                    font-size: 25px;

                    color: #183b66;

                    letter-spacing: 1px;

                }


                .slip-title p {

                    margin: 6px 0 0;

                    font-size: 13px;

                    font-weight: bold;

                }


                /* ===================================== */
                /* SECTION HEADING */
                /* ===================================== */

                .section-heading {

                    margin-top: 15px;

                    margin-bottom: 0;

                    padding: 9px 12px;

                    background: #183b66;

                    color: white;

                    font-size: 13px;

                    font-weight: bold;

                    letter-spacing: .5px;

                }


                /* ===================================== */
                /* EMPLOYEE INFORMATION */
                /* ===================================== */

                .employee-info-grid {

                    display: grid;

                    grid-template-columns: 1fr 1fr;

                    border: 1px solid #ddd;

                }


                .employee-info-grid > div {

                    padding: 9px 12px;

                    border-right: 1px solid #ddd;

                    border-bottom: 1px solid #ddd;

                }


                .employee-info-grid > div:nth-child(2n) {

                    border-right: none;

                }


                .employee-info-grid strong,
                .payment-info-grid strong {

                    display: block;

                    font-size: 10px;

                    color: #777;

                    margin-bottom: 4px;

                }


                .employee-info-grid span,
                .payment-info-grid span {

                    font-size: 13px;

                    font-weight: 600;

                }


                /* ===================================== */
                /* SALARY COLUMNS */
                /* ===================================== */

                .salary-columns {

                    display: grid;

                    grid-template-columns: 1fr 1fr;

                    gap: 12px;

                    margin-top: 15px;

                }


                .salary-box {

                    border: 1px solid #d5d5d5;

                }


                .salary-box-title {

                    padding: 9px;

                    background: #edf2f7;

                    color: #183b66;

                    font-weight: bold;

                    font-size: 12px;

                    text-align: center;

                    border-bottom:
                        1px solid #d5d5d5;

                }


                .salary-row {

                    display: flex;

                    justify-content:
                        space-between;

                    padding: 10px 12px;

                    border-bottom:
                        1px solid #eee;

                    font-size: 12px;

                }


                .salary-total {

                    display: flex;

                    justify-content:
                        space-between;

                    padding: 10px 12px;

                    font-size: 12px;

                    font-weight: bold;

                    background: #f7f9fb;

                }


                /* ===================================== */
                /* NET SALARY */
                /* ===================================== */

                .net-salary-box {

                    margin-top: 15px;

                    padding: 13px;

                    border:
                        2px solid #183b66;

                    display: flex;

                    justify-content:
                        space-between;

                    align-items: center;

                }


                .net-salary-box span {

                    display: block;

                    font-weight: bold;

                    font-size: 13px;

                    color: #183b66;

                }


                .net-salary-box small {

                    display: block;

                    margin-top: 4px;

                    color: #777;

                    font-size: 10px;

                }


                .net-salary-box > strong {

                    font-size: 23px;

                    color: #183b66;

                }


                /* ===================================== */
                /* PAYMENT */
                /* ===================================== */

                .payment-heading {

                    margin-top: 15px;

                }


                .payment-info-grid {

                    display: grid;

                    grid-template-columns: 1fr 1fr;

                    border: 1px solid #ddd;

                }


                .payment-info-grid > div {

                    padding: 8px 12px;

                    border-right:
                        1px solid #ddd;

                    border-bottom:
                        1px solid #ddd;

                }


                .payment-info-grid > div:nth-child(2n) {

                    border-right: none;

                }


                /* ===================================== */
                /* SIGNATURE */
                /* ===================================== */

                .signature-area {

                    display: grid;

                    grid-template-columns: 1fr 1fr;

                    gap: 80px;

                    margin-top: 45px;

                    padding: 0 20px;

                }


                .signature-box {

                    text-align: center;

                }


                .signature-line {

                    height: 35px;

                    border-bottom:
                        1px solid #333;

                    margin-bottom: 7px;

                }


                .signature-box strong {

                    display: block;

                    font-size: 11px;

                }


                .signature-box small {

                    display: block;

                    margin-top: 4px;

                    font-size: 9px;

                    color: #777;

                }


                /* ===================================== */
                /* FOOTER */
                /* ===================================== */

                .slip-footer {

                    margin-top: 25px;

                    padding-top: 9px;

                    border-top:
                        1px solid #ddd;

                    text-align: center;

                    font-size: 9px;

                    color: #777;

                }


                /* ===================================== */
                /* PRINT */
                /* ===================================== */

                @media print {

                    @page {

                        size: A4 portrait;

                        margin: 0;

                    }


                    html,
                    body {

                        margin: 0 !important;

                        padding: 0 !important;

                        width: 210mm !important;

                        height: 297mm !important;

                        background: white !important;

                    }


                    .salary-slip-actions {

                        display: none !important;

                    }


                    .salary-slip-page {

                        width: 210mm !important;

                        height: 297mm !important;

                        margin: 0 !important;

                        padding: 12mm !important;

                        border: none !important;

                        overflow: hidden !important;

                        page-break-after: avoid !important;

                        break-after: avoid !important;

                    }

                }

            </style>

        `;

    }

    catch (error) {

        console.error(
            "View Payroll Slip Error:",
            error
        );

        alert(
            "Unable to open salary slip."
        );

    }

}


// =====================================================
// PRINT PAYROLL SLIP
// =====================================================

function printPayrollSlip() {

    const slip =
        document.getElementById("salarySlip");

    if (!slip) {

        alert("Salary slip not found.");

        return;

    }


    const printWindow =
        window.open(
            "",
            "_blank",
            "width=1000,height=800"
        );


    if (!printWindow) {

        alert(
            "Please allow popups for this website."
        );

        return;

    }


    const styles =
        document.querySelectorAll("style");


    let css = "";

    styles.forEach(function (style) {

        css += style.innerHTML;

    });


    printWindow.document.open();

    printWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <meta charset="UTF-8">

            <title>
                Salary Slip
            </title>

            <style>

                ${css}

            </style>

        </head>

        <body>

            ${slip.outerHTML}

        </body>

        </html>

    `);


    printWindow.document.close();


    setTimeout(function () {

        printWindow.focus();

        printWindow.print();

    }, 1000);


    printWindow.onafterprint =
        function () {

            if (!printWindow.closed) {

                printWindow.close();

            }

        };

}


// =====================================================
// DOWNLOAD PAYROLL SLIP
// =====================================================

function downloadPayrollSlip() {

    // Browser Print dialog se
    // "Save as PDF" select karein.

    printPayrollSlip();

}
// =====================================================
// DELETE PAYROLL
// =====================================================

async function deletePayroll(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this payroll record?"
        );

    if (!confirmDelete) {
        return;
    }

    try {

        const response =
            await fetch(
                `/api/payroll/${encodeURIComponent(id)}`,
                {
                    method: "DELETE"
                }
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to delete payroll."
            );

        }

        alert(
            "Payroll deleted successfully."
        );

        // Reload payroll table
        await loadPayroll();

    } catch (error) {

        console.error(
            "Delete Payroll Error:",
            error
        );

        alert(
            error.message ||
            "Unable to delete payroll."
        );

    }

}
// =====================================================
// OPEN ADD PAYROLL FORM
// =====================================================

function openAddPayrollForm() {

    moduleContent.innerHTML = `

        <div class="form-container">

            <h2>Add Payroll</h2>

            <form id="payrollForm">

                <div class="form-grid">

                    <div class="form-group">

                        <label>Employee Name</label>

                        <input
                            type="text"
                            id="payrollEmployeeName"
                            placeholder="Enter employee name"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label>Employee ID</label>

                        <input
                            type="text"
                            id="payrollEmployeeId"
                            placeholder="Enter employee ID"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label>Designation</label>

                        <input
                            type="text"
                            id="payrollDesignation"
                            placeholder="e.g. Teacher"
                        >

                    </div>


                    <div class="form-group">

                        <label>Month</label>

                        <select
                            id="payrollMonth"
                            required
                        >

                            <option value="">
                                Select Month
                            </option>

                            <option value="1">January</option>
                            <option value="2">February</option>
                            <option value="3">March</option>
                            <option value="4">April</option>
                            <option value="5">May</option>
                            <option value="6">June</option>
                            <option value="7">July</option>
                            <option value="8">August</option>
                            <option value="9">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>

                        </select>

                    </div>


                    <div class="form-group">

                        <label>Year</label>

                        <input
                            type="number"
                            id="payrollYear"
                            min="2020"
                            max="2100"
                            value="2026"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label>Basic Salary</label>

                        <input
                            type="number"
                            id="payrollBasicSalary"
                            min="0"
                            placeholder="Enter basic salary"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label>Allowances</label>

                        <input
                            type="number"
                            id="payrollAllowances"
                            min="0"
                            value="0"
                            placeholder="Enter allowances"
                        >

                    </div>


                    <div class="form-group">

                        <label>Deductions</label>

                        <input
                            type="number"
                            id="payrollDeductions"
                            min="0"
                            value="0"
                            placeholder="Enter deductions"
                        >

                    </div>


                    <div class="form-group">

                        <label>Payment Status</label>

                        <select
                            id="payrollPaymentStatus"
                        >

                            <option value="Pending">
                                Pending
                            </option>

                            <option value="Paid">
                                Paid
                            </option>

                        </select>

                    </div>


                    <div class="form-group">

                        <label>Payment Mode</label>

                        <select
                            id="payrollPaymentMode"
                        >

                            <option value="">
                                Select Payment Mode
                            </option>

                            <option value="Cash">
                                Cash
                            </option>

                            <option value="Bank Transfer">
                                Bank Transfer
                            </option>

                            <option value="UPI">
                                UPI
                            </option>

                            <option value="Cheque">
                                Cheque
                            </option>

                        </select>

                    </div>


                    <div class="form-group">

                        <label>Payment Date</label>

                        <input
                            type="date"
                            id="payrollPaymentDate"
                        >

                    </div>


                    <div class="form-group">

                        <label>Transaction ID</label>

                        <input
                            type="text"
                            id="payrollTransactionId"
                            placeholder="Enter transaction ID"
                        >

                    </div>

                </div>


                <div
                    style="
                        margin-top:25px;
                        display:flex;
                        gap:12px;
                        flex-wrap:wrap;
                    "
                >

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        Save Payroll
                    </button>


                    <button
                        type="button"
                        class="secondary-button"
                        id="cancelPayrollButton"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    `;


    const form =
        document.getElementById(
            "payrollForm"
        );


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            await savePayroll();

        }
    );


    document
        .getElementById(
            "cancelPayrollButton"
        )
        .addEventListener(
            "click",
            loadPayroll
        );

}
// =====================================================
// EDIT PAYROLL
// =====================================================

async function editPayroll(id) {

    try {

        const response =
            await fetch(
                `/api/payroll/${encodeURIComponent(id)}`
            );

        const data =
            await response.json();

        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to fetch payroll."
            );

        }

        const payroll = data.data;

        moduleContent.innerHTML = `

            <div class="form-container">

                <h2>Edit Payroll</h2>

                <form id="editPayrollForm">

                    <div class="form-grid">

                        <div class="form-group">
                            <label>Employee Name</label>
                            <input
                                type="text"
                                id="editPayrollEmployeeName"
                                value="${escapeHtml(payroll.employeeName || "")}"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label>Employee ID</label>
                            <input
                                type="text"
                                id="editPayrollEmployeeId"
                                value="${escapeHtml(payroll.employeeId || "")}"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label>Designation</label>
                            <input
                                type="text"
                                id="editPayrollDesignation"
                                value="${escapeHtml(payroll.designation || "")}"
                            >
                        </div>

                        <div class="form-group">
                            <label>Month</label>

                            <select
                                id="editPayrollMonth"
                                required
                            >

                                <option value="1" ${Number(payroll.month) === 1 ? "selected" : ""}>January</option>
                                <option value="2" ${Number(payroll.month) === 2 ? "selected" : ""}>February</option>
                                <option value="3" ${Number(payroll.month) === 3 ? "selected" : ""}>March</option>
                                <option value="4" ${Number(payroll.month) === 4 ? "selected" : ""}>April</option>
                                <option value="5" ${Number(payroll.month) === 5 ? "selected" : ""}>May</option>
                                <option value="6" ${Number(payroll.month) === 6 ? "selected" : ""}>June</option>
                                <option value="7" ${Number(payroll.month) === 7 ? "selected" : ""}>July</option>
                                <option value="8" ${Number(payroll.month) === 8 ? "selected" : ""}>August</option>
                                <option value="9" ${Number(payroll.month) === 9 ? "selected" : ""}>September</option>
                                <option value="10" ${Number(payroll.month) === 10 ? "selected" : ""}>October</option>
                                <option value="11" ${Number(payroll.month) === 11 ? "selected" : ""}>November</option>
                                <option value="12" ${Number(payroll.month) === 12 ? "selected" : ""}>December</option>

                            </select>
                        </div>

                        <div class="form-group">
                            <label>Year</label>
                            <input
                                type="number"
                                id="editPayrollYear"
                                value="${payroll.year || ""}"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label>Basic Salary</label>
                            <input
                                type="number"
                                id="editPayrollBasicSalary"
                                value="${payroll.basicSalary || 0}"
                                min="0"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label>Allowances</label>
                            <input
                                type="number"
                                id="editPayrollAllowances"
                                value="${payroll.allowances || 0}"
                                min="0"
                            >
                        </div>

                        <div class="form-group">
                            <label>Deductions</label>
                            <input
                                type="number"
                                id="editPayrollDeductions"
                                value="${payroll.deductions || 0}"
                                min="0"
                            >
                        </div>

                        <div class="form-group">
                            <label>Payment Status</label>

                            <select id="editPayrollPaymentStatus">

                                <option value="Pending"
                                    ${payroll.paymentStatus === "Pending" ? "selected" : ""}>
                                    Pending
                                </option>

                                <option value="Paid"
                                    ${payroll.paymentStatus === "Paid" ? "selected" : ""}>
                                    Paid
                                </option>

                            </select>
                        </div>

                        <div class="form-group">
                            <label>Payment Mode</label>

                            <select id="editPayrollPaymentMode">

                                <option value="">Select Payment Mode</option>

                                <option value="Cash"
                                    ${payroll.paymentMode === "Cash" ? "selected" : ""}>
                                    Cash
                                </option>

                                <option value="Bank Transfer"
                                    ${payroll.paymentMode === "Bank Transfer" ? "selected" : ""}>
                                    Bank Transfer
                                </option>

                                <option value="UPI"
                                    ${payroll.paymentMode === "UPI" ? "selected" : ""}>
                                    UPI
                                </option>

                                <option value="Cheque"
                                    ${payroll.paymentMode === "Cheque" ? "selected" : ""}>
                                    Cheque
                                </option>

                            </select>
                        </div>

                        <div class="form-group">
                            <label>Payment Date</label>

                            <input
                                type="date"
                                id="editPayrollPaymentDate"
                                value="${payroll.paymentDate ? String(payroll.paymentDate).substring(0, 10) : ""}"
                            >
                        </div>

                        <div class="form-group">
                            <label>Transaction ID</label>

                            <input
                                type="text"
                                id="editPayrollTransactionId"
                                value="${escapeHtml(payroll.transactionId || "")}"
                            >
                        </div>

                    </div>

                    <div
                        style="
                            margin-top:25px;
                            display:flex;
                            gap:12px;
                            flex-wrap:wrap;
                        "
                    >

                        <button
                            type="submit"
                            class="primary-button"
                        >
                            Update Payroll
                        </button>

                        <button
                            type="button"
                            class="secondary-button"
                            id="cancelEditPayrollButton"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;

      document
    .getElementById("editPayrollForm")
    .addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            updatePayroll(id);

        }
    );

        document
            .getElementById(
                "cancelEditPayrollButton"
            )
            .addEventListener(
                "click",
                loadPayroll
            );

    } catch (error) {

        console.error(
            "Edit Payroll Error:",
            error
        );

        alert(
            error.message ||
            "Unable to open payroll."
        );

        loadPayroll();

    }

}
// =====================================================
// UPDATE PAYROLL
// =====================================================

async function updatePayroll(id) {

    try {

        const employeeName =
            document.getElementById(
                "editPayrollEmployeeName"
            ).value.trim();

        const employeeId =
            document.getElementById(
                "editPayrollEmployeeId"
            ).value.trim();

        const designation =
            document.getElementById(
                "editPayrollDesignation"
            ).value.trim();

        const month =
            document.getElementById(
                "editPayrollMonth"
            ).value;

        const year =
            document.getElementById(
                "editPayrollYear"
            ).value;

        const basicSalary =
            document.getElementById(
                "editPayrollBasicSalary"
            ).value;

        const allowances =
            document.getElementById(
                "editPayrollAllowances"
            ).value || 0;

        const deductions =
            document.getElementById(
                "editPayrollDeductions"
            ).value || 0;

        const paymentStatus =
            document.getElementById(
                "editPayrollPaymentStatus"
            ).value;

        const paymentMode =
            document.getElementById(
                "editPayrollPaymentMode"
            ).value;

        const paymentDate =
            document.getElementById(
                "editPayrollPaymentDate"
            ).value;

        const transactionId =
            document.getElementById(
                "editPayrollTransactionId"
            ).value.trim();


        const response =
            await fetch(
                "/api/payroll/" + id,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        employeeName:
                            employeeName,

                        employeeId:
                            employeeId,

                        designation:
                            designation,

                        month:
                            Number(month),

                        year:
                            Number(year),

                        basicSalary:
                            Number(basicSalary),

                        allowances:
                            Number(allowances),

                        deductions:
                            Number(deductions),

                        paymentStatus:
                            paymentStatus,

                        paymentMode:
                            paymentMode,

                        paymentDate:
                            paymentDate || null,

                        transactionId:
                            transactionId

                    })

                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to update payroll."
            );

        }


        alert(
            "Payroll updated successfully."
        );


        await loadPayroll();


    } catch (error) {

        console.error(
            "Update Payroll Error:",
            error
        );

        alert(
            error.message ||
            "Unable to update payroll."
        );

    }

}
// =====================================================
// SAVE PAYROLL
// =====================================================

async function savePayroll() {

    try {

        const employeeName =
            document.getElementById(
                "payrollEmployeeName"
            ).value.trim();

        const employeeId =
            document.getElementById(
                "payrollEmployeeId"
            ).value.trim();

        const designation =
            document.getElementById(
                "payrollDesignation"
            ).value.trim();

        const month =
            document.getElementById(
                "payrollMonth"
            ).value;

        const year =
            document.getElementById(
                "payrollYear"
            ).value;

        const basicSalary =
            document.getElementById(
                "payrollBasicSalary"
            ).value;

        const allowances =
            document.getElementById(
                "payrollAllowances"
            ).value || 0;

        const deductions =
            document.getElementById(
                "payrollDeductions"
            ).value || 0;

        const paymentStatus =
            document.getElementById(
                "payrollPaymentStatus"
            ).value;

        const paymentMode =
            document.getElementById(
                "payrollPaymentMode"
            ).value;

        const paymentDate =
            document.getElementById(
                "payrollPaymentDate"
            ).value;

        const transactionId =
            document.getElementById(
                "payrollTransactionId"
            ).value.trim();


        const response =
            await fetch(
                "/api/payroll",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        employeeName:
                            employeeName,

                        employeeId:
                            employeeId,

                        designation:
                            designation,

                        month:
                            Number(month),

                        year:
                            Number(year),

                        basicSalary:
                            Number(basicSalary),

                        allowances:
                            Number(allowances),

                        deductions:
                            Number(deductions),

                        paymentStatus:
                            paymentStatus,

                        paymentDate:
                            paymentDate || null,

                        paymentMode:
                            paymentMode,

                        transactionId:
                            transactionId

                    })

                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to save payroll."
            );

        }


        alert(
            "Payroll added successfully."
        );


        await loadPayroll();


    } catch (error) {

        console.error(
            "Save Payroll Error:",
            error
        );

        alert(
            error.message ||
            "Unable to save payroll."
        );

    }

}


// =====================================================
// RENDER TRANSPORT VEHICLES + ROUTES
// =====================================================

function renderTransportVehicles(vehicles, routes) {

    vehicles = vehicles || [];
    routes = routes || [];


    moduleContent.innerHTML = `

        <!-- ========================================= -->
        <!-- VEHICLES -->
        <!-- ========================================= -->

        <div class="table-container">

            <div class="table-header">

                <h2>
                    🚌 Transport Vehicles
                </h2>

                <button
                    type="button"
                    class="primary-button"
                    id="addVehicleButton"
                >
                    + Add Vehicle
                </button>

            </div>


            ${
                vehicles.length
                    ? `

                    <div class="table-wrapper">

                        <table class="data-table">

                            <thead>

                                <tr>

                                    <th>Vehicle Number</th>
                                    <th>Vehicle Type</th>
                                    <th>Driver Name</th>
                                    <th>Driver Phone</th>
                                    <th>Capacity</th>
                                    <th>Route</th>
                                    <th>Status</th>
                                    <th>Actions</th>

                                </tr>

                            </thead>


                            <tbody>

                                ${vehicles.map(function (vehicle) {

                                    return `

                                        <tr>

                                            <td>
                                                ${escapeHtml(
                                                    vehicle.vehicleNumber || ""
                                                )}
                                            </td>

                                            <td>
                                                ${escapeHtml(
                                                    vehicle.vehicleType || ""
                                                )}
                                            </td>

                                            <td>
                                                ${escapeHtml(
                                                    vehicle.driverName || ""
                                                )}
                                            </td>

                                            <td>
                                                ${escapeHtml(
                                                    vehicle.driverPhone || ""
                                                )}
                                            </td>

                                            <td>
                                                ${escapeHtml(
                                                    String(
                                                        vehicle.capacity || 0
                                                    )
                                                )}
                                            </td>

                                            <td>
                                                ${escapeHtml(
                                                    vehicle.routeName || ""
                                                )}
                                            </td>

                                            <td>

                                                <span class="status-badge">

                                                    ${escapeHtml(
                                                        vehicle.status ||
                                                        "active"
                                                    )}

                                                </span>

                                            </td>

                                            <td>

                                                <button
                                                    type="button"
                                                    class="btn btn-small"
                                                    onclick="editTransportVehicle('${vehicle._id}')"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    class="btn btn-danger btn-small"
                                                    onclick="deleteTransportVehicle('${vehicle._id}')"
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    `;

                                }).join("")}

                            </tbody>

                        </table>

                    </div>

                `
                    : `

                    <div class="empty-state">

                        <div class="empty-icon">
                            🚌
                        </div>

                        <h3>
                            No Vehicles Found
                        </h3>

                        <p>
                            Add your first school transport vehicle.
                        </p>

                    </div>

                `
            }

        </div>



        <!-- ========================================= -->
        <!-- ROUTES -->
        <!-- ========================================= -->

        <div
            class="table-container"
            style="margin-top:30px;"
        >

            <div class="table-header">

                <h2>
                    🛣️ Transport Routes
                </h2>

                <button
                    type="button"
                    class="primary-button"
                    id="addRouteButton"
                >
                    + Add Route
                </button>

            </div>


            ${
                routes.length
                    ? `

                    <div class="table-wrapper">

                        <table class="data-table">

                            <thead>

                                <tr>

                                    <th>Route Name</th>
                                    <th>Starting Point</th>
                                    <th>Destination</th>
                                    <th>Stops</th>
                                    <th>Distance</th>
                                    <th>Status</th>
                                    <th>Actions</th>

                                </tr>

                            </thead>


                            <tbody>

                                ${routes.map(function (route) {

                                    return `

                                        <tr>

                                            <td>
                                                ${escapeHtml(
                                                    route.routeName || ""
                                                )}
                                            </td>

                                            <td>
                                                ${escapeHtml(
                                                    route.startPoint || ""
                                                )}
                                            </td>

                                            <td>
                                                ${escapeHtml(
                                                    route.destination || ""
                                                )}
                                            </td>

                                            <td>
                                                ${escapeHtml(
                                                    (route.stops || []).join(
                                                        ", "
                                                    )
                                                )}
                                            </td>

                                            <td>
                                                ${escapeHtml(
                                                    String(
                                                        route.distance || 0
                                                    )
                                                )}
                                                KM
                                            </td>

                                            <td>

                                                <span class="status-badge">

                                                    ${escapeHtml(
                                                        route.status ||
                                                        "active"
                                                    )}

                                                </span>

                                            </td>

                                            <td>

                                                <button
                                                    type="button"
                                                    class="btn btn-small"
                                                    onclick="editTransportRoute('${route._id}')"
                                                >
                                                    Edit
                                                </button>

                                                <button
                                                    type="button"
                                                    class="btn btn-danger btn-small"
                                                    onclick="deleteTransportRoute('${route._id}')"
                                                >
                                                    Delete
                                                </button>

                                            </td>

                                        </tr>

                                    `;

                                }).join("")}

                            </tbody>

                        </table>

                    </div>

                `
                    : `

                    <div class="empty-state">

                        <div class="empty-icon">
                            🛣️
                        </div>

                        <h3>
                            No Routes Found
                        </h3>

                        <p>
                            Add your first transport route.
                        </p>

                    </div>

                `
            }

        </div>

    `;


    // ================================================
    // ADD VEHICLE BUTTON
    // ================================================

    document
        .getElementById("addVehicleButton")
        .addEventListener(
            "click",
            openAddVehicleForm
        );


    // ================================================
    // ADD ROUTE BUTTON
    // ================================================

    document
        .getElementById("addRouteButton")
        .addEventListener(
            "click",
            openAddRouteForm
        );

}
// =====================================================
// OPEN ADD VEHICLE FORM
// =====================================================

async function openAddVehicleForm() {

    moduleContent.innerHTML = `

        <div class="form-container">

            <h2>Add Transport Vehicle</h2>

            <form id="vehicleForm">

                <div class="form-grid">

                    <div class="form-group">

                        <label>Vehicle Number</label>

                        <input
                            type="text"
                            id="vehicleNumber"
                            placeholder="e.g. BR01AB1234"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label>Vehicle Type</label>

                        <select
                            id="vehicleType"
                            required
                        >

                            <option value="">
                                Select Vehicle Type
                            </option>

                            <option value="Bus">
                                Bus
                            </option>

                            <option value="Van">
                                Van
                            </option>

                            <option value="Mini Bus">
                                Mini Bus
                            </option>

                        </select>

                    </div>


                    <div class="form-group">

                        <label>Driver Name</label>

                        <input
                            type="text"
                            id="driverName"
                            placeholder="Enter driver name"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label>Driver Phone</label>

                        <input
                            type="tel"
                            id="driverPhone"
                            placeholder="Enter driver phone"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label>Capacity</label>

                        <input
                            type="number"
                            id="capacity"
                            min="1"
                            placeholder="Number of seats"
                            required
                        >

                    </div>


                   <div class="form-group">

    <label>Route</label>

    <select
        id="routeName"
        required
    >

        <option value="">
            Select Route
        </option>

    </select>

</div>

                </div>


                <div style="
                    margin-top:25px;
                    display:flex;
                    gap:12px;
                    flex-wrap:wrap;
                ">

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        Save Vehicle
                    </button>


                    <button
                        type="button"
                        class="secondary-button"
                        id="cancelVehicleButton"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    `;


    const form =
        document.getElementById(
            "vehicleForm"
        );


    form.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();

            await saveTransportVehicle();

        }
    );

    // =====================================================
// LOAD ROUTES INTO VEHICLE FORM
// =====================================================

try {

    const response =
        await fetch("/api/routes");

    const data =
        await response.json();

    if (!response.ok || !data.success) {

        throw new Error(
            data.message ||
            "Unable to load routes."
        );

    }

    const routeSelect =
        document.getElementById("routeName");


    (data.data || []).forEach(function (route) {

        const option =
            document.createElement("option");

        option.value =
            route.routeName || "";

        option.textContent =
            route.routeName || "";

        routeSelect.appendChild(option);

    });

} catch (error) {

    console.error(
        "Load Routes Error:",
        error
    );

    alert(
        error.message ||
        "Unable to load routes."
    );

}

    document
        .getElementById(
            "cancelVehicleButton"
        )
        .addEventListener(
            "click",
            loadTransport
        );

}
// =====================================================
// OPEN ADD ROUTE FORM
// =====================================================

function openAddRouteForm() {

    moduleContent.innerHTML = `

        <div class="form-container">

            <h2>Add Transport Route</h2>

            <form id="routeForm">

                <div class="form-grid">

                    <div class="form-group">

    <label>Route Name</label>

<input
    type="text"
    id="routeName"
    placeholder="e.g. JANA BAZAR"
    required
>

</div>


                    <div class="form-group">

                        <label>Starting Point</label>

                        <input
                            type="text"
                            id="startPoint"
                            placeholder="e.g. Main Road"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label>Destination</label>

                        <input
                            type="text"
                            id="destination"
                            placeholder="e.g. School"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label>Distance (KM)</label>

                        <input
                            type="number"
                            id="routeDistance"
                            min="0"
                            step="0.1"
                            placeholder="e.g. 12"
                        >

                    </div>


                    <div class="form-group">

                        <label>Stops</label>

                        <textarea
                            id="routeStops"
                            rows="4"
                            placeholder="Enter stops separated by comma"
                        ></textarea>

                    </div>

                </div>


                <div style="
                    margin-top:25px;
                    display:flex;
                    gap:12px;
                    flex-wrap:wrap;
                ">

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        Save Route
                    </button>


                    <button
                        type="button"
                        class="secondary-button"
                        id="cancelRouteButton"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    `;


    document
        .getElementById("routeForm")
        .addEventListener(
            "submit",
            async function(event) {

                event.preventDefault();

                await saveTransportRoute();

            }
        );


    document
        .getElementById("cancelRouteButton")
        .addEventListener(
            "click",
            loadTransport
        );

}

// =====================================================
// SAVE TRANSPORT ROUTE
// =====================================================

async function saveTransportRoute() {

    const routeName =
        document.getElementById("routeName").value.trim();

    const startPoint =
        document.getElementById("startPoint").value.trim();

    const destination =
        document.getElementById("destination").value.trim();

    const distance =
        Number(
            document.getElementById("routeDistance").value
        ) || 0;

    const stopsText =
        document.getElementById("routeStops").value.trim();


    const stops =
        stopsText
            ? stopsText
                .split(",")
                .map(function(stop) {
                    return stop.trim();
                })
                .filter(Boolean)
            : [];


    if (
        !routeName ||
        !startPoint ||
        !destination
    ) {

        alert(
            "Please fill all required fields."
        );

        return;
    }


    try {

        const response =
            await fetch(
                "/api/routes",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        routeName:
                            routeName,

                        startPoint:
                            startPoint,

                        destination:
                            destination,

                        stops:
                            stops,

                        distance:
                            distance

                    })
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to save route."
            );

        }


        alert(
            "Route added successfully."
        );


        loadTransport();


    } catch (error) {

        console.error(
            "Save Transport Route Error:",
            error
        );


        alert(
            error.message ||
            "Unable to save route."
        );

    }

}
// =====================================================
// EDIT TRANSPORT ROUTE
// =====================================================

async function editTransportRoute(id) {

    try {

        const response =
            await fetch(
                "/api/routes/" + id
            );

        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to load route."
            );

        }


        const route =
            data.data;


        moduleContent.innerHTML = `

            <div class="form-container">

                <h2>Edit Transport Route</h2>

                <form id="editRouteForm">

                    <div class="form-grid">

                        <div class="form-group">

                            <label>Route Name</label>

                            <input
                                type="text"
                                id="editRouteName"
                                value="${escapeHtml(
                                    route.routeName || ""
                                )}"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label>Starting Point</label>

                            <input
                                type="text"
                                id="editStartPoint"
                                value="${escapeHtml(
                                    route.startPoint || ""
                                )}"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label>Destination</label>

                            <input
                                type="text"
                                id="editDestination"
                                value="${escapeHtml(
                                    route.destination || ""
                                )}"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label>Distance (KM)</label>

                            <input
                                type="number"
                                id="editRouteDistance"
                                min="0"
                                step="0.1"
                                value="${route.distance || 0}"
                            >

                        </div>


                        <div class="form-group">

                            <label>Stops</label>

                            <textarea
                                id="editRouteStops"
                                rows="4"
                                placeholder="Enter stops separated by comma"
                            >${escapeHtml(
                                (route.stops || []).join(", ")
                            )}</textarea>

                        </div>

                    </div>


                    <div style="
                        margin-top:25px;
                        display:flex;
                        gap:12px;
                        flex-wrap:wrap;
                    ">

                        <button
                            type="submit"
                            class="primary-button"
                        >
                            Update Route
                        </button>


                        <button
                            type="button"
                            class="secondary-button"
                            id="cancelEditRouteButton"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;


        document
            .getElementById("editRouteForm")
            .addEventListener(
                "submit",
                async function(event) {

                    event.preventDefault();

                    await updateTransportRoute(id);

                }
            );


        document
            .getElementById("cancelEditRouteButton")
            .addEventListener(
                "click",
                loadTransport
            );


    } catch (error) {

        console.error(
            "Edit Transport Route Error:",
            error
        );


        alert(
            error.message ||
            "Unable to load route."
        );

    }

}
// =====================================================
// UPDATE TRANSPORT ROUTE
// =====================================================

async function updateTransportRoute(id) {

    const routeName =
        document.getElementById("editRouteName").value.trim();

    const startPoint =
        document.getElementById("editStartPoint").value.trim();

    const destination =
        document.getElementById("editDestination").value.trim();

    const distance =
        Number(
            document.getElementById("editRouteDistance").value
        ) || 0;

    const stopsText =
        document.getElementById("editRouteStops").value.trim();

    const stops =
        stopsText
            ? stopsText
                .split(",")
                .map(function (stop) {
                    return stop.trim();
                })
                .filter(Boolean)
            : [];


    if (
        !routeName ||
        !startPoint ||
        !destination
    ) {

        alert(
            "Please fill all required fields."
        );

        return;
    }


    try {

        const response =
            await fetch(
                "/api/routes/" + id,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        routeName:
                            routeName,

                        startPoint:
                            startPoint,

                        destination:
                            destination,

                        stops:
                            stops,

                        distance:
                            distance

                    })
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to update route."
            );

        }


        alert(
            "Route updated successfully."
        );


        await loadTransport();


    } catch (error) {

        console.error(
            "Update Transport Route Error:",
            error
        );


        alert(
            error.message ||
            "Unable to update route."
        );

    }

}
// =====================================================
// DELETE TRANSPORT ROUTE
// =====================================================

async function deleteTransportRoute(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this route?"
    );

    if (!confirmed) {
        return;
    }


    try {

        const response =
            await fetch(
                "/api/routes/" + id,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to delete route."
            );

        }


        alert(
            "Route deleted successfully."
        );


        await loadTransport();


    } catch (error) {

        console.error(
            "Delete Transport Route Error:",
            error
        );


        alert(
            error.message ||
            "Unable to delete route."
        );

    }

}
window.deleteTransportRoute = deleteTransportRoute;
window.editTransportRoute = editTransportRoute;
// =====================================================
// EDIT TRANSPORT VEHICLE
// =====================================================

async function editTransportVehicle(id) {

    try {

        const response = await fetch(
            "/api/transport/" + id
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.message ||
                "Unable to load vehicle."
            );
        }

        const vehicle = data.data;

        moduleContent.innerHTML = `

            <div class="form-container">

                <h2>Edit Transport Vehicle</h2>

                <form id="editVehicleForm">

                    <div class="form-grid">

                        <div class="form-group">
                            <label>Vehicle Number</label>
                            <input
                                type="text"
                                id="editVehicleNumber"
                                value="${escapeHtml(vehicle.vehicleNumber || "")}"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label>Vehicle Type</label>

                            <select
                                id="editVehicleType"
                                required
                            >
                                <option value="Bus"
                                    ${vehicle.vehicleType === "Bus" ? "selected" : ""}>
                                    Bus
                                </option>

                                <option value="Van"
                                    ${vehicle.vehicleType === "Van" ? "selected" : ""}>
                                    Van
                                </option>

                                <option value="Mini Bus"
                                    ${vehicle.vehicleType === "Mini Bus" ? "selected" : ""}>
                                    Mini Bus
                                </option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Driver Name</label>
                            <input
                                type="text"
                                id="editDriverName"
                                value="${escapeHtml(vehicle.driverName || "")}"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label>Driver Phone</label>
                            <input
                                type="tel"
                                id="editDriverPhone"
                                value="${escapeHtml(vehicle.driverPhone || "")}"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label>Capacity</label>
                            <input
                                type="number"
                                id="editCapacity"
                                min="1"
                                value="${vehicle.capacity || 1}"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label>Route Name</label>
                            <input
                                type="text"
                                id="editRouteName"
                                value="${escapeHtml(vehicle.routeName || "")}"
                                required
                            >
                        </div>

                    </div>

                    <div style="margin-top:25px;">

                        <button
                            type="submit"
                            class="primary-button"
                        >
                            Update Vehicle
                        </button>

                        <button
                            type="button"
                            class="secondary-button"
                            onclick="loadTransport()"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>
        `;

        document
            .getElementById("editVehicleForm")
            .addEventListener(
                "submit",
                async function(event) {

                    event.preventDefault();

                    await updateTransportVehicle(id);

                }
            );

    } catch (error) {

        console.error(
            "Edit Transport Vehicle Error:",
            error
        );

        alert(
            error.message ||
            "Unable to load vehicle."
        );

    }

}
// =====================================================
// UPDATE TRANSPORT VEHICLE
// =====================================================

async function updateTransportVehicle(id) {

    const vehicleNumber =
        document.getElementById("editVehicleNumber").value.trim();

    const vehicleType =
        document.getElementById("editVehicleType").value;

    const driverName =
        document.getElementById("editDriverName").value.trim();

    const driverPhone =
        document.getElementById("editDriverPhone").value.trim();

    const capacity =
        Number(
            document.getElementById("editCapacity").value
        );

    const routeName =
        document.getElementById("editRouteName").value.trim();


    if (
        !vehicleNumber ||
        !vehicleType ||
        !driverName ||
        !driverPhone ||
        !capacity ||
        !routeName
    ) {

        alert(
            "Please fill all vehicle details."
        );

        return;
    }


    try {

        const response =
            await fetch(
                "/api/transport/" + id,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        vehicleNumber:
                            vehicleNumber,

                        vehicleType:
                            vehicleType,

                        driverName:
                            driverName,

                        driverPhone:
                            driverPhone,

                        capacity:
                            capacity,

                        routeName:
                            routeName,

                        status:
                            "active"

                    })
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to update vehicle."
            );

        }


        alert(
            "Vehicle updated successfully."
        );


        loadTransport();


    } catch (error) {

        console.error(
            "Update Transport Vehicle Error:",
            error
        );


        alert(
            error.message ||
            "Unable to update vehicle."
        );

    }

}
// =====================================================
// DELETE TRANSPORT VEHICLE
// =====================================================

async function deleteTransportVehicle(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this vehicle?"
        );

    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(
                "/api/transport/" + id,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to delete vehicle."
            );

        }


        alert(
            "Vehicle deleted successfully."
        );


        loadTransport();


    } catch (error) {

        console.error(
            "Delete Transport Vehicle Error:",
            error
        );


        alert(
            error.message ||
            "Unable to delete vehicle."
        );

    }

}
window.deleteTransportVehicle = deleteTransportVehicle;
window.editTransportVehicle = editTransportVehicle;
// =====================================================
// SAVE TRANSPORT VEHICLE
// =====================================================

async function saveTransportVehicle() {

    const vehicleNumber =
        document.getElementById("vehicleNumber").value.trim();

    const vehicleType =
        document.getElementById("vehicleType").value;

    const driverName =
        document.getElementById("driverName").value.trim();

    const driverPhone =
        document.getElementById("driverPhone").value.trim();

    const capacity =
        Number(
            document.getElementById("capacity").value
        );

    const routeName =
        document.getElementById("routeName").value.trim();


    if (
        !vehicleNumber ||
        !vehicleType ||
        !driverName ||
        !driverPhone ||
        !capacity ||
        !routeName
    ) {

        alert(
            "Please fill all vehicle details."
        );

        return;
    }


    try {

        const response =
            await fetch(
                "/api/transport",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        vehicleNumber:
                            vehicleNumber,

                        vehicleType:
                            vehicleType,

                        driverName:
                            driverName,

                        driverPhone:
                            driverPhone,

                        capacity:
                            capacity,

                        routeName:
                            routeName

                    })
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to save vehicle."
            );

        }


        alert(
            "Vehicle added successfully."
        );


        loadTransport();


    } catch (error) {

        console.error(
            "Save Transport Vehicle Error:",
            error
        );


        alert(
            error.message ||
            "Unable to save vehicle."
        );

    }

}
// =====================================================
// RENDER ISSUE HISTORY
// =====================================================

function renderLibraryIssues(issues) {

    const existingSection =
        document.getElementById(
            "libraryIssueHistory"
        );

    if (existingSection) {
        existingSection.remove();
    }


    const section =
        document.createElement("div");

    section.id =
        "libraryIssueHistory";

    section.style.marginTop =
        "30px";


    section.innerHTML = `

        <div class="table-container">

            <div class="table-header">

                <h2>Issue History</h2>

            </div>

            ${
                issues.length
                    ? `
                        <div class="table-wrapper">

                            <table>

                                <thead>

                                    <tr>

                                        <th>Student</th>

                                        <th>Book</th>

                                        <th>Issue Date</th>

                                        <th>Due Date</th>

                                        <th>Status</th>
                                        <th>Actions</th>

                                    </tr>

                                </thead>

                                <tbody>

                                    ${issues.map(function (issue) {

                                        const student =
                                            issue.student || {};

                                        const book =
                                            issue.book || {};

                                        const studentName =
                                            student.firstName ||
                                            student.name ||
                                            "Unknown Student";

                                        const lastName =
                                            student.lastName ||
                                            "";

                                        return `

                                            <tr>

                                                <td>
                                                    ${escapeHtml(
                                                        `${studentName} ${lastName}`.trim()
                                                    )}
                                                </td>

                                                <td>
                                                    ${escapeHtml(
                                                        book.title ||
                                                        "Unknown Book"
                                                    )}
                                                </td>

                                                <td>
                                                    ${formatLibraryDate(
                                                        issue.issueDate
                                                    )}
                                                </td>

                                                <td>
                                                    ${formatLibraryDate(
                                                        issue.dueDate
                                                    )}
                                                </td>

                                                <td>
                                                    <span class="status-badge">
                                                        ${escapeHtml(
                                                            issue.status ||
                                                            "issued"
                                                        )}
                                                    </span>
                                                </td>
                                                <td>

    ${
        issue.status !== "returned"
            ? `
                <button
                    type="button"
                    class="primary-button return-library-book-button"
                    data-id="${escapeHtml(issue._id)}"
                    style="
                        padding:8px 12px;
                    "
                >
                    ↩ Return
                </button>
              `
            : `
                <span>
                    Returned
                </span>
              `
    }

</td>

                                            </tr>

                                        `;

                                    }).join("")}

                                </tbody>

                            </table>

                        </div>
                    `
                    : `
                        <div class="empty-state">

                            <div class="empty-icon">
                                📕
                            </div>

                            <h3>
                                No Books Issued
                            </h3>

                            <p>
                                No library books have been issued yet.
                            </p>

                        </div>
                    `
            }

        </div>

    `;


    moduleContent.appendChild(
        section
    );


document
    .querySelectorAll(
        ".return-library-book-button"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                returnLibraryBook(
                    button.dataset.id
                );

            }
        );

    });
}
// =====================================================
// RETURN LIBRARY BOOK
// =====================================================

async function returnLibraryBook(issueId) {

    const confirmed =
        confirm(
            "Are you sure you want to return this book?"
        );

    if (!confirmed) {
        return;
    }

    try {

        const response =
            await fetch(
                `/api/library/return/${encodeURIComponent(issueId)}`,
                {
                    method: "PUT"
                }
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to return book."
            );

        }

        alert(
            "Book returned successfully."
        );

        await loadLibrary();

    } catch (error) {

        console.error(
            "Return Library Book Error:",
            error
        );

        alert(
            error.message
        );

    }

}

// =====================================================
// FORMAT LIBRARY DATE
// =====================================================

function formatLibraryDate(date) {

    if (!date) {
        return "-";
    }

    return new Date(date)
        .toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric"
        });

}
// =====================================================
// OPEN ISSUE BOOK FORM
// =====================================================

async function openIssueBookForm() {

    moduleContent.innerHTML = `
        <div class="form-container">

            <h2>Issue Book</h2>

            <div class="empty-state">
                <div class="empty-icon">📚</div>
                <h3>Loading...</h3>
                <p>Students and books are being loaded.</p>
            </div>

        </div>
    `;

    try {

        const [studentsResponse, booksResponse] =
            await Promise.all([
                fetch("/api/students"),
                fetch("/api/library")
            ]);

        const studentsData =
            await studentsResponse.json();

        const booksData =
            await booksResponse.json();

        if (
            !studentsResponse.ok ||
            !studentsData.success
        ) {
            throw new Error(
                studentsData.message ||
                "Unable to load students."
            );
        }

        if (
            !booksResponse.ok ||
            !booksData.success
        ) {
            throw new Error(
                booksData.message ||
                "Unable to load books."
            );
        }

        const students =
            studentsData.data || [];

        const books =
            (booksData.data || [])
                .filter(function (book) {

                    return (
                        book.status === "active" &&
                        book.availableCopies > 0
                    );

                });


        moduleContent.innerHTML = `

            <div class="form-container">

                <h2>Issue Book</h2>

                <form id="issueBookForm">

                    <div class="form-grid">

                        <div class="form-group">

                            <label>Student</label>

                            <select
                                id="issueStudent"
                                required
                            >

                                <option value="">
                                    Select Student
                                </option>

                                ${students.map(function (student) {

                                    return `
                                        <option
                                            value="${student._id}"
                                        >
                                            ${escapeHtml(
                                                (
                                                    student.firstName ||
                                                    student.name ||
                                                    "Student"
                                                ) +
                                                (
                                                    student.lastName
                                                        ? " " + student.lastName
                                                        : ""
                                                )
                                            )}
                                        </option>
                                    `;

                                }).join("")}

                            </select>

                        </div>


                        <div class="form-group">

                            <label>Book</label>

                            <select
                                id="issueBook"
                                required
                            >

                                <option value="">
                                    Select Book
                                </option>

                                ${books.map(function (book) {

                                    return `
                                        <option
                                            value="${book._id}"
                                        >
                                            ${escapeHtml(
                                                book.title
                                            )}
                                            -
                                            Available:
                                            ${book.availableCopies}
                                        </option>
                                    `;

                                }).join("")}

                            </select>

                        </div>


                        <div class="form-group">

                            <label>Issue Date</label>

                            <input
                                type="date"
                                id="issueDate"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label>Due Date</label>

                            <input
                                type="date"
                                id="dueDate"
                                required
                            >

                        </div>

                    </div>


                    <div style="margin-top:25px;">

                        <button
                            type="submit"
                            class="primary-button"
                        >
                            Issue Book
                        </button>

                        <button
                            type="button"
                            class="secondary-button"
                            onclick="loadLibrary()"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;


        // Today's date
        const today =
            new Date()
                .toISOString()
                .split("T")[0];

        document.getElementById(
            "issueDate"
        ).value = today;


        document
            .getElementById("issueBookForm")
            .addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();

                    issueLibraryBook();

                }
            );


    } catch (error) {

        console.error(
            "Issue Book Form Error:",
            error
        );

        alert(
            error.message ||
            "Unable to open issue book form."
        );

        loadLibrary();

    }

}
// =====================================================
// ISSUE LIBRARY BOOK
// =====================================================

async function issueLibraryBook() {

    const studentId =
        document.getElementById("issueStudent").value;

    const bookId =
        document.getElementById("issueBook").value;

    const issueDate =
        document.getElementById("issueDate").value;

    const dueDate =
        document.getElementById("dueDate").value;


    if (!studentId) {
        alert("Please select a student.");
        return;
    }


    if (!bookId) {
        alert("Please select a book.");
        return;
    }


    if (!issueDate || !dueDate) {
        alert("Please select issue and due dates.");
        return;
    }


    if (dueDate < issueDate) {
        alert("Due date cannot be before issue date.");
        return;
    }


    try {

        const response =
            await fetch("/api/library/issue", {

                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({

                    studentId:
                        studentId,

                    bookId:
                        bookId,

                    issueDate:
                        issueDate,

                    dueDate:
                        dueDate

                })

            });


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to issue book."
            );

        }


        alert(
            data.message ||
            "Book issued successfully."
        );


        loadLibrary();


    } catch (error) {

        console.error(
            "Issue Library Book Error:",
            error
        );


        alert(
            error.message ||
            "Unable to issue book."
        );

    }

}

// =====================================================
// RENDER LIBRARY
// =====================================================

function renderLibrary(books) {

    if (!books.length) {

        moduleContent.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    📚
                </div>

                <h3>
                    No Books Found
                </h3>

                <p>
                    Add your first library book.
                </p>

            </div>
        `;

        return;
    }


    moduleContent.innerHTML = `
    <div class="library-controls">

    <input
        type="text"
        id="librarySearch"
        placeholder="🔎 Search by title, author, ISBN..."
        style="
            padding:10px;
            width:300px;
            border-radius:6px;
            border:1px solid #ccc;
            margin-bottom:15px;
        "
    >

    <select
        id="libraryCategoryFilter"
        style="
            padding:10px;
            margin-left:10px;
            border-radius:6px;
            border:1px solid #ccc;
        "
    >
        <option value="">All Categories</option>

        ${[
            ...new Set(
                books.map(function (book) {
                    return book.category || "General";
                })
            )
        ].map(function (category) {

            return `
                <option value="${escapeHtml(category)}">
                    ${escapeHtml(category)}
                </option>
            `;

        }).join("")}

    </select>

</div>

        <div class="table-container">

            <table class="data-table">

                <thead>

                    <tr>

                        <th>Book Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>ISBN</th>
                        <th>Category</th>
                        <th>Total Copies</th>
                        <th>Available</th>
                        <th>Shelf</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>

                    ${books.map(function (book) {

                        return `

                            <tr>

                                <td>
                                    ${escapeHtml(
                                        book.title || ""
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        book.author || ""
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        book.publisher || ""
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        book.isbn || ""
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        book.category || "General"
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        String(
                                            book.totalCopies || 0
                                        )
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        String(
                                            book.availableCopies || 0
                                        )
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        book.shelfNumber || ""
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        book.status || "active"
                                    )}
                                </td>

                                <td>

                                    <button
                                        class="btn btn-small"
                                        onclick="editLibraryBook('${book._id}')"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        class="btn btn-danger btn-small"
                                        onclick="deleteLibraryBook('${book._id}')"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        `;

                    }).join("")}

                </tbody>

            </table>

        </div>

    `;

    // =====================================================
// LIBRARY SEARCH + CATEGORY FILTER
// =====================================================

const librarySearch =
    document.getElementById("librarySearch");

const libraryCategoryFilter =
    document.getElementById(
        "libraryCategoryFilter"
    );

const libraryTableBody =
    document.querySelector(
        ".data-table tbody"
    );


function filterLibraryBooks() {

    const searchText =
        (librarySearch?.value || "")
            .toLowerCase()
            .trim();

    const selectedCategory =
        libraryCategoryFilter?.value || "";


    const filteredBooks =
        books.filter(function (book) {

            const title =
                (book.title || "")
                    .toLowerCase();

            const author =
                (book.author || "")
                    .toLowerCase();

            const isbn =
                (book.isbn || "")
                    .toLowerCase();

            const category =
                book.category ||
                "General";


            const matchesSearch =
                !searchText ||
                title.includes(searchText) ||
                author.includes(searchText) ||
                isbn.includes(searchText);


            const matchesCategory =
                !selectedCategory ||
                category === selectedCategory;


            return (
                matchesSearch &&
                matchesCategory
            );

        });


    libraryTableBody.innerHTML =
        filteredBooks.map(function (book) {

            return `

                <tr>

                    <td>
                        ${escapeHtml(
                            book.title || ""
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            book.author || ""
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            book.publisher || ""
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            book.isbn || ""
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            book.category ||
                            "General"
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            String(
                                book.totalCopies || 0
                            )
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            String(
                                book.availableCopies || 0
                            )
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            book.shelfNumber || ""
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            book.status ||
                            "active"
                        )}
                    </td>

                    <td>

                        <button
                            class="btn btn-small"
                            onclick="editLibraryBook('${book._id}')"
                        >
                            Edit
                        </button>

                        <button
                            class="btn btn-danger btn-small"
                            onclick="deleteLibraryBook('${book._id}')"
                        >
                            Delete
                        </button>

                    </td>

                </tr>

            `;

        }).join("");

}


if (librarySearch) {

    librarySearch.addEventListener(
        "input",
        filterLibraryBooks
    );

}


if (libraryCategoryFilter) {

    libraryCategoryFilter.addEventListener(
        "change",
        filterLibraryBooks
    );

}

}
// =====================================================
// ADD BOOK FORM
// =====================================================

function openAddBookForm() {

    moduleContent.innerHTML = `

        <div class="form-container">

            <h2>Add Library Book</h2>

            <form id="libraryBookForm">

                <div class="form-grid">

                    <div class="form-group">

                        <label>Book Title</label>

                        <input
                            type="text"
                            id="bookTitle"
                            placeholder="Enter book title"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label>Author</label>

                        <input
                            type="text"
                            id="bookAuthor"
                            placeholder="Enter author name"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label>Publisher</label>

                        <input
                            type="text"
                            id="bookPublisher"
                            placeholder="Enter publisher"
                        >

                    </div>


                    <div class="form-group">

                        <label>ISBN</label>

                        <input
                            type="text"
                            id="bookISBN"
                            placeholder="Enter ISBN"
                        >

                    </div>


                    <div class="form-group">

                        <label>Category</label>

                        <select id="bookCategory">

                            <option value="General">
                                General
                            </option>

                            <option value="Science">
                                Science
                            </option>

                            <option value="Mathematics">
                                Mathematics
                            </option>

                            <option value="English">
                                English
                            </option>

                            <option value="Hindi">
                                Hindi
                            </option>

                            <option value="Computer">
                                Computer
                            </option>

                            <option value="History">
                                History
                            </option>

                            <option value="Geography">
                                Geography
                            </option>

                            <option value="Other">
                                Other
                            </option>

                        </select>

                    </div>


                    <div class="form-group">

                        <label>Total Copies</label>

                        <input
                            type="number"
                            id="bookTotalCopies"
                            min="1"
                            value="1"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label>Shelf Number</label>

                        <input
                            type="text"
                            id="bookShelfNumber"
                            placeholder="e.g. A-12"
                        >

                    </div>


                    <div class="form-group">

                        <label>Status</label>

                        <select id="bookStatus">

                            <option value="active">
                                Active
                            </option>

                            <option value="inactive">
                                Inactive
                            </option>

                        </select>

                    </div>


                    <div
                        class="form-group"
                        style="grid-column: 1 / -1;"
                    >

                        <label>Description</label>

                        <textarea
                            id="bookDescription"
                            rows="5"
                            placeholder="Enter book description..."
                        ></textarea>

                    </div>

                </div>


                <div style="margin-top:25px;">

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        Save Book
                    </button>


                    <button
                        type="button"
                        class="secondary-button"
                        onclick="loadLibrary()"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    `;


    document
        .getElementById("libraryBookForm")
        .addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                saveLibraryBook();

            }
        );

}
// =====================================================
// SAVE LIBRARY BOOK
// =====================================================

async function saveLibraryBook() {

    const title =
        document.getElementById("bookTitle").value.trim();

    const author =
        document.getElementById("bookAuthor").value.trim();

    const publisher =
        document.getElementById("bookPublisher").value.trim();

    const isbn =
        document.getElementById("bookISBN").value.trim();

    const category =
        document.getElementById("bookCategory").value;

    const totalCopies =
        Number(
            document.getElementById("bookTotalCopies").value
        );

    const shelfNumber =
        document.getElementById("bookShelfNumber").value.trim();

    const description =
        document.getElementById("bookDescription").value.trim();

    const status =
        document.getElementById("bookStatus").value;


    if (
        !title ||
        !author ||
        !totalCopies
    ) {

        alert(
            "Book title, author and total copies are required."
        );

        return;
    }


    if (
        !Number.isInteger(totalCopies) ||
        totalCopies < 1
    ) {

        alert(
            "Total copies must be at least 1."
        );

        return;
    }


    try {

        const response =
            await fetch("/api/library", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    title:
                        title,

                    author:
                        author,

                    publisher:
                        publisher,

                    isbn:
                        isbn,

                    category:
                        category,

                    totalCopies:
                        totalCopies,

                    shelfNumber:
                        shelfNumber,

                    description:
                        description,

                    status:
                        status

                })

            });


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to add book."
            );

        }


        alert(
            "Book added successfully."
        );


        loadLibrary();


    } catch (error) {

        console.error(
            "Save Library Book Error:",
            error
        );


        alert(
            error.message ||
            "Unable to add book."
        );

    }

}
// =====================================================
// EDIT LIBRARY BOOK
// =====================================================

async function editLibraryBook(id) {

    try {

        const response =
            await fetch(`/api/library/${id}`);

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to load book."
            );

        }

        const book = data.data;


        moduleContent.innerHTML = `

            <div class="form-container">

                <h2>Edit Library Book</h2>

                <form id="editLibraryBookForm">

                    <div class="form-grid">

                        <div class="form-group">

                            <label>Book Title</label>

                            <input
                                type="text"
                                id="editBookTitle"
                                value="${escapeHtml(book.title || "")}"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label>Author</label>

                            <input
                                type="text"
                                id="editBookAuthor"
                                value="${escapeHtml(book.author || "")}"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label>Publisher</label>

                            <input
                                type="text"
                                id="editBookPublisher"
                                value="${escapeHtml(book.publisher || "")}"
                            >

                        </div>


                        <div class="form-group">

                            <label>ISBN</label>

                            <input
                                type="text"
                                id="editBookISBN"
                                value="${escapeHtml(book.isbn || "")}"
                            >

                        </div>


                        <div class="form-group">

                            <label>Category</label>

                            <select id="editBookCategory">

                                ${[
                                    "General",
                                    "Science",
                                    "Mathematics",
                                    "English",
                                    "Hindi",
                                    "Computer",
                                    "History",
                                    "Geography",
                                    "Other"
                                ].map(function (category) {

                                    return `
                                        <option
                                            value="${category}"
                                            ${book.category === category ? "selected" : ""}
                                        >
                                            ${category}
                                        </option>
                                    `;

                                }).join("")}

                            </select>

                        </div>


                        <div class="form-group">

                            <label>Total Copies</label>

                            <input
                                type="number"
                                id="editBookTotalCopies"
                                min="1"
                                value="${book.totalCopies || 1}"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label>Shelf Number</label>

                            <input
                                type="text"
                                id="editBookShelfNumber"
                                value="${escapeHtml(book.shelfNumber || "")}"
                            >

                        </div>


                        <div class="form-group">

                            <label>Status</label>

                            <select id="editBookStatus">

                                <option
                                    value="active"
                                    ${book.status === "active" ? "selected" : ""}
                                >
                                    Active
                                </option>

                                <option
                                    value="inactive"
                                    ${book.status === "inactive" ? "selected" : ""}
                                >
                                    Inactive
                                </option>

                            </select>

                        </div>


                        <div
                            class="form-group"
                            style="grid-column: 1 / -1;"
                        >

                            <label>Description</label>

                            <textarea
                                id="editBookDescription"
                                rows="5"
                            >${escapeHtml(book.description || "")}</textarea>

                        </div>

                    </div>


                    <div style="margin-top:25px;">

                        <button
                            type="submit"
                            class="primary-button"
                        >
                            Update Book
                        </button>


                        <button
                            type="button"
                            class="secondary-button"
                            onclick="loadLibrary()"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;


        document
            .getElementById("editLibraryBookForm")
            .addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();

                    updateLibraryBook(id);

                }
            );


    } catch (error) {

        console.error(
            "Edit Library Book Error:",
            error
        );

        alert(
            error.message ||
            "Unable to load book."
        );

    }

}

// =====================================================
// UPDATE LIBRARY BOOK
// =====================================================

async function updateLibraryBook(id) {

    const title =
        document.getElementById("editBookTitle").value.trim();

    const author =
        document.getElementById("editBookAuthor").value.trim();

    const publisher =
        document.getElementById("editBookPublisher").value.trim();

    const isbn =
        document.getElementById("editBookISBN").value.trim();

    const category =
        document.getElementById("editBookCategory").value;

    const totalCopies =
        Number(
            document.getElementById("editBookTotalCopies").value
        );

    const shelfNumber =
        document.getElementById("editBookShelfNumber").value.trim();

    const description =
        document.getElementById("editBookDescription").value.trim();

    const status =
        document.getElementById("editBookStatus").value;


    if (
        !title ||
        !author ||
        !totalCopies
    ) {

        alert(
            "Book title, author and total copies are required."
        );

        return;
    }


    if (
        !Number.isInteger(totalCopies) ||
        totalCopies < 1
    ) {

        alert(
            "Total copies must be at least 1."
        );

        return;
    }


    try {

        const response =
            await fetch(`/api/library/${id}`, {

                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    title:
                        title,

                    author:
                        author,

                    publisher:
                        publisher,

                    isbn:
                        isbn,

                    category:
                        category,

                    totalCopies:
                        totalCopies,

                    shelfNumber:
                        shelfNumber,

                    description:
                        description,

                    status:
                        status

                })

            });


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to update book."
            );

        }


        alert(
            "Book updated successfully."
        );


        loadLibrary();


    } catch (error) {

        console.error(
            "Update Library Book Error:",
            error
        );


        alert(
            error.message ||
            "Unable to update book."
        );

    }

}
// =====================================================
// DELETE LIBRARY BOOK
// =====================================================

async function deleteLibraryBook(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this book?"
        );

    if (!confirmDelete) {
        return;
    }

    try {

        const response =
            await fetch(`/api/library/${id}`, {
                method: "DELETE"
            });

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to delete book."
            );

        }

        alert(
            "Book deleted successfully."
        );

        loadLibrary();

    } catch (error) {

        console.error(
            "Delete Library Book Error:",
            error
        );

        alert(
            error.message ||
            "Unable to delete book."
        );

    }

}
// =====================================================
// RENDER NOTICES
// =====================================================

function renderNotices(notices) {

    if (!notices.length) {

        moduleContent.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    📢
                </div>

                <h3>
                    No Notices Found
                </h3>

                <p>
                    Add your first notice.
                </p>

            </div>
        `;

        return;
    }


    moduleContent.innerHTML = `

        <div class="table-container">

            <table class="data-table">

                <thead>

                    <tr>

                        <th>Title</th>
                        <th>Description</th>
                        <th>Notice Date</th>
                        <th>Expiry Date</th>
                        <th>Audience</th>
                        <th>Status</th>
                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>

                    ${notices.map(function (item) {

                        return `

                            <tr>

                                <td>
                                    ${escapeHtml(
                                        item.title || ""
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        item.description || ""
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        item.noticeDate
                                            ? new Date(
                                                item.noticeDate
                                            ).toLocaleDateString()
                                            : ""
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        item.expiryDate
                                            ? new Date(
                                                item.expiryDate
                                            ).toLocaleDateString()
                                            : "No Expiry"
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        item.audience || "All"
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        item.status || "active"
                                    )}
                                </td>

                                <td>

                                    <button
                                        class="secondary-button"
                                        onclick="editNotice('${item._id}')"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        class="danger-button"
                                        onclick="deleteNotice('${item._id}')"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        `;

                    }).join("")}

                </tbody>

            </table>

        </div>

    `;

}
// =====================================================
// ADD NOTICE FORM
// =====================================================

function openAddNoticeForm() {

    moduleContent.innerHTML = `

        <div class="form-container">

            <h2>Add Notice</h2>

            <form id="noticeForm">

                <div class="form-grid">

                    <div class="form-group">

                        <label>Notice Title</label>

                        <input
                            type="text"
                            id="noticeTitle"
                            placeholder="e.g. Annual Function Notice"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label>Notice Date</label>

                        <input
                            type="date"
                            id="noticeDate"
                            required
                        >

                    </div>


                    <div class="form-group">

                        <label>Expiry Date</label>

                        <input
                            type="date"
                            id="noticeExpiryDate"
                        >

                    </div>


                    <div class="form-group">

                        <label>Audience</label>

                        <select id="noticeAudience">

                            <option value="All">
                                All
                            </option>

                            <option value="Students">
                                Students
                            </option>

                            <option value="Teachers">
                                Teachers
                            </option>

                            <option value="Parents">
                                Parents
                            </option>

                        </select>

                    </div>


                    <div class="form-group">

                        <label>Status</label>

                        <select id="noticeStatus">

                            <option value="active">
                                Active
                            </option>

                            <option value="inactive">
                                Inactive
                            </option>

                        </select>

                    </div>


                    <div
                        class="form-group"
                        style="grid-column: 1 / -1;"
                    >

                        <label>Description</label>

                        <textarea
                            id="noticeDescription"
                            rows="6"
                            placeholder="Enter notice details..."
                            required
                        ></textarea>

                    </div>

                </div>


                <div style="margin-top:25px;">

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        Save Notice
                    </button>


                    <button
                        type="button"
                        class="secondary-button"
                        onclick="loadNotices()"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    `;


    const noticeForm =
        document.getElementById("noticeForm");


    noticeForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            saveNotice();

        }
    );

}

// =====================================================
// SAVE NOTICE
// =====================================================

async function saveNotice() {

    const title =
        document.getElementById("noticeTitle").value.trim();

    const description =
        document.getElementById("noticeDescription").value.trim();

    const noticeDate =
        document.getElementById("noticeDate").value;

    const expiryDate =
        document.getElementById("noticeExpiryDate").value;

    const audience =
        document.getElementById("noticeAudience").value;

    const status =
        document.getElementById("noticeStatus").value;


    if (!title || !description || !noticeDate) {

        alert(
            "Title, description and notice date are required."
        );

        return;
    }


    try {

        const response =
            await fetch("/api/notices", {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    title:
                        title,

                    description:
                        description,

                    noticeDate:
                        noticeDate,

                    expiryDate:
                        expiryDate || null,

                    audience:
                        audience,

                    status:
                        status

                })

            });


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to add notice."
            );

        }


        alert(
            "Notice added successfully."
        );


        loadNotices();


    } catch (error) {

        console.error(
            "Save Notice Error:",
            error
        );


        alert(
            error.message ||
            "Unable to add notice."
        );

    }

}
// =====================================================
// EDIT NOTICE
// =====================================================

async function editNotice(id) {

    try {

        const response =
            await fetch(`/api/notices/${id}`);

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {
            throw new Error(
                data.message ||
                "Unable to load notice."
            );
        }

        const notice = data.data;

        moduleContent.innerHTML = `

            <div class="form-container">

                <h2>Edit Notice</h2>

                <form id="editNoticeForm">

                    <div class="form-grid">

                        <div class="form-group">

                            <label>Notice Title</label>

                            <input
                                type="text"
                                id="editNoticeTitle"
                                value="${escapeHtml(notice.title || "")}"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label>Notice Date</label>

                            <input
                                type="date"
                                id="editNoticeDate"
                                value="${
                                    notice.noticeDate
                                        ? new Date(notice.noticeDate)
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                }"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label>Expiry Date</label>

                            <input
                                type="date"
                                id="editNoticeExpiryDate"
                                value="${
                                    notice.expiryDate
                                        ? new Date(notice.expiryDate)
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                }"
                            >

                        </div>


                        <div class="form-group">

                            <label>Audience</label>

                            <select id="editNoticeAudience">

                                <option value="All"
                                    ${notice.audience === "All" ? "selected" : ""}>
                                    All
                                </option>

                                <option value="Students"
                                    ${notice.audience === "Students" ? "selected" : ""}>
                                    Students
                                </option>

                                <option value="Teachers"
                                    ${notice.audience === "Teachers" ? "selected" : ""}>
                                    Teachers
                                </option>

                                <option value="Parents"
                                    ${notice.audience === "Parents" ? "selected" : ""}>
                                    Parents
                                </option>

                            </select>

                        </div>


                        <div class="form-group">

                            <label>Status</label>

                            <select id="editNoticeStatus">

                                <option value="active"
                                    ${notice.status === "active" ? "selected" : ""}>
                                    Active
                                </option>

                                <option value="inactive"
                                    ${notice.status === "inactive" ? "selected" : ""}>
                                    Inactive
                                </option>

                            </select>

                        </div>


                        <div
                            class="form-group"
                            style="grid-column: 1 / -1;"
                        >

                            <label>Description</label>

                            <textarea
                                id="editNoticeDescription"
                                rows="6"
                                required
                            >${escapeHtml(notice.description || "")}</textarea>

                        </div>

                    </div>


                    <div style="margin-top:25px;">

                        <button
                            type="submit"
                            class="primary-button"
                        >
                            Update Notice
                        </button>

                        <button
                            type="button"
                            class="secondary-button"
                            onclick="loadNotices()"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;


        document
            .getElementById("editNoticeForm")
            .addEventListener(
                "submit",
                function (event) {

                    event.preventDefault();

                    updateNotice(id);

                }
            );


    } catch (error) {

        console.error(
            "Edit Notice Error:",
            error
        );

        alert(
            error.message ||
            "Unable to load notice."
        );

    }

}

// =====================================================
// UPDATE NOTICE
// =====================================================

async function updateNotice(id) {

    const title =
        document.getElementById("editNoticeTitle").value.trim();

    const description =
        document.getElementById("editNoticeDescription").value.trim();

    const noticeDate =
        document.getElementById("editNoticeDate").value;

    const expiryDate =
        document.getElementById("editNoticeExpiryDate").value;

    const audience =
        document.getElementById("editNoticeAudience").value;

    const status =
        document.getElementById("editNoticeStatus").value;


    if (!title || !description || !noticeDate) {

        alert(
            "Title, description and notice date are required."
        );

        return;
    }


    try {

        const response =
            await fetch(`/api/notices/${id}`, {

                method: "PUT",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    title:
                        title,

                    description:
                        description,

                    noticeDate:
                        noticeDate,

                    expiryDate:
                        expiryDate || null,

                    audience:
                        audience,

                    status:
                        status

                })

            });


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to update notice."
            );

        }


        alert(
            "Notice updated successfully."
        );


        loadNotices();


    } catch (error) {

        console.error(
            "Update Notice Error:",
            error
        );


        alert(
            error.message ||
            "Unable to update notice."
        );

    }

}
// =====================================================
// DELETE NOTICE
// =====================================================

async function deleteNotice(id) {

    const confirmDelete =
        confirm(
            "Are you sure you want to delete this notice?"
        );

    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(`/api/notices/${id}`, {

                method: "DELETE"

            });


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to delete notice."
            );

        }


        alert(
            "Notice deleted successfully."
        );


        loadNotices();


    } catch (error) {

        console.error(
            "Delete Notice Error:",
            error
        );


        alert(
            error.message ||
            "Unable to delete notice."
        );

    }

}
// =====================================================
// RENDER HOMEWORK
// =====================================================

function renderHomework(homework) {

    if (!homework.length) {

        moduleContent.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    📝
                </div>

                <h3>
                    No Homework Found
                </h3>

                <p>
                    Add your first homework.
                </p>

            </div>
        `;

        return;
    }


    moduleContent.innerHTML = `

        <div class="table-container">

            <table class="data-table">

                <thead>

                    <tr>

                        <th>Class</th>

                        <th>Section</th>

                        <th>Subject</th>

                        <th>Teacher</th>

                        <th>Title</th>

                        <th>Homework Date</th>

                        <th>Due Date</th>

                        <th>PDF</th>

                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>

                    ${homework.map(function (item) {

                        return `

                            <tr>

                                <td>
                                    ${escapeHtml(
    item.class?.className ||
    item.class?.name ||
    ""
)}
                                </td>

                                <td>
                                    ${escapeHtml(
    item.subject?.subjectName ||
    item.subject?.name ||
    ""
)}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        item.subject?.name || ""
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        (
                                            item.teacher?.firstName ||
                                            ""
                                        ) +
                                        " " +
                                        (
                                            item.teacher?.lastName ||
                                            ""
                                        )
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        item.title || ""
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        item.homeworkDate
                                            ? new Date(
                                                item.homeworkDate
                                            ).toLocaleDateString()
                                            : ""
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        item.dueDate
                                            ? new Date(
                                                item.dueDate
                                            ).toLocaleDateString()
                                            : ""
                                    )}
                                </td>

                                <td>
                                    ${
                                        item.pdfFile
                                            ? `<a href="${escapeHtml(item.pdfFile)}" target="_blank">View PDF</a>`
                                            : "No PDF"
                                    }
                                </td>

                                <td>

                                    <button
                                        class="secondary-button"
                                        onclick="editHomework('${item._id}')"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        class="danger-button"
                                        onclick="deleteHomework('${item._id}')"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        `;

                    }).join("")}

                </tbody>

            </table>

        </div>

    `;

}

// =====================================================
// DELETE HOMEWORK
// =====================================================

window.deleteHomework = async function (id) {

    if (!id) {
        showToast("Invalid homework ID.");
        return;
    }

    const confirmDelete = confirm(
        "Are you sure you want to delete this homework?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            `/api/homework/${encodeURIComponent(id)}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to delete homework."
            );

        }

        showToast(
            data.message ||
            "Homework deleted successfully."
        );

        await loadHomework();

    } catch (error) {

        console.error(
            "Delete Homework Error:",
            error
        );

        showToast(
            error.message ||
            "Unable to delete homework."
        );

    }


};
// =====================================================
// EDIT HOMEWORK
// =====================================================

window.editHomework = async function (id) {

    try {

        const response = await fetch(
            `/api/homework/${encodeURIComponent(id)}`
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.message ||
                "Unable to load homework."
            );
        }

        const item = result.data;

        moduleContent.innerHTML = `

            <div class="form-container">

                <h2>Edit Homework</h2>

                <form id="editHomeworkForm">

                    <div class="form-grid">

                        <div class="form-group">
                            <label>Class</label>

                            <select id="editHomeworkClass" required>
                                <option value="">
                                    Select Class
                                </option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Section</label>

                            <input
                                type="text"
                                id="editHomeworkSection"
                                value="${escapeHtml(item.section || "")}"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label>Subject</label>

                            <select id="editHomeworkSubject" required>
                                <option value="">
                                    Select Subject
                                </option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Teacher</label>

                            <select id="editHomeworkTeacher" required>
                                <option value="">
                                    Select Teacher
                                </option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Homework Title</label>

                            <input
                                type="text"
                                id="editHomeworkTitle"
                                value="${escapeHtml(item.title || "")}"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label>Homework Date</label>

                            <input
                                type="date"
                                id="editHomeworkDate"
                                value="${
                                    item.homeworkDate
                                        ? new Date(item.homeworkDate)
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                }"
                                required
                            >
                        </div>

                        <div class="form-group">
                            <label>Due Date</label>

                            <input
                                type="date"
                                id="editHomeworkDueDate"
                                value="${
                                    item.dueDate
                                        ? new Date(item.dueDate)
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                }"
                                required
                            >
                        </div>

                        <div class="form-group">

                            <label>Replace PDF</label>

                            <input
                                type="file"
                                id="editHomeworkPdf"
                                accept=".pdf,application/pdf"
                            >

                            ${
                                item.pdfFile
                                    ? `
                                        <small>
                                            Current PDF:
                                            <a
                                                href="${escapeHtml(item.pdfFile)}"
                                                target="_blank"
                                            >
                                                View PDF
                                            </a>
                                        </small>
                                      `
                                    : `
                                        <small>
                                            No PDF uploaded
                                        </small>
                                      `
                            }

                        </div>

                        <div
                            class="form-group"
                            style="grid-column: 1 / -1;"
                        >

                            <label>Description</label>

                            <textarea
                                id="editHomeworkDescription"
                                rows="5"
                                placeholder="Enter homework details..."
                            >${escapeHtml(item.description || "")}</textarea>

                        </div>

                    </div>

                    <div style="margin-top:25px;">

                        <button
                            type="submit"
                            class="primary-button"
                        >
                            Update Homework
                        </button>

                        <button
                            type="button"
                            class="secondary-button"
                            onclick="loadHomework()"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;


        // =====================================================
        // LOAD CLASS / SUBJECT / TEACHER OPTIONS
        // =====================================================

        const [
            classes,
            subjects,
            teachers
        ] = await Promise.all([

            fetch("/api/classes")
                .then(r => r.json()),

            fetch("/api/subjects")
                .then(r => r.json()),

            fetch("/api/teachers")
                .then(r => r.json())

        ]);


        const classSelect =
            document.getElementById(
                "editHomeworkClass"
            );

        const subjectSelect =
            document.getElementById(
                "editHomeworkSubject"
            );

        const teacherSelect =
            document.getElementById(
                "editHomeworkTeacher"
            );


        classSelect.innerHTML =
            `<option value="">Select Class</option>` +

            (classes.data || []).map(item => `

                <option value="${item._id}">
                    ${escapeHtml(
                        item.className ||
                        item.name ||
                        ""
                    )}
                </option>

            `).join("");


        subjectSelect.innerHTML =
            `<option value="">Select Subject</option>` +

            (subjects.data || []).map(item => `

                <option value="${item._id}">
                    ${escapeHtml(
                        item.subjectName ||
                        item.name ||
                        ""
                    )}
                </option>

            `).join("");


        teacherSelect.innerHTML =
            `<option value="">Select Teacher</option>` +

            (teachers.data || []).map(item => `

                <option value="${item._id}">
                    ${escapeHtml(
                        item.fullName ||
                        item.name ||
                        `${item.firstName || ""} ${item.lastName || ""}`.trim()
                    )}
                </option>

            `).join("");


        // =====================================================
        // SELECT CURRENT VALUES
        // =====================================================

        classSelect.value =
            item.class?._id ||
            item.class ||
            "";

        subjectSelect.value =
            item.subject?._id ||
            item.subject ||
            "";

        teacherSelect.value =
            item.teacher?._id ||
            item.teacher ||
            "";


        // =====================================================
        // SUBMIT EDIT FORM
        // =====================================================

        document
            .getElementById("editHomeworkForm")
            .addEventListener(
                "submit",
                async function (event) {

                    event.preventDefault();


                    const formData =
                        new FormData();


                    formData.append(
                        "classId",
                        classSelect.value
                    );

                    formData.append(
                        "section",
                        document.getElementById(
                            "editHomeworkSection"
                        ).value.trim()
                    );

                    formData.append(
                        "subject",
                        subjectSelect.value
                    );

                    formData.append(
                        "teacher",
                        teacherSelect.value
                    );

                    formData.append(
                        "title",
                        document.getElementById(
                            "editHomeworkTitle"
                        ).value.trim()
                    );

                    formData.append(
                        "description",
                        document.getElementById(
                            "editHomeworkDescription"
                        ).value.trim()
                    );

                    formData.append(
                        "homeworkDate",
                        document.getElementById(
                            "editHomeworkDate"
                        ).value
                    );

                    formData.append(
                        "dueDate",
                        document.getElementById(
                            "editHomeworkDueDate"
                        ).value
                    );


                    const pdfInput =
                        document.getElementById(
                            "editHomeworkPdf"
                        );


                    if (
                        pdfInput &&
                        pdfInput.files &&
                        pdfInput.files.length > 0
                    ) {

                        formData.append(
                            "homeworkPdf",
                            pdfInput.files[0]
                        );

                    }


                    try {

                        const updateResponse =
                            await fetch(
                                `/api/homework/${encodeURIComponent(id)}`,
                                {
                                    method: "PUT",
                                    body: formData
                                }
                            );


                        const updateResult =
                            await updateResponse.json();


                        if (
                            !updateResponse.ok ||
                            !updateResult.success
                        ) {

                            throw new Error(
                                updateResult.message ||
                                "Unable to update homework."
                            );

                        }


                        showToast(
                            updateResult.message ||
                            "Homework updated successfully."
                        );


                        await loadHomework();


                    } catch (error) {

                        console.error(
                            "Update Homework Error:",
                            error
                        );

                        showToast(
                            error.message ||
                            "Unable to update homework."
                        );

                    }

                }
            );


    } catch (error) {

        console.error(
            "Edit Homework Error:",
            error
        );

        showToast(
            error.message ||
            "Unable to load homework."
        );

    }

};
// =====================================================
// ADD HOMEWORK FORM
// =====================================================

function openAddHomeworkForm() {

    moduleContent.innerHTML = `

        <div class="form-container">

            <h2>Add Homework</h2>

            <form id="homeworkForm">

                <div class="form-grid">

                    <div class="form-group">
                        <label>Class</label>

                        <select id="homeworkClass" required>
                            <option value="">
                                Select Class
                            </option>
                        </select>
                    </div>


                    <div class="form-group">
                        <label>Section</label>

                        <input
                            type="text"
                            id="homeworkSection"
                            placeholder="e.g. A"
                            required
                        >
                    </div>


                    <div class="form-group">
                        <label>Subject</label>

                        <select id="homeworkSubject" required>
                            <option value="">
                                Select Subject
                            </option>
                        </select>
                    </div>


                    <div class="form-group">
                        <label>Teacher</label>

                        <select id="homeworkTeacher" required>
                            <option value="">
                                Select Teacher
                            </option>
                        </select>
                    </div>


                    <div class="form-group">
                        <label>Homework Title</label>

                        <input
                            type="text"
                            id="homeworkTitle"
                            placeholder="e.g. Chapter 2 Questions"
                            required
                        >
                    </div>


                    <div class="form-group">
                        <label>Homework Date</label>

                        <input
                            type="date"
                            id="homeworkDate"
                            required
                        >
                    </div>


                    <div class="form-group">
                        <label>Due Date</label>

                        <input
                            type="date"
                            id="homeworkDueDate"
                            required
                        >
                    </div>


                    <div class="form-group">
                        <label>Homework PDF</label>

                        <input
                            type="file"
                            id="homeworkPdf"
                            accept=".pdf,application/pdf"
                        >
                    </div>


                    <div
                        class="form-group"
                        style="grid-column: 1 / -1;"
                    >

                        <label>Description</label>

                        <textarea
                            id="homeworkDescription"
                            rows="5"
                            placeholder="Enter homework details..."
                        ></textarea>

                    </div>

                </div>


                <div style="margin-top:25px;">

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        Save Homework
                    </button>


                    <button
                        type="button"
                        class="secondary-button"
                        onclick="loadHomework()"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    `;


    loadHomeworkFormOptions();


    const homeworkForm =
        document.getElementById("homeworkForm");


    homeworkForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();

            saveHomework();

        }
    );

}

// =====================================================
// RENDER TIMETABLE
// =====================================================

function renderTimetable(timetable) {

    if (!timetable.length) {

        moduleContent.innerHTML = `
            <div class="empty-state">

                <div class="empty-icon">
                    📅
                </div>

                <h3>
                    No Timetable Found
                </h3>

                <p>
                    Add your first timetable entry.
                </p>

            </div>
        `;

        return;
    }


    moduleContent.innerHTML = `

        <div class="table-container">

            <table class="data-table">

                <thead>

                    <tr>

                        <th>Day</th>

                        <th>Period</th>

                        <th>Class</th>

                        <th>Section</th>

                        <th>Subject</th>

                        <th>Teacher</th>

                        <th>Time</th>

                        <th>Room</th>

                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>

                    ${timetable.map(function (item) {

                        return `

                            <tr>

                                <td>
                                    ${escapeHtml(
                                        item.day || ""
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        item.period || ""
                                    )}
                                </td>

                                <td>
    ${escapeHtml(
        item.class?.className ||
        item.class?.name ||
        ""
    )}
</td>

                                <td>
                                    ${escapeHtml(
                                        item.section || ""
                                    )}
                                </td>

                               <td>
    ${escapeHtml(
        item.subject?.subjectName ||
        item.subject?.name ||
        ""
    )}
</td>

                                <td>
                                    ${escapeHtml(
                                        item.teacher?.fullName ||
`${item.teacher?.firstName || ""} ${item.teacher?.lastName || ""}`.trim() ||
""
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        item.startTime || ""
                                    )}
                                    -
                                    ${escapeHtml(
                                        item.endTime || ""
                                    )}
                                </td>

                                <td>
                                    ${escapeHtml(
                                        item.room || ""
                                    )}
                                </td>

                                <td>

                                    <button
                                        class="btn btn-small"
                                        onclick="openEditTimetableForm('${item._id}')"
                                    >
                                        Edit
                                    </button>

                                    <button
                                        class="btn btn-danger btn-small"
                                        onclick="deleteTimetable('${item._id}')"
                                    >
                                        Delete
                                    </button>

                                </td>

                            </tr>

                        `;

                    }).join("")}

                </tbody>

            </table>

        </div>

    `;
}
// =====================================================
// ADD TIMETABLE FORM
// =====================================================

window.openAddTimetableForm = function () {

    moduleContent.innerHTML = `

        <div class="form-container">

            <h2>Add Timetable</h2>

            <form id="timetableForm">

                <div class="form-grid">

                    <!-- CLASS -->
                    <div class="form-group">
                        <label>Class</label>
                        <select id="timetableClass" required>
                            <option value="">Select Class</option>
                        </select>
                    </div>

                    <!-- SECTION -->
                    <div class="form-group">
                        <label>Section</label>
                        <input
                            type="text"
                            id="timetableSection"
                            placeholder="e.g. A"
                            required
                        >
                    </div>

                    <!-- SUBJECT -->
                    <div class="form-group">
                        <label>Subject</label>
                        <select id="timetableSubject" required>
                            <option value="">Select Subject</option>
                        </select>
                    </div>

                    <!-- TEACHER -->
                    <div class="form-group">
                        <label>Teacher</label>
                        <select id="timetableTeacher" required>
                            <option value="">Select Teacher</option>
                        </select>
                    </div>

                    <!-- DAY -->
                    <div class="form-group">
                        <label>Day</label>
                        <select id="timetableDay" required>
                            <option value="">Select Day</option>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                            <option value="Saturday">Saturday</option>
                        </select>
                    </div>

                    <!-- PERIOD -->
                    <div class="form-group">
                        <label>Period</label>
                        <input
                            type="number"
                            id="timetablePeriod"
                            min="1"
                            placeholder="e.g. 1"
                            required
                        >
                    </div>

                    <!-- START TIME -->
                    <div class="form-group">
                        <label>Start Time</label>
                        <input
                            type="time"
                            id="timetableStartTime"
                            required
                        >
                    </div>

                    <!-- END TIME -->
                    <div class="form-group">
                        <label>End Time</label>
                        <input
                            type="time"
                            id="timetableEndTime"
                            required
                        >
                    </div>

                    <!-- ROOM -->
                    <div class="form-group">
                        <label>Room</label>
                        <input
                            type="text"
                            id="timetableRoom"
                            placeholder="e.g. Room 101"
                        >
                    </div>

                </div>

                <div style="margin-top:25px;">

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        Save Timetable
                    </button>

                    <button
                        type="button"
                        class="secondary-button"
                        onclick="loadTimetable()"
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    `;

    // Load Class / Subject / Teacher
    loadTimetableFormOptions();

    // Form submit
    const timetableForm =
        document.getElementById("timetableForm");

    if (timetableForm) {

        timetableForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                saveTimetable();

            }
        );

    }

};
// =====================================================
// LOAD TIMETABLE FORM OPTIONS
// =====================================================

async function loadTimetableFormOptions() {

    try {

        const [classes, subjects, teachers] =
            await Promise.all([
                fetch("/api/classes").then(r => r.json()),
                fetch("/api/subjects").then(r => r.json()),
                fetch("/api/teachers").then(r => r.json())
            ]);

        const classSelect =
            document.getElementById("timetableClass");

        const subjectSelect =
            document.getElementById("timetableSubject");

        const teacherSelect =
            document.getElementById("timetableTeacher");


        classSelect.innerHTML =
            `<option value="">Select Class</option>` +
            (classes.data || []).map(item => `
                <option value="${item._id}">
                    ${escapeHtml(
                        item.className ||
                        item.name ||
                        ""
                    )}
                </option>
            `).join("");


        subjectSelect.innerHTML =
            `<option value="">Select Subject</option>` +
            (subjects.data || []).map(item => `
                <option value="${item._id}">
                    ${escapeHtml(
                        item.subjectName ||
                        item.name ||
                        ""
                    )}
                </option>
            `).join("");


        teacherSelect.innerHTML =
            `<option value="">Select Teacher</option>` +
            (teachers.data || []).map(item => `
                <option value="${item._id}">
                    ${escapeHtml(
                        item.fullName ||
                        item.name ||
                        `${item.firstName || ""} ${item.lastName || ""}`.trim()
                    )}
                </option>
            `).join("");


    } catch (error) {

        console.error(
            "Timetable Form Options Error:",
            error
        );

        showToast(
            "Unable to load timetable options."
        );

    }

}

// =====================================================
// LOAD HOMEWORK FORM OPTIONS
// =====================================================

async function loadHomeworkFormOptions() {

    try {

        const [classes, subjects, teachers] =
            await Promise.all([

                fetch("/api/classes").then(r => r.json()),

                fetch("/api/subjects").then(r => r.json()),

                fetch("/api/teachers").then(r => r.json())

            ]);


        const classSelect =
            document.getElementById(
                "homeworkClass"
            );

        const subjectSelect =
            document.getElementById(
                "homeworkSubject"
            );

        const teacherSelect =
            document.getElementById(
                "homeworkTeacher"
            );


        if (!classSelect ||
            !subjectSelect ||
            !teacherSelect) {

            return;
        }


        classSelect.innerHTML =
            `<option value="">Select Class</option>` +

            (classes.data || []).map(item => `

                <option value="${item._id}">
                    ${escapeHtml(
                        item.className ||
                        item.name ||
                        ""
                    )}
                </option>

            `).join("");


        subjectSelect.innerHTML =
            `<option value="">Select Subject</option>` +

            (subjects.data || []).map(item => `

                <option value="${item._id}">
                    ${escapeHtml(
                        item.subjectName ||
                        item.name ||
                        ""
                    )}
                </option>

            `).join("");


        teacherSelect.innerHTML =
            `<option value="">Select Teacher</option>` +

            (teachers.data || []).map(item => `

                <option value="${item._id}">
                    ${escapeHtml(
                        item.fullName ||
                        item.name ||
                        `${item.firstName || ""} ${item.lastName || ""}`.trim()
                    )}
                </option>

            `).join("");


    } catch (error) {

        console.error(
            "Homework Form Options Error:",
            error
        );

        showToast(
            "Unable to load homework options."
        );

    }

}
// =====================================================
// SAVE HOMEWORK
// =====================================================

async function saveHomework() {

    const form =
        document.getElementById("homeworkForm");

    if (!form) return;


   const data = {
    classId: document.getElementById("homeworkClass").value,
    section: document.getElementById("homeworkSection").value.trim(),
    subject: document.getElementById("homeworkSubject").value,
    teacher: document.getElementById("homeworkTeacher").value,
    title: document.getElementById("homeworkTitle").value.trim(),
    description: document.getElementById("homeworkDescription").value.trim(),
    homeworkDate: document.getElementById("homeworkDate").value,
    dueDate: document.getElementById("homeworkDueDate").value
};


    console.log(
        "HOMEWORK DATA:",
        data
    );


    if (
        !data.classId ||
        !data.section ||
        !data.subject ||
        !data.teacher ||
        !data.title ||
        !data.homeworkDate ||
        !data.dueDate
    ) {

        showToast(
            "Please fill all required fields."
        );

        return;
    }


    try {

      const formData = new FormData();

formData.append("classId", data.classId);
formData.append("section", data.section);
formData.append("subject", data.subject);
formData.append("teacher", data.teacher);
formData.append("title", data.title);
formData.append("description", data.description);
formData.append("homeworkDate", data.homeworkDate);
formData.append("dueDate", data.dueDate);


const pdfInput =
    document.getElementById("homeworkPdf");

if (
    pdfInput &&
    pdfInput.files &&
    pdfInput.files.length > 0
) {
    formData.append(
        "homeworkPdf",
        pdfInput.files[0]
    );
}


const response = await fetch(
    "/api/homework",
    {
        method: "POST",

        body: formData
    }
);


        const result =
            await response.json();


        if (
            !response.ok ||
            !result.success
        ) {

            throw new Error(
                result.message ||
                "Unable to save homework."
            );

        }


        showToast(
            "Homework added successfully."
        );


        loadHomework();


    } catch (error) {

        console.error(
            "Save Homework Error:",
            error
        );


        showToast(
            error.message
        );

    }

}
// =====================================================
// EDIT TIMETABLE FORM
// =====================================================

window.openEditTimetableForm = async function (id) {

    try {

        const response = await fetch(
            `/api/timetable/${id}`
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.message || "Unable to load timetable."
            );
        }

        const item = result.data;

        moduleContent.innerHTML = `

            <div class="form-container">

                <h2>Edit Timetable</h2>

                <form id="editTimetableForm">

                    <div class="form-grid">

                        <div class="form-group">
                            <label>Class</label>

                            <select id="editTimetableClass" required>
                                <option value="">
                                    Select Class
                                </option>
                            </select>
                        </div>


                        <div class="form-group">
                            <label>Section</label>

                            <input
                                type="text"
                                id="editTimetableSection"
                                value="${escapeHtml(item.section || "")}"
                                required
                            >
                        </div>


                        <div class="form-group">
                            <label>Subject</label>

                            <select id="editTimetableSubject" required>
                                <option value="">
                                    Select Subject
                                </option>
                            </select>
                        </div>


                        <div class="form-group">
                            <label>Teacher</label>

                            <select id="editTimetableTeacher" required>
                                <option value="">
                                    Select Teacher
                                </option>
                            </select>
                        </div>


                        <div class="form-group">
                            <label>Day</label>

                            <select id="editTimetableDay" required>

                                <option value="">
                                    Select Day
                                </option>

                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>

                            </select>
                        </div>


                        <div class="form-group">
                            <label>Period</label>

                            <input
                                type="number"
                                id="editTimetablePeriod"
                                min="1"
                                required
                            >
                        </div>


                        <div class="form-group">
                            <label>Start Time</label>

                            <input
                                type="time"
                                id="editTimetableStartTime"
                                required
                            >
                        </div>


                        <div class="form-group">
                            <label>End Time</label>

                            <input
                                type="time"
                                id="editTimetableEndTime"
                                required
                            >
                        </div>


                        <div class="form-group">
                            <label>Room</label>

                            <input
                                type="text"
                                id="editTimetableRoom"
                                placeholder="e.g. Room 101"
                            >
                        </div>

                    </div>


                    <div style="margin-top:25px;">

                        <button
                            type="submit"
                            class="primary-button"
                        >
                            Update Timetable
                        </button>

                        <button
                            type="button"
                            class="secondary-button"
                            onclick="loadTimetable()"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>
        `;


        // =====================================================
        // LOAD OPTIONS
        // =====================================================

        const [classes, subjects, teachers] =
            await Promise.all([

                fetch("/api/classes").then(r => r.json()),

                fetch("/api/subjects").then(r => r.json()),

                fetch("/api/teachers").then(r => r.json())

            ]);


        const classSelect =
            document.getElementById(
                "editTimetableClass"
            );

        const subjectSelect =
            document.getElementById(
                "editTimetableSubject"
            );

        const teacherSelect =
            document.getElementById(
                "editTimetableTeacher"
            );


        classSelect.innerHTML =
            `<option value="">Select Class</option>` +

            (classes.data || []).map(item => `

                <option value="${item._id}">
                    ${escapeHtml(
                        item.name ||
                        item.className ||
                        ""
                    )}
                </option>

            `).join("");


        subjectSelect.innerHTML =
            `<option value="">Select Subject</option>` +

            (subjects.data || []).map(item => `

                <option value="${item._id}">
                    ${escapeHtml(item.name || "")}
                </option>

            `).join("");


        teacherSelect.innerHTML =
            `<option value="">Select Teacher</option>` +

            (teachers.data || []).map(item => `

                <option value="${item._id}">
                    ${escapeHtml(
                        item.name ||
                        `${item.firstName || ""} ${item.lastName || ""}`.trim()
                    )}
                </option>

            `).join("");


        // =====================================================
        // SET OLD VALUES
        // =====================================================

        document.getElementById(
            "editTimetableClass"
        ).value =
            item.class?._id || item.class || "";


        document.getElementById(
            "editTimetableSubject"
        ).value =
            item.subject?._id || item.subject || "";


        document.getElementById(
            "editTimetableTeacher"
        ).value =
            item.teacher?._id || item.teacher || "";


        document.getElementById(
            "editTimetableDay"
        ).value =
            item.day || "";


        document.getElementById(
            "editTimetablePeriod"
        ).value =
            item.period || "";


        document.getElementById(
            "editTimetableStartTime"
        ).value =
            item.startTime || "";


        document.getElementById(
            "editTimetableEndTime"
        ).value =
            item.endTime || "";


        document.getElementById(
            "editTimetableRoom"
        ).value =
            item.room || "";


        // =====================================================
        // UPDATE SUBMIT
        // =====================================================

        document
            .getElementById("editTimetableForm")
            .addEventListener(
                "submit",
                async function (event) {

                    event.preventDefault();


                    const data = {

                        classId:
                            document.getElementById(
                                "editTimetableClass"
                            ).value,

                        section:
                            document.getElementById(
                                "editTimetableSection"
                            ).value.trim(),

                        subject:
                            document.getElementById(
                                "editTimetableSubject"
                            ).value,

                        teacher:
                            document.getElementById(
                                "editTimetableTeacher"
                            ).value,

                        day:
                            document.getElementById(
                                "editTimetableDay"
                            ).value,

                        period:
                            Number(
                                document.getElementById(
                                    "editTimetablePeriod"
                                ).value
                            ),

                        startTime:
                            document.getElementById(
                                "editTimetableStartTime"
                            ).value,

                        endTime:
                            document.getElementById(
                                "editTimetableEndTime"
                            ).value,

                        room:
                            document.getElementById(
                                "editTimetableRoom"
                            ).value.trim()

                    };


                    try {

                        const response =
                            await fetch(
                                `/api/timetable/${id}`,
                                {
                                    method: "PUT",

                                    headers: {
                                        "Content-Type":
                                            "application/json"
                                    },

                                    body:
                                        JSON.stringify(data)
                                }
                            );


                        const result =
                            await response.json();


                        if (
                            !response.ok ||
                            !result.success
                        ) {

                            throw new Error(
                                result.message ||
                                "Unable to update timetable."
                            );

                        }


                        showToast(
                            "Timetable updated successfully."
                        );


                        loadTimetable();


                    } catch (error) {

                        console.error(
                            "Update Timetable Error:",
                            error
                        );

                        showToast(
                            error.message
                        );

                    }

                }
            );


    } catch (error) {

        console.error(
            "Open Edit Timetable Error:",
            error
        );

        showToast(
            error.message
        );

    }

};
// =====================================================
// SAVE TIMETABLE
// =====================================================

async function saveTimetable() {

    const form = document.getElementById("timetableForm");

    if (!form) return;

    const data = {

      classId: document.getElementById(
    "timetableClass"
        ).value,

        section: document.getElementById(
            "timetableSection"
        ).value.trim(),

        subject: document.getElementById(
            "timetableSubject"
        ).value,

        teacher: document.getElementById(
            "timetableTeacher"
        ).value,

        day: document.getElementById(
            "timetableDay"
        ).value,

        period: Number(
            document.getElementById(
                "timetablePeriod"
            ).value
        ),

        startTime: document.getElementById(
            "timetableStartTime"
        ).value,

        endTime: document.getElementById(
            "timetableEndTime"
        ).value,

        room: document.getElementById(
            "timetableRoom"
        ).value.trim()

    };
    console.log("TIMETABLE DATA:", data);


    if (

         !data.classId ||
    !data.section ||
    !data.subject ||
    !data.teacher ||
    !data.day ||
    !data.period ||
    !data.startTime ||
    !data.endTime
        
    ) {

        showToast(
            "Please fill all required fields."
        );

        return;
    }


    try {

        const response = await fetch(
            "/api/timetable",
            {
                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify(data)
            }
        );


        const result =
            await response.json();


        if (
            !response.ok ||
            !result.success
        ) {

            throw new Error(
                result.message ||
                "Unable to save timetable."
            );

        }


        showToast(
            "Timetable added successfully."
        );


        loadTimetable();


    } catch (error) {

        console.error(
            "Save Timetable Error:",
            error
        );

        showToast(
            error.message
        );

    }

}

// =====================================================
// DELETE TIMETABLE
// =====================================================

window.deleteTimetable = async function (id) {

    if (!id) {
        showToast("Invalid timetable ID.");
        return;
    }

    const confirmDelete = confirm(
        "Are you sure you want to delete this timetable?"
    );

    if (!confirmDelete) {
        return;
    }

    try {

        const response = await fetch(
            `/api/timetable/${id}`,
            {
                method: "DELETE"
            }
        );

        const result =
            await response.json();

        if (!response.ok || !result.success) {

            throw new Error(
                result.message ||
                "Unable to delete timetable."
            );

        }

        showToast(
            "Timetable deleted successfully."
        );

        loadTimetable();

    } catch (error) {

        console.error(
            "Delete Timetable Error:",
            error
        );

        showToast(
            error.message
        );

    }

};




    // =====================================================
// SUBJECT API
// =====================================================

async function getSubjects() {

    const response =
        await fetch("/api/subjects");

    const data =
        await response.json();

    if (!response.ok || !data.success) {

        throw new Error(
            data.message ||
            "Unable to fetch subjects."
        );
    }

    return data.data || [];
}


// =====================================================
// LOAD SUBJECTS
// =====================================================

async function loadSubjects() {

    moduleAddButton.textContent =
        "+ Add Subject";

    moduleAddButton.onclick =
        openAddSubjectForm;


    moduleContent.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">
                ⏳
            </div>

            <h3>
                Loading Subjects...
            </h3>

            <p>
                Please wait.
            </p>

        </div>

    `;


    try {

        const subjects =
            await getSubjects();

        renderSubjects(subjects);

    } catch (error) {

        console.error(
            "Subject Loading Error:",
            error
        );


        moduleContent.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to Load Subjects
                </h3>

                <p>
                    ${escapeHtml(error.message)}
                </p>

                <button
                    type="button"
                    id="retrySubjectsButton"
                    class="primary-button"
                    style="margin-top:20px;"
                >
                    Retry
                </button>

            </div>

        `;


        const retryButton =
            document.getElementById(
                "retrySubjectsButton"
            );


        if (retryButton) {

            retryButton.onclick =
                loadSubjects;

        }

    }

}
// =====================================================
// ADD SUBJECT FORM
// =====================================================

function openAddSubjectForm() {

    moduleContent.innerHTML = `

        <div>

            <h2 style="
                color:#ffffff;
                margin-bottom:8px;
            ">
                Add Subject
            </h2>

            <p style="
                color:#94a3b8;
                margin-bottom:25px;
            ">
                Create a new subject.
            </p>

            <form id="subjectForm">

                <div style="
                    display:grid;
                    grid-template-columns:
                        repeat(2, minmax(0, 1fr));
                    gap:18px;
                ">

                    ${formField(
                        "Subject Name",
                        "subjectName",
                        "",
                        true,
                        "text"
                    )}

                    ${formField(
                        "Subject Code",
                        "subjectCode",
                        "",
                        true,
                        "text"
                    )}

                    ${formField(
                        "Description",
                        "description",
                        "",
                        false,
                        "text"
                    )}

                    <div>

                        <label style="${labelStyle()}">
                            Status
                        </label>

                        <select
                            name="status"
                            style="${inputStyle()}"
                        >

                            <option value="active">
                                Active
                            </option>

                            <option value="inactive">
                                Inactive
                            </option>

                        </select>

                    </div>

                </div>

                <div style="
                    display:flex;
                    gap:12px;
                    margin-top:25px;
                    flex-wrap:wrap;
                ">

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        Save Subject
                    </button>

                    <button
                        type="button"
                        id="cancelSubjectButton"
                        style="
                            padding:13px 20px;
                            border:1px solid #334e68;
                            border-radius:10px;
                            background:#14263e;
                            color:#ffffff;
                            font-weight:700;
                            cursor:pointer;
                        "
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    `;

    const form =
        document.getElementById(
            "subjectForm"
        );

    form.addEventListener(
        "submit",
        handleSubjectFormSubmit
    );

    document
        .getElementById(
            "cancelSubjectButton"
        )
        .addEventListener(
            "click",
            loadSubjects
        );
}
// =====================================================
// SUBJECT FORM SUBMIT
// =====================================================

async function handleSubjectFormSubmit(event) {

    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    const subjectData = {

        subjectName:
            formData.get("subjectName"),

        subjectCode:
            formData.get("subjectCode"),

        description:
            formData.get("description"),

        status:
            formData.get("status")

    };

    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );

    if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
            "Saving...";

    }

    try {

        const response =
            await fetch(
                "/api/subjects",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            subjectData
                        )
                }
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to save subject."
            );

        }

        showToast(
            data.message ||
            "Subject added successfully."
        );

        await loadSubjects();

    } catch (error) {

        console.error(
            "Subject Save Error:",
            error
        );

        showToast(
            error.message
        );

        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                "Save Subject";

        }

    }

}
// =====================================================
// RENDER SUBJECTS
// =====================================================

function renderSubjects(subjects) {

    let rows = "";

    if (!subjects.length) {

        rows = `
            <tr>
                <td
                    colspan="5"
                    style="
                        text-align:center;
                        padding:40px;
                        color:#94a3b8;
                    "
                >
                    No subjects found.
                </td>
            </tr>
        `;

    } else {

        subjects.forEach(function (subject) {

            const id =
                subject._id ||
                subject.id;

            const subjectName =
                subject.subjectName ||
                "-";

            const subjectCode =
                subject.subjectCode ||
                "-";

            const description =
                subject.description ||
                "-";

            const status =
                subject.status ||
                "active";


            rows += `

                <tr>

                    <td>
                        <strong>
                            ${escapeHtml(subjectName)}
                        </strong>
                    </td>

                    <td>
                        ${escapeHtml(subjectCode)}
                    </td>

                    <td>
                        ${escapeHtml(description)}
                    </td>

                    <td>

                        <span
                            style="
                                display:inline-block;
                                padding:5px 9px;
                                border-radius:20px;
                                background:${
                                    status === "active"
                                        ? "#064e3b"
                                        : "#3f1d1d"
                                };
                                color:${
                                    status === "active"
                                        ? "#a7f3d0"
                                        : "#fecaca"
                                };
                                font-size:12px;
                            "
                        >
                            ${escapeHtml(status)}
                        </span>

                    </td>

                    <td>

                        <div
                            style="
                                display:flex;
                                gap:8px;
                                flex-wrap:wrap;
                            "
                        >

                            <button
                                type="button"
                                class="primary-button edit-subject-button"
                                data-id="${escapeHtml(id)}"
                                style="
                                    padding:8px 12px;
                                "
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                class="delete-subject-button"
                                data-id="${escapeHtml(id)}"
                                style="
                                    padding:8px 12px;
                                    border:1px solid #7f1d1d;
                                    border-radius:10px;
                                    background:#3b1720;
                                    color:#fecaca;
                                    cursor:pointer;
                                "
                            >
                                Delete
                            </button>

                        </div>

                    </td>

                </tr>

            `;

        });

    }


    moduleContent.innerHTML = `

        <div>

            <div
                style="
                    display:flex;
                    justify-content:space-between;
                    align-items:center;
                    gap:15px;
                    flex-wrap:wrap;
                    margin-bottom:20px;
                "
            >

                <div>

                    <h3
                        style="
                            color:#ffffff;
                            margin-bottom:5px;
                        "
                    >
                        Subjects
                    </h3>

                    <p
                        style="
                            color:#94a3b8;
                            font-size:13px;
                        "
                    >
                        Total Subjects:
                        <strong>
                            ${subjects.length}
                        </strong>
                    </p>

                </div>

            </div>


            <div style="
                overflow-x:auto;
            ">

                <table
                    id="subjectsTable"
                    style="
                        width:100%;
                        border-collapse:collapse;
                        min-width:800px;
                    "
                >

                    <thead>

                        <tr>

                            <th style="${tableHeaderStyle()}">
                                Subject Name
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Code
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Description
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Status
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>
                        ${rows}
                    </tbody>

                </table>

            </div>

        </div>

    `;


    // =================================================
    // EDIT BUTTON
    // =================================================

    document
        .querySelectorAll(
            ".edit-subject-button"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    openEditSubjectForm(
                        button.dataset.id
                    );

                }
            );

        });


    // =================================================
    // DELETE BUTTON
    // =================================================

    document
        .querySelectorAll(
            ".delete-subject-button"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    deleteSubject(
                        button.dataset.id
                    );

                }
            );

        });

}
// =====================================================
// EDIT SUBJECT FORM
// =====================================================

async function openEditSubjectForm(id) {

    moduleContent.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">⏳</div>
            <h3>Loading Subject...</h3>
            <p>Please wait.</p>
        </div>
    `;

    try {

        const subjects =
            await getSubjects();

        const subject =
            subjects.find(function (item) {

                return String(
                    item._id || item.id
                ) === String(id);

            });


        if (!subject) {

            throw new Error(
                "Subject not found."
            );

        }


        const subjectName =
            subject.subjectName || "";

        const subjectCode =
            subject.subjectCode || "";

        const description =
            subject.description || "";

        const status =
            subject.status || "active";


        moduleContent.innerHTML = `

            <div>

                <h2 style="
                    color:#ffffff;
                    margin-bottom:8px;
                ">
                    Edit Subject
                </h2>

                <p style="
                    color:#94a3b8;
                    margin-bottom:25px;
                ">
                    Update subject information.
                </p>


                <form id="editSubjectForm">

                    <div style="
                        display:grid;
                        grid-template-columns:
                            repeat(2, minmax(0, 1fr));
                        gap:18px;
                    ">

                        ${formField(
                            "Subject Name",
                            "subjectName",
                            subjectName,
                            true,
                            "text"
                        )}

                        ${formField(
                            "Subject Code",
                            "subjectCode",
                            subjectCode,
                            true,
                            "text"
                        )}

                        ${formField(
                            "Description",
                            "description",
                            description,
                            false,
                            "text"
                        )}

                        <div>

                            <label style="${labelStyle()}">
                                Status
                            </label>

                            <select
                                name="status"
                                style="${inputStyle()}"
                            >

                                <option
                                    value="active"
                                    ${
                                        status === "active"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    Active
                                </option>

                                <option
                                    value="inactive"
                                    ${
                                        status === "inactive"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    Inactive
                                </option>

                            </select>

                        </div>

                    </div>


                    <div style="
                        display:flex;
                        gap:12px;
                        margin-top:25px;
                        flex-wrap:wrap;
                    ">

                        <button
                            type="submit"
                            class="primary-button"
                        >
                            Update Subject
                        </button>

                        <button
                            type="button"
                            id="cancelEditSubjectButton"
                            style="
                                padding:13px 20px;
                                border:1px solid #334e68;
                                border-radius:10px;
                                background:#14263e;
                                color:#ffffff;
                                font-weight:700;
                                cursor:pointer;
                            "
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;


        const form =
            document.getElementById(
                "editSubjectForm"
            );


        form.addEventListener(
            "submit",
            function (event) {

                handleEditSubjectSubmit(
                    event,
                    id
                );

            }
        );


        document
            .getElementById(
                "cancelEditSubjectButton"
            )
            .addEventListener(
                "click",
                loadSubjects
            );


    } catch (error) {

        console.error(
            "Edit Subject Form Error:",
            error
        );

        showToast(
            error.message
        );

        loadSubjects();

    }

}
// =====================================================
// UPDATE SUBJECT
// =====================================================

async function handleEditSubjectSubmit(event, id) {

    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    const subjectData = {

        subjectName:
            formData.get("subjectName"),

        subjectCode:
            formData.get("subjectCode"),

        description:
            formData.get("description"),

        status:
            formData.get("status")

    };

    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );

    if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
            "Updating...";

    }

    try {

        const response =
            await fetch(
                `/api/subjects/${encodeURIComponent(id)}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            subjectData
                        )
                }
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to update subject."
            );

        }

        showToast(
            data.message ||
            "Subject updated successfully."
        );

        await loadSubjects();

    } catch (error) {

        console.error(
            "Subject Update Error:",
            error
        );

        showToast(
            error.message
        );

        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                "Update Subject";

        }

    }

}
// =====================================================
// DELETE SUBJECT
// =====================================================

async function deleteSubject(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this subject?"
    );

    if (!confirmed) {
        return;
    }

    try {

        const response =
            await fetch(
                `/api/subjects/${encodeURIComponent(id)}`,
                {
                    method: "DELETE"
                }
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to delete subject."
            );

        }

        showToast(
            data.message ||
            "Subject deleted successfully."
        );

        await loadSubjects();

    } catch (error) {

        console.error(
            "Subject Delete Error:",
            error
        );

        showToast(
            error.message
        );

    }

}
// =====================================================
// EXAM API
// =====================================================

async function getExams() {

    const response =
        await fetch("/api/exams");

    const data =
        await response.json();

    if (!response.ok || !data.success) {

        throw new Error(
            data.message ||
            "Unable to fetch exams."
        );

    }

    return data.data || [];
}
// =====================================================
// FEES API
// =====================================================

async function getFees() {

    const response =
        await fetch("/api/fees");

    const data =
        await response.json();

    if (!response.ok || !data.success) {

        throw new Error(
            data.message ||
            "Unable to fetch fees."
        );

    }

    return data.data || [];
}
// =====================================================
// LOAD FEES
// =====================================================

async function loadFees() {
    moduleAddButton.textContent = "+ Add Fee";

    moduleAddButton.onclick = openAddFeeModal;

    try {

        const fees = await getFees();

        const moduleContent =
            document.getElementById("moduleContent");

        if (!moduleContent) {
            return;
        }

        if (fees.length === 0) {

            moduleContent.innerHTML = `
                <div class="module-card">

                    <div class="empty-state">

                        <div class="empty-icon">
                            💰
                        </div>

                        <h2>No Fees Found</h2>

                        <p>
                            No fee records have been added yet.
                        </p>

                    </div>

                </div>
            `;

            return;
        }


        moduleContent.innerHTML = `

            <div class="module-card">

                <div class="module-header">

                    <div>
                        <h2>Fees</h2>

                        <p>
                            Total Records: ${fees.length}
                        </p>
                    </div>

                    <button
                        class="btn btn-primary"
                        onclick="openAddFeeModal()"
                    >
                        + Add Fee
                    </button>

                </div>


                <div class="table-container">

                   <table class="fees-table">

                        <thead>

                            <tr>

                                <th>Student</th>

                                <th>Fee Type</th>

                                <th>Total</th>

                                <th>Paid</th>

                                <th>Pending</th>

                                <th>Status</th>

                                <th>Actions</th>

                            </tr>

                        </thead>


                        <tbody>

                            ${fees.map(function (fee) {

                                const studentName =
                                    fee.student?.fullName ||
                                    fee.student?.name ||
                                    (
                                        (
                                            fee.student?.firstName || ""
                                        ) +
                                        " " +
                                        (
                                            fee.student?.lastName || ""
                                        )
                                    ).trim() ||
                                    "Unknown Student";


                                const pending =
                                    Math.max(
                                        0,
                                        Number(fee.totalAmount || 0) -
                                        Number(fee.paidAmount || 0)
                                    );


                                const status =
                                    fee.paymentStatus ||
                                    (
                                        Number(fee.paidAmount || 0) <= 0
                                            ? "pending"
                                            :
                                        Number(fee.paidAmount || 0) >=
                                        Number(fee.totalAmount || 0)
                                            ? "paid"
                                            : "partial"
                                    );


                                return `

                                    <tr>

                                        <td>
                                            ${studentName}
                                        </td>

                                        <td>
                                            ${fee.feeType || "-"}
                                        </td>

                                        <td>
                                            ₹${Number(
                                                fee.totalAmount || 0
                                            ).toLocaleString("en-IN")}
                                        </td>

                                        <td>
                                            ₹${Number(
                                                fee.paidAmount || 0
                                            ).toLocaleString("en-IN")}
                                        </td>

                                        <td>
                                            ₹${pending.toLocaleString("en-IN")}
                                        </td>

                                        <td>
                                            ${status}
                                        </td>

                                        <td>

                                            <button
                                                class="btn btn-small"
                                                onclick="editFee('${fee._id}')"
                                            >
                                                Edit
                                            </button>

                                            <button
                                                class="btn btn-danger btn-small"
                                                onclick="deleteFee('${fee._id}')"
                                            >
                                                Delete
                                            </button>

                                        </td>

                                    </tr>

                                `;

                            }).join("")}

                        </tbody>

                    </table>

                </div>

            </div>

        `;

    } catch (error) {

        console.error(
            "Load Fees Error:",
            error
        );

        alert(
            error.message ||
            "Unable to load fees."
        );

    }

}
// =====================================================
// ADD FEE MODAL
// =====================================================

async function openAddFeeModal() {

    try {

        const students = await getStudents();

        const moduleContent =
            document.getElementById("moduleContent");

        if (!moduleContent) {
            return;
        }

        moduleContent.innerHTML = `

            <div class="module-card">

                <div class="module-header">

                    <div>
                        <h2>Add Fee</h2>

                        <p>
                            Add a new student fee record
                        </p>
                    </div>

                    <button
                        class="btn btn-secondary"
                        onclick="loadFees()"
                    >
                        ← Back
                    </button>

                </div>


                <form
                    id="addFeeForm"
                    
                >

                    <div class="form-grid">

                        <div class="form-group">

                            <label>
                                Student
                            </label>

                            <select
                                id="feeStudent"
                                required
                            >

                                <option value="">
                                    Select Student
                                </option>

                                ${students.map(function (student) {

                                    const name =
                                        student.fullName ||
                                        student.name ||
                                        (
                                            (
                                                student.firstName || ""
                                            ) +
                                            " " +
                                            (
                                                student.lastName || ""
                                            )
                                        ).trim() ||
                                        "Unknown Student";

                                    return `
                                        <option value="${student._id}">
                                            ${name}
                                        </option>
                                    `;

                                }).join("")}

                            </select>

                        </div>


                        <div class="form-group">

                            <label>
                                Fee Type
                            </label>

                            <input
                                type="text"
                                id="feeType"
                                placeholder="e.g. Tuition Fee"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label>
                                Total Amount
                            </label>

                            <input
                                type="number"
                                id="feeTotalAmount"
                                min="0"
                                step="0.01"
                                placeholder="Enter total amount"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label>
                                Paid Amount
                            </label>

                            <input
                                type="number"
                                id="feePaidAmount"
                                min="0"
                                step="0.01"
                                value="0"
                                placeholder="Enter paid amount"
                            >

                        </div>


                        <div class="form-group">

                            <label>
                                Payment Date
                            </label>

                            <input
                                type="date"
                                id="feePaymentDate"
                            >

                        </div>


                        <div class="form-group">

                            <label>
                                Remarks
                            </label>

                            <input
                                type="text"
                                id="feeRemarks"
                                placeholder="Optional remarks"
                            >

                        </div>

                    </div>


                    <div
                        style="
                            display:flex;
                            gap:10px;
                            margin-top:20px;
                        "
                    >

                        <button
                            type="submit"
                            class="btn btn-primary"
                        >
                            Save Fee
                        </button>

                        <button
                            type="button"
                            class="btn btn-secondary"
                            onclick="loadFees()"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;
               const addFeeForm = document.getElementById("addFeeForm");

        if (addFeeForm) {
            addFeeForm.addEventListener("submit", saveFee);
        } 

    } catch (error) {

        console.error(
            "Open Add Fee Error:",
            error
        );

        alert(
            error.message ||
            "Unable to open fee form."
        );

    }

}
// =====================================================
// EDIT FEE
// =====================================================

async function editFee(id) {

    try {

        const fees = await getFees();

        const fee = fees.find(function (item) {
            return item._id === id;
        });

        if (!fee) {
            alert("Fee record not found.");
            return;
        }

        const students = await getStudents();

        const moduleContent =
            document.getElementById("moduleContent");

        moduleContent.innerHTML = `

            <div class="module-card">

                <div class="module-header">

                    <div>
                        <h2>Edit Fee</h2>

                        <p>
                            Update student fee record
                        </p>
                    </div>

                    <button
                        class="btn btn-secondary"
                        onclick="loadFees()"
                    >
                        ← Back
                    </button>

                </div>


                <form id="editFeeForm">

                    <div class="form-grid">

                        <div class="form-group">

                            <label>Student</label>

                            <select
                                id="editFeeStudent"
                                required
                            >

                                <option value="">
                                    Select Student
                                </option>

                                ${students.map(function (student) {

                                    const name =
                                        student.fullName ||
                                        student.name ||
                                        (
                                            (
                                                student.firstName || ""
                                            ) +
                                            " " +
                                            (
                                                student.lastName || ""
                                            )
                                        ).trim() ||
                                        "Unknown Student";

                                    return `
                                        <option
                                            value="${student._id}"
                                            ${fee.student &&
                                            fee.student._id === student._id
                                                ? "selected"
                                                : ""}
                                        >
                                            ${name}
                                        </option>
                                    `;

                                }).join("")}

                            </select>

                        </div>


                        <div class="form-group">

                            <label>Fee Type</label>

                            <input
                                type="text"
                                id="editFeeType"
                                value="${fee.feeType || ""}"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label>Total Amount</label>

                            <input
                                type="number"
                                id="editFeeTotalAmount"
                                min="0"
                                step="0.01"
                                value="${fee.totalAmount || 0}"
                                required
                            >

                        </div>


                        <div class="form-group">

                            <label>Paid Amount</label>

                            <input
                                type="number"
                                id="editFeePaidAmount"
                                min="0"
                                step="0.01"
                                value="${fee.paidAmount || 0}"
                            >

                        </div>


                        <div class="form-group">

                            <label>Payment Date</label>

                            <input
                                type="date"
                                id="editFeePaymentDate"
                                value="${
                                    fee.paymentDate
                                        ? new Date(fee.paymentDate)
                                            .toISOString()
                                            .split("T")[0]
                                        : ""
                                }"
                            >

                        </div>


                        <div class="form-group">

                            <label>Remarks</label>

                            <input
                                type="text"
                                id="editFeeRemarks"
                                value="${fee.remarks || ""}"
                            >

                        </div>

                    </div>


                    <div
                        style="
                            display:flex;
                            gap:10px;
                            margin-top:20px;
                        "
                    >

                        <button
                            type="submit"
                            class="btn btn-primary"
                        >
                            Update Fee
                        </button>

                        <button
                            type="button"
                            class="btn btn-secondary"
                            onclick="loadFees()"
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;


        document
            .getElementById("editFeeForm")
            .addEventListener(
                "submit",
                async function (event) {

                    event.preventDefault();

                    try {

                        const student =
                            document
                                .getElementById(
                                    "editFeeStudent"
                                )
                                .value;

                        const feeType =
                            document
                                .getElementById(
                                    "editFeeType"
                                )
                                .value
                                .trim();

                        const totalAmount =
                            Number(
                                document
                                    .getElementById(
                                        "editFeeTotalAmount"
                                    )
                                    .value
                            );

                        const paidAmount =
                            Number(
                                document
                                    .getElementById(
                                        "editFeePaidAmount"
                                    )
                                    .value || 0
                            );

                        const paymentDate =
                            document
                                .getElementById(
                                    "editFeePaymentDate"
                                )
                                .value;

                        const remarks =
                            document
                                .getElementById(
                                    "editFeeRemarks"
                                )
                                .value
                                .trim();


                        if (!student) {
                            alert("Please select a student.");
                            return;
                        }

                        if (!feeType) {
                            alert("Please enter fee type.");
                            return;
                        }

                        if (paidAmount > totalAmount) {
                            alert(
                                "Paid amount cannot be greater than total amount."
                            );
                            return;
                        }


                        const response =
                            await fetch(
                                `/api/fees/${id}`,
                                {
                                    method: "PUT",

                                    headers: {
                                        "Content-Type":
                                            "application/json"
                                    },

                                    body: JSON.stringify({

                                        student:
                                            student,

                                        feeType:
                                            feeType,

                                        totalAmount:
                                            totalAmount,

                                        paidAmount:
                                            paidAmount,

                                        paymentDate:
                                            paymentDate || null,

                                        remarks:
                                            remarks

                                    })
                                }
                            );


                        const data =
                            await response.json();


                        if (
                            !response.ok ||
                            !data.success
                        ) {

                            throw new Error(
                                data.message ||
                                "Unable to update fee."
                            );

                        }


                        alert(
                            "Fee updated successfully."
                        );


                        await loadFees();


                    } catch (error) {

                        console.error(
                            "Update Fee Error:",
                            error
                        );

                        alert(
                            error.message ||
                            "Unable to update fee."
                        );

                    }

                }
            );


    } catch (error) {

        console.error(
            "Edit Fee Error:",
            error
        );

        alert(
            error.message ||
            "Unable to open edit fee form."
        );

    }

}
window.editFee = editFee;
// =====================================================
// SAVE FEE
// =====================================================

async function saveFee(event) {

    event.preventDefault();

    try {

        const student =
            document.getElementById("feeStudent").value;

        const feeType =
            document.getElementById("feeType").value.trim();

        const totalAmount =
            Number(
                document.getElementById("feeTotalAmount").value
            );

        const paidAmount =
            Number(
                document.getElementById("feePaidAmount").value || 0
            );

        const paymentDate =
            document.getElementById("feePaymentDate").value;

        const remarks =
            document.getElementById("feeRemarks").value.trim();


        if (!student) {

            alert("Please select a student.");

            return;

        }


        if (!feeType) {

            alert("Please enter fee type.");

            return;

        }


        if (
            Number.isNaN(totalAmount) ||
            totalAmount < 0
        ) {

            alert("Please enter a valid total amount.");

            return;

        }


        if (
            Number.isNaN(paidAmount) ||
            paidAmount < 0
        ) {

            alert("Please enter a valid paid amount.");

            return;

        }


        if (paidAmount > totalAmount) {

            alert(
                "Paid amount cannot be greater than total amount."
            );

            return;

        }


        const response =
            await fetch(
                "/api/fees",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        student:
                            student,

                        feeType:
                            feeType,

                        totalAmount:
                            totalAmount,

                        paidAmount:
                            paidAmount,

                        paymentDate:
                            paymentDate || null,

                        remarks:
                            remarks

                    })

                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to save fee."
            );

        }


        alert(
            data.message ||
            "Fee added successfully."
        );


        await loadFees();


    } catch (error) {

        console.error(
            "Save Fee Error:",
            error
        );


        alert(
            error.message ||
            "Unable to save fee."
        );

    }

}
// =====================================================
// DELETE FEE
// =====================================================

async function deleteFee(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this fee?"
    );

    if (!confirmed) {
        return;
    }

    try {

        const response =
            await fetch(
                `/api/fees/${encodeURIComponent(id)}`,
                {
                    method: "DELETE"
                }
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to delete fee."
            );

        }

        showToast(
            data.message ||
            "Fee deleted successfully."
        );

        await loadFees();

    } catch (error) {

        console.error(
            "Delete Fee Error:",
            error
        );

        showToast(
            error.message ||
            "Unable to delete fee."
        );

    }
}


// IMPORTANT:
// Delete button inline onclick ke liye
// function ko window par expose karna hai.

window.deleteFee = deleteFee;
// =====================================================
// LOAD EXAMS
// =====================================================

async function loadExams() {

    moduleAddButton.textContent =
        "+ Add Exam";

    moduleAddButton.onclick =
        openAddExamForm;


    moduleContent.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">
                ⏳
            </div>

            <h3>
                Loading Exams...
            </h3>

            <p>
                Please wait.
            </p>

        </div>

    `;


    try {

        const exams =
            await getExams();

        renderExams(exams);

    } catch (error) {

        console.error(
            "Exam Loading Error:",
            error
        );


        moduleContent.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to Load Exams
                </h3>

                <p>
                    ${escapeHtml(
                        error.message
                    )}
                </p>

            </div>

        `;

    }

}
// =====================================================
// ADD EXAM FORM
// =====================================================

function openAddExamForm() {

    moduleContent.innerHTML = `

        <div>

            <h2 style="
                color:#ffffff;
                margin-bottom:8px;
            ">
                Add Exam
            </h2>

            <p style="
                color:#94a3b8;
                margin-bottom:25px;
            ">
                Create a new examination.
            </p>


            <form id="examForm">

                <div style="
                    display:grid;
                    grid-template-columns:
                    repeat(2, minmax(0, 1fr));
                    gap:18px;
                ">


                    <div>

                        <label style="
                            display:block;
                            color:#dbeafe;
                            font-weight:600;
                            margin-bottom:8px;
                        ">
                            Exam Name *
                        </label>

                        <input
                            type="text"
                            name="name"
                            required
                            placeholder="e.g. Half Yearly Examination"
                            style="
                                width:100%;
                                box-sizing:border-box;
                                padding:13px;
                                border:1px solid #334e68;
                                border-radius:10px;
                                background:#071525;
                                color:#ffffff;
                            "
                        >

                    </div>


                    <div>

                        <label style="
                            display:block;
                            color:#dbeafe;
                            font-weight:600;
                            margin-bottom:8px;
                        ">
                            Exam Date *
                        </label>

                        <input
                            type="date"
                            name="examDate"
                            required
                            style="
                                width:100%;
                                box-sizing:border-box;
                                padding:13px;
                                border:1px solid #334e68;
                                border-radius:10px;
                                background:#071525;
                                color:#ffffff;
                            "
                        >

                    </div>


                    <div>

                        <label style="
                            display:block;
                            color:#dbeafe;
                            font-weight:600;
                            margin-bottom:8px;
                        ">
                            Description
                        </label>

                        <input
                            type="text"
                            name="description"
                            placeholder="Exam description"
                            style="
                                width:100%;
                                box-sizing:border-box;
                                padding:13px;
                                border:1px solid #334e68;
                                border-radius:10px;
                                background:#071525;
                                color:#ffffff;
                            "
                        >

                    </div>


                    <div>

                        <label style="
                            display:block;
                            color:#dbeafe;
                            font-weight:600;
                            margin-bottom:8px;
                        ">
                            Status
                        </label>

                        <select
                            name="status"
                            style="
                                width:100%;
                                box-sizing:border-box;
                                padding:13px;
                                border:1px solid #334e68;
                                border-radius:10px;
                                background:#071525;
                                color:#ffffff;
                            "
                        >

                            <option value="upcoming">
                                Upcoming
                            </option>

                            <option value="ongoing">
                                Ongoing
                            </option>

                            <option value="completed">
                                Completed
                            </option>

                        </select>

                    </div>

                </div>


                <div style="
                    display:flex;
                    gap:12px;
                    margin-top:25px;
                ">

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        Save Exam
                    </button>


                    <button
                        type="button"
                        id="cancelExamButton"
                        style="
                            padding:13px 20px;
                            border:1px solid #334e68;
                            border-radius:10px;
                            background:#14263e;
                            color:#ffffff;
                            font-weight:700;
                            cursor:pointer;
                        "
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    `;


    const form =
        document.getElementById(
            "examForm"
        );


    form.addEventListener(
        "submit",
        handleExamFormSubmit
    );


    document
        .getElementById(
            "cancelExamButton"
        )
        .addEventListener(
            "click",
            loadExams
        );

}


// =====================================================
// SAVE EXAM
// =====================================================

async function handleExamFormSubmit(event) {

    event.preventDefault();


    const form =
        event.currentTarget;


    const formData =
        new FormData(form);


    const examData = {

        name:
            formData.get("name"),

        description:
            formData.get("description") || "",

        examDate:
            formData.get("examDate"),

        status:
            formData.get("status")

    };


    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );


    if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
            "Saving...";

    }


    try {

        const response =
            await fetch(
                "/api/exams",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            examData
                        )
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to save exam."
            );

        }


        if (
            typeof showToast ===
            "function"
        ) {

            showToast(
                data.message ||
                "Exam added successfully."
            );

        }


        await loadExams();


    } catch (error) {

        console.error(
            "Exam Save Error:",
            error
        );


        if (
            typeof showToast ===
            "function"
        ) {

            showToast(
                error.message
            );

        } else {

            alert(
                error.message
            );

        }


        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                "Save Exam";

        }

    }

}


// =====================================================
// RENDER EXAMS
// =====================================================

function renderExams(exams) {

    let rows = "";


    if (!exams.length) {

        rows = `

            <tr>

                <td
                    colspan="5"
                    style="
                        text-align:center;
                        padding:40px;
                        color:#94a3b8;
                    "
                >
                    No exams found.
                </td>

            </tr>

        `;

    } else {

        exams.forEach(
            function (exam) {

                const name =
                    exam.name || "-";


                const description =
                    exam.description || "-";


                const examDate =
                    exam.examDate
                        ? new Date(
                            exam.examDate
                        ).toLocaleDateString(
                            "en-IN"
                        )
                        : "-";


                const status =
                    exam.status ||
                    "upcoming";


                rows += `

                    <tr>

                        <td style="
                            padding:15px;
                            border-bottom:
                            1px solid #243b53;
                        ">
                            ${escapeHtml(
                                name
                            )}
                        </td>


                        <td style="
                            padding:15px;
                            border-bottom:
                            1px solid #243b53;
                        ">
                            ${escapeHtml(
                                description
                            )}
                        </td>


                        <td style="
                            padding:15px;
                            border-bottom:
                            1px solid #243b53;
                        ">
                            ${escapeHtml(
                                examDate
                            )}
                        </td>


                        <td style="
                            padding:15px;
                            border-bottom:
                            1px solid #243b53;
                        ">
                            ${escapeHtml(
                                status
                            )}
                        </td>


                        <td style="
    padding:15px;
    border-bottom:
    1px solid #243b53;
">
<button
    type="button"
    class="primary-button edit-exam-button"
    data-id="${escapeHtml(
        exam._id || exam.id
    )}"
    style="
        padding:8px 12px;
    "
>
    Edit
</button>
    <button
        type="button"
        class="delete-exam-button"
        data-id="${escapeHtml(
            exam._id || exam.id
        )}"
        style="
            padding:8px 12px;
            border:1px solid #7f1d1d;
            border-radius:10px;
            background:#3b1720;
            color:#fecaca;
            cursor:pointer;
        "
    >
        Delete
    </button>

</td>

                    </tr>

                `;

            }
        );

    }


    moduleContent.innerHTML = `

        <div>

            <div style="
                margin-bottom:20px;
            ">

                <h3 style="
                    color:#ffffff;
                    margin-bottom:5px;
                ">
                    Exams
                </h3>
                <button
    type="button"
    id="viewResultsButton"
    class="primary-button"
    style="
        margin-top:15px;
        padding:10px 16px;
    "
>
    📊 View Results
</button>
                <p style="
                    color:#94a3b8;
                ">
                    Total Exams:
                    <strong>
                        ${exams.length}
                    </strong>
                </p>

            </div>


            <div style="
                overflow-x:auto;
            ">

                <table style="
                    width:100%;
                    border-collapse:collapse;
                    min-width:750px;
                ">

                    <thead>

                        <tr>

                            <th style="
                                padding:15px;
                                text-align:left;
                                color:#94a3b8;
                                background:#071525;
                            ">
                                Exam Name
                            </th>


                            <th style="
                                padding:15px;
                                text-align:left;
                                color:#94a3b8;
                                background:#071525;
                            ">
                                Description
                            </th>


                            <th style="
                                padding:15px;
                                text-align:left;
                                color:#94a3b8;
                                background:#071525;
                            ">
                                Date
                            </th>


                            <th style="
                                padding:15px;
                                text-align:left;
                                color:#94a3b8;
                                background:#071525;
                            ">
                                Status
                            </th>


                            <th style="
                                padding:15px;
                                text-align:left;
                                color:#94a3b8;
                                background:#071525;
                            ">
                                Actions
                            </th>

                        </tr>

                    </thead>


                    <tbody>

                        ${rows}

                    </tbody>

                </table>

            </div>

        </div>

    `;
    document
    .querySelectorAll(
        ".edit-exam-button"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                openEditExamForm(
                    button.dataset.id
                );

            }
        );

    });
document
    .querySelectorAll(
        ".delete-exam-button"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                deleteExam(
                    button.dataset.id
                );

            }
        );

    });
    const viewResultsButton =
    document.getElementById(
        "viewResultsButton"
    );

if (viewResultsButton) {

    viewResultsButton.addEventListener(
        "click",
        loadResults
    );

}
}

    // =====================================================
// DELETE EXAM
// =====================================================

async function deleteExam(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this exam?"
        );

    if (!confirmed) {
        return;
    }

    try {

        const response =
            await fetch(
                `/api/exams/${encodeURIComponent(id)}`,
                {
                    method: "DELETE"
                }
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to delete exam."
            );

        }

        showToast(
            data.message ||
            "Exam deleted successfully."
        );

        await loadExams();

    } catch (error) {

        console.error(
            "Exam Delete Error:",
            error
        );

        showToast(
            error.message
        );

    }

}
// =====================================================
// EDIT EXAM FORM
// =====================================================

async function openEditExamForm(id) {

    moduleContent.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">⏳</div>
            <h3>Loading Exam...</h3>
            <p>Please wait.</p>
        </div>
    `;

    try {

        const exams = await getExams();

        const exam = exams.find(function (item) {

            return String(
                item._id || item.id
            ) === String(id);

        });

        if (!exam) {

            throw new Error(
                "Exam not found."
            );

        }

        const name =
            exam.name || "";

        const description =
            exam.description || "";

        const status =
            exam.status || "upcoming";

        const examDate =
            exam.examDate
                ? new Date(exam.examDate)
                    .toISOString()
                    .split("T")[0]
                : "";

        moduleContent.innerHTML = `

            <div>

                <h2 style="
                    color:#ffffff;
                    margin-bottom:8px;
                ">
                    Edit Exam
                </h2>

                <p style="
                    color:#94a3b8;
                    margin-bottom:25px;
                ">
                    Update exam information.
                </p>

                <form id="editExamForm">

                    <div style="
                        display:grid;
                        grid-template-columns:
                            repeat(2, minmax(0, 1fr));
                        gap:18px;
                    ">

                        <div>

                            <label style="
                                display:block;
                                color:#dbeafe;
                                font-weight:600;
                                margin-bottom:8px;
                            ">
                                Exam Name *
                            </label>

                            <input
                                type="text"
                                name="name"
                                required
                                value="${escapeHtml(name)}"
                                style="${inputStyle()}"
                            >

                        </div>

                        <div>

                            <label style="
                                display:block;
                                color:#dbeafe;
                                font-weight:600;
                                margin-bottom:8px;
                            ">
                                Exam Date *
                            </label>

                            <input
                                type="date"
                                name="examDate"
                                required
                                value="${escapeHtml(examDate)}"
                                style="${inputStyle()}"
                            >

                        </div>

                        <div>

                            <label style="
                                display:block;
                                color:#dbeafe;
                                font-weight:600;
                                margin-bottom:8px;
                            ">
                                Description
                            </label>

                            <input
                                type="text"
                                name="description"
                                value="${escapeHtml(description)}"
                                style="${inputStyle()}"
                            >

                        </div>

                        <div>

                            <label style="
                                display:block;
                                color:#dbeafe;
                                font-weight:600;
                                margin-bottom:8px;
                            ">
                                Status
                            </label>

                            <select
                                name="status"
                                style="${inputStyle()}"
                            >

                                <option
                                    value="upcoming"
                                    ${status === "upcoming"
                                        ? "selected"
                                        : ""}
                                >
                                    Upcoming
                                </option>

                                <option
                                    value="ongoing"
                                    ${status === "ongoing"
                                        ? "selected"
                                        : ""}
                                >
                                    Ongoing
                                </option>

                                <option
                                    value="completed"
                                    ${status === "completed"
                                        ? "selected"
                                        : ""}
                                >
                                    Completed
                                </option>

                            </select>

                        </div>

                    </div>

                    <div style="
                        display:flex;
                        gap:12px;
                        margin-top:25px;
                    ">

                        <button
                            type="submit"
                            class="primary-button"
                        >
                            Update Exam
                        </button>

                        <button
                            type="button"
                            id="cancelEditExamButton"
                            style="
                                padding:13px 20px;
                                border:1px solid #334e68;
                                border-radius:10px;
                                background:#14263e;
                                color:#ffffff;
                                font-weight:700;
                                cursor:pointer;
                            "
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;

        const form =
            document.getElementById(
                "editExamForm"
            );

        form.addEventListener(
            "submit",
            function (event) {

                handleEditExamSubmit(
                    event,
                    id
                );

            }
        );

        document
            .getElementById(
                "cancelEditExamButton"
            )
            .addEventListener(
                "click",
                loadExams
            );

    } catch (error) {

        console.error(
            "Edit Exam Form Error:",
            error
        );

        showToast(
            error.message
        );

        loadExams();

    }

}
// =====================================================
// UPDATE EXAM
// =====================================================

async function handleEditExamSubmit(event, id) {

    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    const examData = {

        name:
            formData.get("name"),

        description:
            formData.get("description") || "",

        examDate:
            formData.get("examDate"),

        status:
            formData.get("status")

    };

    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );

    if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
            "Updating...";

    }

    try {

        const response =
            await fetch(
                `/api/exams/${encodeURIComponent(id)}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            examData
                        )
                }
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to update exam."
            );

        }

        showToast(
            data.message ||
            "Exam updated successfully."
        );

        await loadExams();

    } catch (error) {

        console.error(
            "Exam Update Error:",
            error
        );

        showToast(
            error.message
        );

        if (submitButton) {

            submitButton.disabled = false;

            submitButton.textContent =
                "Update Exam";

        }

    }

}
// =====================================================
// RESULT API
// =====================================================

async function getResults() {

    const response =
        await fetch("/api/results");

    const data =
        await response.json();

    if (!response.ok || !data.success) {

        throw new Error(
            data.message ||
            "Unable to fetch results."
        );

    }

    return data.data || [];

}


// =====================================================
// LOAD RESULTS
// =====================================================

async function loadResults() {

    moduleAddButton.textContent =
        "+ Add Result";

    moduleAddButton.onclick =
        openAddResultForm;


    moduleContent.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">
                ⏳
            </div>

            <h3>
                Loading Results...
            </h3>

            <p>
                Please wait.
            </p>

        </div>

    `;


    try {

        const results =
            await getResults();

        renderResults(results);

    } catch (error) {

        console.error(
            "Result Loading Error:",
            error
        );

        showToast(
            error.message
        );

    }

}
// =====================================================
// ADD RESULT FORM
// =====================================================

async function openAddResultForm() {

    moduleContent.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">⏳</div>
            <h3>Loading...</h3>
            <p>Please wait.</p>
        </div>
    `;

    try {

        const exams = await getExams();

        const studentsResponse =
            await fetch("/api/students");

        const studentsData =
            await studentsResponse.json();

        if (
            !studentsResponse.ok ||
            !studentsData.success
        ) {
            throw new Error(
                studentsData.message ||
                "Unable to fetch students."
            );
        }

        const students =
            studentsData.data || [];

        const subjects =
            await getSubjects();


        moduleContent.innerHTML = `

            <div>

                <h2 style="
                    color:#ffffff;
                    margin-bottom:8px;
                ">
                    Add Result
                </h2>

                <p style="
                    color:#94a3b8;
                    margin-bottom:25px;
                ">
                    Enter student examination marks.
                </p>


                <form id="resultForm">

                    <div style="
                        display:grid;
                        grid-template-columns:
                            repeat(2, minmax(0, 1fr));
                        gap:18px;
                    ">

                        <div>

                            <label style="${labelStyle()}">
                                Exam *
                            </label>

                            <select
                                name="exam"
                                required
                                style="${inputStyle()}"
                            >

                                <option value="">
                                    Select Exam
                                </option>

                                ${exams.map(
                                    function (exam) {

                                        return `
                                            <option
                                                value="${escapeHtml(
                                                    exam._id ||
                                                    exam.id
                                                )}"
                                            >
                                                ${escapeHtml(
                                                    exam.name
                                                )}
                                            </option>
                                        `;

                                    }
                                ).join("")}

                            </select>

                        </div>


                        <div>

                            <label style="${labelStyle()}">
                                Student *
                            </label>

                            <select
                                name="student"
                                required
                                style="${inputStyle()}"
                            >

                                <option value="">
                                    Select Student
                                </option>

                                ${students.map(
                                    function (student) {

                                        const id =
                                            student._id ||
                                            student.id;

                                        const name =
                                            (
                                                student.firstName ||
                                                ""
                                            ) +
                                            " " +
                                            (
                                                student.lastName ||
                                                ""
                                            );

                                        return `
                                            <option
                                                value="${escapeHtml(id)}"
                                            >
                                                ${escapeHtml(
                                                    name.trim() ||
                                                    student.name ||
                                                    "Student"
                                                )}
                                            </option>
                                        `;

                                    }
                                ).join("")}

                            </select>

                        </div>


                        <div>

                            <label style="${labelStyle()}">
                                Subject *
                            </label>

                            <select
                                name="subject"
                                required
                                style="${inputStyle()}"
                            >

                                <option value="">
                                    Select Subject
                                </option>

                                ${subjects.map(
                                    function (subject) {

                                        const id =
                                            subject._id ||
                                            subject.id;

                                        return `
                                            <option
                                                value="${escapeHtml(id)}"
                                            >
                                                ${escapeHtml(
                                                    subject.subjectName ||
                                                    subject.name ||
                                                    "Subject"
                                                )}
                                            </option>
                                        `;

                                    }
                                ).join("")}

                            </select>

                        </div>


                        <div>

                            <label style="${labelStyle()}">
                                Total Marks *
                            </label>

                            <input
                                type="number"
                                name="totalMarks"
                                min="0"
                                required
                                placeholder="100"
                                style="${inputStyle()}"
                            >

                        </div>


                        <div>

                            <label style="${labelStyle()}">
                                Marks Obtained *
                            </label>

                            <input
                                type="number"
                                name="marksObtained"
                                min="0"
                                required
                                placeholder="85"
                                style="${inputStyle()}"
                            >

                        </div>


                        <div>

                            <label style="${labelStyle()}">
                                Grade
                            </label>

                            <input
                                type="text"
                                name="grade"
                                placeholder="A+"
                                style="${inputStyle()}"
                            >

                        </div>


                        <div style="
                            grid-column:1 / -1;
                        ">

                            <label style="${labelStyle()}">
                                Remarks
                            </label>

                            <textarea
                                name="remarks"
                                rows="3"
                                placeholder="Excellent performance..."
                                style="${inputStyle()}"
                            ></textarea>

                        </div>

                    </div>


                    <div style="
                        display:flex;
                        gap:12px;
                        margin-top:25px;
                        flex-wrap:wrap;
                    ">

                        <button
                            type="submit"
                            class="primary-button"
                        >
                            Save Result
                        </button>

                        <button
                            type="button"
                            id="cancelResultButton"
                            style="
                                padding:13px 20px;
                                border:1px solid #334e68;
                                border-radius:10px;
                                background:#14263e;
                                color:#ffffff;
                                font-weight:700;
                                cursor:pointer;
                            "
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;


        const form =
            document.getElementById(
                "resultForm"
            );


        form.addEventListener(
            "submit",
            handleResultFormSubmit
        );


        document
            .getElementById(
                "cancelResultButton"
            )
            .addEventListener(
                "click",
                loadResults
            );


    } catch (error) {

        console.error(
            "Add Result Form Error:",
            error
        );

        showToast(
            error.message
        );

        loadResults();

    }

}
// =====================================================
// SAVE RESULT
// =====================================================

async function handleResultFormSubmit(event) {

    event.preventDefault();

    const form = event.currentTarget;

    const formData = new FormData(form);

    const resultData = {

        exam:
            formData.get("exam"),

        student:
            formData.get("student"),

        subject:
            formData.get("subject"),

        marksObtained:
            Number(
                formData.get("marksObtained")
            ),

        totalMarks:
            Number(
                formData.get("totalMarks")
            ),

        grade:
            formData.get("grade") || "",

        remarks:
            formData.get("remarks") || ""

    };


    if (
        resultData.marksObtained >
        resultData.totalMarks
    ) {

        showToast(
            "Marks obtained cannot exceed total marks."
        );

        return;
    }


    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );


    if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
            "Saving...";

    }


    try {

        const response =
            await fetch(
                "/api/results",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            resultData
                        )
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to save result."
            );

        }


        showToast(
            data.message ||
            "Result added successfully."
        );


        await loadResults();


    } catch (error) {

        console.error(
            "Result Save Error:",
            error
        );


        showToast(
            error.message
        );


        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                "Save Result";

        }

    }

}
// =====================================================
// RENDER RESULTS
// =====================================================

function renderResults(results) {

    let rows = "";
    const searchValue =
    (
        document.getElementById(
            "resultSearchInput"
        )?.value || ""
    ).toLowerCase();

const filteredResults =
    results.filter(function (result) {

        const examName =
            (
                result.exam?.name || ""
            ).toLowerCase();

        const studentName =
            (
                result.student?.name || ""
            ).toLowerCase();

        const subjectName =
            (
                result.subject?.name || ""
            ).toLowerCase();

        return (
            examName.includes(searchValue) ||
            studentName.includes(searchValue) ||
            subjectName.includes(searchValue)
        );

    });

    if (!results.length) {

        rows = `
            <tr>
                <td
                    colspan="9"
                    style="
                        text-align:center;
                        padding:40px;
                        color:#94a3b8;
                    "
                >
                    No results found.
                </td>
            </tr>
        `;

    } else {

       filteredResults.forEach(function (result) {

            const id =
                result._id ||
                result.id;
                 const totalMarks =
    Number(result.totalMarks || 0);

const marksObtained =
    Number(result.marksObtained || 0);

const percentage =
    totalMarks > 0
        ? (
            (marksObtained / totalMarks) * 100
          ).toFixed(2)
        : "0.00";  
            let calculatedGrade = "-";

const percentageValue =
    Number(percentage);

if (percentageValue >= 90) {
    calculatedGrade = "A+";
} else if (percentageValue >= 80) {
    calculatedGrade = "A";
} else if (percentageValue >= 70) {
    calculatedGrade = "B+";
} else if (percentageValue >= 60) {
    calculatedGrade = "B";
} else if (percentageValue >= 50) {
    calculatedGrade = "C";
} else if (percentageValue >= 40) {
    calculatedGrade = "D";
} else if (totalMarks > 0) {
    calculatedGrade = "F";
} 
            const exam =
                result.exam || {};

            const student =
                result.student || {};

            const subject =
                result.subject || {};

            const studentName =
                (
                    student.firstName || ""
                ) +
                " " +
                (
                    student.lastName || ""
                );

            rows += `

                <tr>

                    <td>
                        ${escapeHtml(
                            exam.name || "-"
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            studentName.trim() ||
                            student.name ||
                            "-"
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            subject.subjectName ||
                            subject.name ||
                            "-"
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            String(
                                result.totalMarks ?? "-"
                            )
                        )}
                    </td>

                    <td>
                        ${escapeHtml(
                            String(
                                result.marksObtained ?? "-"
                            )
                        )}
                    </td>
                    <td>
    ${percentage}%
</td>

                    <td>
    ${escapeHtml(
        calculatedGrade
    )}
</td>

                    <td>
                        ${escapeHtml(
                            result.remarks || "-"
                        )}
                    </td>

                    <td>
                    <button
    type="button"
    class="edit-result-button"
    data-id="${escapeHtml(id)}"
    style="
        padding:8px 12px;
        border:1px solid #2563eb;
        border-radius:10px;
        background:#172554;
        color:#bfdbfe;
        cursor:pointer;
        margin-right:6px;
    "
>
    Edit
</button>

                        <button
                            type="button"
                            class="delete-result-button"
                            data-id="${escapeHtml(id)}"
                            style="
                                padding:8px 12px;
                                border:1px solid #7f1d1d;
                                border-radius:10px;
                                background:#3b1720;
                                color:#fecaca;
                                cursor:pointer;
                            "
                        >
                            Delete
                        </button>

                    </td>

                </tr>

            `;

        });

    }


    moduleContent.innerHTML = `

        <div>

            <div style="
                margin-bottom:20px;
            ">

                <h3 style="
                    color:#ffffff;
                    margin-bottom:5px;
                ">
                    Exam Results
                </h3>

                <p style="
                    color:#94a3b8;
                ">
                    Total Results:
                    <strong>
                        ${results.length}
                    </strong>
                </p>
                <div style="
    display:flex;
    gap:12px;
    margin-bottom:20px;
    flex-wrap:wrap;
">

    <input
        type="text"
        id="resultSearchInput"
        placeholder="Search student, exam or subject..."
        style="
            flex:1;
            min-width:250px;
            padding:12px 14px;
            border:1px solid #334e68;
            border-radius:10px;
            background:#0f1f33;
            color:#ffffff;
            outline:none;
        "
    >

</div>

            </div>


            <div style="
                overflow-x:auto;
            ">

                <table style="
                    width:100%;
                    border-collapse:collapse;
                    min-width:950px;
                ">

                    <thead>

                        <tr>

                            <th style="${tableHeaderStyle()}">
                                Exam
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Student
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Subject
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Total Marks
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Obtained
                            </th>
                            <th style="${tableHeaderStyle()}">
    Percentage
</th>

                            <th style="${tableHeaderStyle()}">
                                Grade
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Remarks
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>

                        ${rows}

                    </tbody>

                </table>

            </div>

        </div>


    `;
    const searchInput =
    document.getElementById("resultSearchInput");

if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const value =
                searchInput.value
                    .trim()
                    .toLowerCase();

            const filteredResults =
                results.filter(function (result) {

                    const examName =
                        result.exam?.name || "";

                    const student =
                        result.student || {};

                    const studentName =
                        (
                            student.firstName || ""
                        ) +
                        " " +
                        (
                            student.lastName || ""
                        );

                    const subject =
                        result.subject || {};

                    const subjectName =
                        subject.subjectName ||
                        subject.name ||
                        "";

                    return (
                        examName
                            .toLowerCase()
                            .includes(value) ||

                        studentName
                            .toLowerCase()
                            .includes(value) ||

                        subjectName
                            .toLowerCase()
                            .includes(value)
                    );
                });

           renderResults(filteredResults);

const newSearchInput =
    document.getElementById("resultSearchInput");

if (newSearchInput) {
    newSearchInput.value = value;
    newSearchInput.focus();

    newSearchInput.setSelectionRange(
        value.length,
        value.length
    );
}
        }
    );
}

    // =================================================
// EDIT RESULT BUTTON
// =================================================

document
    .querySelectorAll(
        ".edit-result-button"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                openEditResultForm(
                    button.dataset.id
                );

            }
        );

    });
    document
        .querySelectorAll(
            ".delete-result-button"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    deleteResult(
                        button.dataset.id
                    );

                }
            );

        });

}
// =====================================================
// DELETE RESULT
// =====================================================

async function deleteResult(id) {

    const confirmed =
        confirm(
            "Are you sure you want to delete this result?"
        );

    if (!confirmed) {
        return;
    }

    try {

        const response =
            await fetch(
                `/api/results/${encodeURIComponent(id)}`,
                {
                    method: "DELETE"
                }
            );

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to delete result."
            );

        }

        showToast(
            data.message ||
            "Result deleted successfully."
        );

        await loadResults();

    } catch (error) {

        console.error(
            "Result Delete Error:",
            error
        );

        showToast(
            error.message
        );

    }

}
// =====================================================
// EDIT RESULT FORM
// =====================================================

async function openEditResultForm(id) {

    moduleContent.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">⏳</div>
            <h3>Loading Result...</h3>
            <p>Please wait.</p>
        </div>
    `;

    try {

        const results =
            await getResults();

        const result =
            results.find(function (item) {

                return String(
                    item._id || item.id
                ) === String(id);

            });


        if (!result) {

            throw new Error(
                "Result not found."
            );

        }


        const exams =
            await getExams();

        const studentsResponse =
            await fetch("/api/students");

        const studentsData =
            await studentsResponse.json();

        if (
            !studentsResponse.ok ||
            !studentsData.success
        ) {

            throw new Error(
                studentsData.message ||
                "Unable to fetch students."
            );

        }


        const students =
            studentsData.data || [];

        const subjects =
            await getSubjects();


        const examId =
            result.exam?._id ||
            result.exam?.id ||
            result.exam ||
            "";

        const studentId =
            result.student?._id ||
            result.student?.id ||
            result.student ||
            "";

        const subjectId =
            result.subject?._id ||
            result.subject?.id ||
            result.subject ||
            "";


        moduleContent.innerHTML = `

            <div>

                <h2 style="
                    color:#ffffff;
                    margin-bottom:8px;
                ">
                    Edit Result
                </h2>

                <p style="
                    color:#94a3b8;
                    margin-bottom:25px;
                ">
                    Update student examination result.
                </p>


                <form id="editResultForm">

                    <div style="
                        display:grid;
                        grid-template-columns:
                            repeat(2, minmax(0, 1fr));
                        gap:18px;
                    ">

                        <div>

                            <label style="${labelStyle()}">
                                Exam *
                            </label>

                            <select
                                name="exam"
                                required
                                style="${inputStyle()}"
                            >

                                ${exams.map(
                                    function (exam) {

                                        const value =
                                            exam._id ||
                                            exam.id;

                                        return `
                                            <option
                                                value="${escapeHtml(value)}"
                                                ${
                                                    String(value) ===
                                                    String(examId)
                                                        ? "selected"
                                                        : ""
                                                }
                                            >
                                                ${escapeHtml(
                                                    exam.name
                                                )}
                                            </option>
                                        `;

                                    }
                                ).join("")}

                            </select>

                        </div>


                        <div>

                            <label style="${labelStyle()}">
                                Student *
                            </label>

                            <select
                                name="student"
                                required
                                style="${inputStyle()}"
                            >

                                ${students.map(
                                    function (student) {

                                        const value =
                                            student._id ||
                                            student.id;

                                        const studentName =
                                            (
                                                student.firstName ||
                                                ""
                                            ) +
                                            " " +
                                            (
                                                student.lastName ||
                                                ""
                                            );

                                        return `
                                            <option
                                                value="${escapeHtml(value)}"
                                                ${
                                                    String(value) ===
                                                    String(studentId)
                                                        ? "selected"
                                                        : ""
                                                }
                                            >
                                                ${escapeHtml(
                                                    studentName.trim() ||
                                                    student.name ||
                                                    "Student"
                                                )}
                                            </option>
                                        `;

                                    }
                                ).join("")}

                            </select>

                        </div>


                        <div>

                            <label style="${labelStyle()}">
                                Subject *
                            </label>

                            <select
                                name="subject"
                                required
                                style="${inputStyle()}"
                            >

                                ${subjects.map(
                                    function (subject) {

                                        const value =
                                            subject._id ||
                                            subject.id;

                                        return `
                                            <option
                                                value="${escapeHtml(value)}"
                                                ${
                                                    String(value) ===
                                                    String(subjectId)
                                                        ? "selected"
                                                        : ""
                                                }
                                            >
                                                ${escapeHtml(
                                                    subject.subjectName ||
                                                    subject.name ||
                                                    "-"
                                                )}
                                            </option>
                                        `;

                                    }
                                ).join("")}

                            </select>

                        </div>


                        ${formField(
                            "Total Marks",
                            "totalMarks",
                            result.totalMarks ?? "",
                            true,
                            "number"
                        )}


                        ${formField(
                            "Marks Obtained",
                            "marksObtained",
                            result.marksObtained ?? "",
                            true,
                            "number"
                        )}


                        ${formField(
                            "Grade",
                            "grade",
                            result.grade || "",
                            false,
                            "text"
                        )}


                        ${formField(
                            "Remarks",
                            "remarks",
                            result.remarks || "",
                            false,
                            "text"
                        )}

                    </div>


                    <div style="
                        display:flex;
                        gap:12px;
                        margin-top:25px;
                    ">

                        <button
                            type="submit"
                            class="primary-button"
                        >
                            Update Result
                        </button>


                        <button
                            type="button"
                            id="cancelEditResultButton"
                            style="
                                padding:13px 20px;
                                border:1px solid #334e68;
                                border-radius:10px;
                                background:#14263e;
                                color:#ffffff;
                                font-weight:700;
                                cursor:pointer;
                            "
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;


        const form =
            document.getElementById(
                "editResultForm"
            );


        form.addEventListener(
            "submit",
            function (event) {

                handleEditResultSubmit(
                    event,
                    id
                );

            }
        );


        document
            .getElementById(
                "cancelEditResultButton"
            )
            .addEventListener(
                "click",
                loadResults
            );


    } catch (error) {

        console.error(
            "Edit Result Form Error:",
            error
        );

        showToast(
            error.message
        );

        loadResults();

    }

}
// =====================================================
// UPDATE RESULT
// =====================================================

async function handleEditResultSubmit(event, id) {

    event.preventDefault();

    const form =
        event.currentTarget;

    const formData =
        new FormData(form);

    const resultData = {

        exam:
            formData.get("exam"),

        student:
            formData.get("student"),

        subject:
            formData.get("subject"),

        totalMarks:
            Number(
                formData.get("totalMarks")
            ),

        marksObtained:
            Number(
                formData.get("marksObtained")
            ),

        grade:
            formData.get("grade") || "",

        remarks:
            formData.get("remarks") || ""

    };


    if (
        resultData.marksObtained >
        resultData.totalMarks
    ) {

        showToast(
            "Marks obtained cannot exceed total marks."
        );

        return;
    }


    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );


    if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
            "Updating...";

    }


    try {

        const response =
            await fetch(
                `/api/results/${encodeURIComponent(id)}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            resultData
                        )
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to update result."
            );

        }


        showToast(
            data.message ||
            "Result updated successfully."
        );


        await loadResults();


    } catch (error) {

        console.error(
            "Result Update Error:",
            error
        );


        showToast(
            error.message
        );


        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                "Update Result";

        }

    }

}
// =====================================================
// ATTENDANCE API
// =====================================================

async function getAttendance() {

    const response =
        await fetch("/api/attendance");

    const data =
        await response.json();

    if (!response.ok || !data.success) {

        throw new Error(
            data.message ||
            "Unable to fetch attendance."
        );
    }

    return data.data || [];
}


// =====================================================
// LOAD ATTENDANCE
// =====================================================

async function loadAttendance() {

    moduleAddButton.textContent =
        "+ Mark Attendance";

    moduleAddButton.onclick =
        openAddAttendanceForm;


    moduleContent.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">
                ⏳
            </div>

            <h3>
                Loading Attendance...
            </h3>

            <p>
                Please wait.
            </p>

        </div>

    `;


    try {

        const attendance =
            await getAttendance();

        renderAttendance(
            attendance
        );

    } catch (error) {

        console.error(
            "Attendance Loading Error:",
            error
        );

        showToast(
            error.message
        );

    }

}
// =====================================================
// RENDER ATTENDANCE
// =====================================================

function renderAttendance(attendance) {

    let rows = "";

    if (!attendance.length) {

        rows = `
            <tr>
                <td
                    colspan="6"
                    style="
                        text-align:center;
                        padding:40px;
                        color:#94a3b8;
                    "
                >
                    No attendance records found.
                </td>
            </tr>
        `;

    } else {

        attendance.forEach(function (item) {

            const id =
                item._id || item.id;

            const student =
                item.student || {};

            const studentName =
                `${student.firstName || ""} ${student.lastName || ""}`
                    .trim() || "-";

            const rollNumber =
                student.rollNumber || "-";

            const date =
                item.date
                    ? new Date(item.date)
                        .toLocaleDateString("en-IN")
                    : "-";

            const status =
                item.status || "-";

            const remarks =
                item.remarks || "-";


            rows += `

                <tr>

                    <td>
                        <strong>
                            ${escapeHtml(studentName)}
                        </strong>
                    </td>

                    <td>
                        ${escapeHtml(
                            String(rollNumber)
                        )}
                    </td>

                    <td>
                        ${escapeHtml(date)}
                    </td>

                    <td>
                        <span
                            style="
                                display:inline-block;
                                padding:5px 9px;
                                border-radius:20px;
                                background:#172554;
                                color:#bfdbfe;
                                font-size:12px;
                            "
                        >
                            ${escapeHtml(status)}
                        </span>
                    </td>

                    <td>
                        ${escapeHtml(remarks)}
                    </td>

                   <td>

    <div
        style="
            display:flex;
            gap:8px;
            flex-wrap:wrap;
        "
    >

        <button
            type="button"
            class="primary-button edit-attendance-button"
            data-id="${escapeHtml(id)}"
            style="
                padding:8px 12px;
            "
        >
            Edit
        </button>


        <button
            type="button"
            class="delete-attendance-button"
            data-id="${escapeHtml(id)}"
            style="
                padding:8px 12px;
                border:1px solid #7f1d1d;
                border-radius:10px;
                background:#3b1720;
                color:#fecaca;
                cursor:pointer;
            "
        >
            Delete
        </button>

    </div>

</td> 

                </tr>

            `;

        });

    }


    moduleContent.innerHTML = `

        <div>

            <div style="
                margin-bottom:20px;
            ">

                <h3 style="
                    color:#ffffff;
                    margin-bottom:5px;
                ">
                    Attendance
                </h3>

                <p style="
                    color:#94a3b8;
                    font-size:13px;
                ">
                    Total Records:
                    <strong>
                        ${attendance.length}
                    </strong>
                </p>

            </div>

            <div
                style="
                    display:grid;
                    grid-template-columns:
                        repeat(3, minmax(0, 1fr));
                    gap:12px;
                    margin-bottom:20px;
                "
            >

                <input
                    type="text"
                    id="attendanceSearch"
                    placeholder="🔎 Search student name..."
                    style="${inputStyle()}"
                >


                <input
                    type="date"
                    id="attendanceDateFilter"
                    style="${inputStyle()}"
                >


                <select
                    id="attendanceStatusFilter"
                    style="${inputStyle()}"
                >

                    <option value="">
                        All Status
                    </option>

                    <option value="present">
                        Present
                    </option>

                    <option value="absent">
                        Absent
                    </option>

                    <option value="late">
                        Late
                    </option>

                    <option value="leave">
                        Leave
                    </option>

                </select>

            </div>
            <div style="
                overflow-x:auto;
            ">

                <table
                    id="attendanceTable"
                    style="
                        width:100%;
                        border-collapse:collapse;
                        min-width:850px;
                    "
                >

                    <thead>

                        <tr>

                            <th style="${tableHeaderStyle()}">
                                Student
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Roll Number
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Date
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Status
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Remarks
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>
                        ${rows}
                    </tbody>

                </table>

            </div>

        </div>

    `;
// =================================================
// EDIT ATTENDANCE BUTTON
// =================================================

document
    .querySelectorAll(
        ".edit-attendance-button"
    )
    .forEach(function (button) {

        button.addEventListener(
            "click",
            function () {

                openEditAttendanceForm(
                    button.dataset.id
                );

            }
        );

    });
    // =================================================
    // ATTENDANCE FILTER
    // =================================================

    const searchInput =
        document.getElementById(
            "attendanceSearch"
        );

    const dateFilter =
        document.getElementById(
            "attendanceDateFilter"
        );

    const statusFilter =
        document.getElementById(
            "attendanceStatusFilter"
        );


    function applyAttendanceFilter() {

        const search =
            (searchInput.value || "")
                .trim()
                .toLowerCase();

        const selectedDate =
            dateFilter.value || "";

        const selectedStatus =
            (statusFilter.value || "")
                .toLowerCase();


        const filtered =
            attendance.filter(function (item) {

                const student =
                    item.student || {};

                const studentName =
                    `${student.firstName || ""} ${student.lastName || ""}`
                        .trim()
                        .toLowerCase();


                const nameMatch =
                    !search ||
                    studentName.includes(search);


                let dateMatch = true;

                if (selectedDate && item.date) {

                    const itemDate =
                        new Date(item.date)
                            .toISOString()
                            .split("T")[0];

                    dateMatch =
                        itemDate === selectedDate;

                }


                const status =
                    String(
                        item.status || ""
                    ).toLowerCase();

                const statusMatch =
                    !selectedStatus ||
                    status === selectedStatus;


                return (
                    nameMatch &&
                    dateMatch &&
                    statusMatch
                );

            });


        const tableBody =
            document.querySelector(
                "#attendanceTable tbody"
            );


        if (!tableBody) {
            return;
        }


        if (!filtered.length) {

            tableBody.innerHTML = `

                <tr>

                    <td
                        colspan="6"
                        style="
                            text-align:center;
                            padding:40px;
                            color:#94a3b8;
                        "
                    >
                        No attendance records found.
                    </td>

                </tr>

            `;

            return;

        }


        let filteredRows = "";


        filtered.forEach(function (item) {

            const id =
                item._id || item.id;

            const student =
                item.student || {};

            const studentName =
                `${student.firstName || ""} ${student.lastName || ""}`
                    .trim() || "-";

            const rollNumber =
                student.rollNumber || "-";

            const date =
                item.date
                    ? new Date(item.date)
                        .toLocaleDateString("en-IN")
                    : "-";

            const status =
                item.status || "-";

            const remarks =
                item.remarks || "-";


            filteredRows += `

                <tr>

                    <td>
                        <strong>
                            ${escapeHtml(
                                studentName
                            )}
                        </strong>
                    </td>

                    <td>
                        ${escapeHtml(
                            String(
                                rollNumber
                            )
                        )}
                    </td>

                    <td>
                        ${escapeHtml(date)}
                    </td>

                    <td>
                        <span
                            style="
                                display:inline-block;
                                padding:5px 9px;
                                border-radius:20px;
                                background:#172554;
                                color:#bfdbfe;
                                font-size:12px;
                            "
                        >
                            ${escapeHtml(status)}
                        </span>
                    </td>

                    <td>
                        ${escapeHtml(remarks)}
                    </td>

                    <td>

                        <div
                            style="
                                display:flex;
                                gap:8px;
                                flex-wrap:wrap;
                            "
                        >

                            <button
                                type="button"
                                class="primary-button edit-attendance-button"
                                data-id="${escapeHtml(id)}"
                                style="
                                    padding:8px 12px;
                                "
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                class="delete-attendance-button"
                                data-id="${escapeHtml(id)}"
                                style="
                                    padding:8px 12px;
                                    border:1px solid #7f1d1d;
                                    border-radius:10px;
                                    background:#3b1720;
                                    color:#fecaca;
                                    cursor:pointer;
                                "
                            >
                                Delete
                            </button>

                        </div>

                    </td>

                </tr>

            `;

        });


        tableBody.innerHTML =
            filteredRows;

    }


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyAttendanceFilter
        );

    }


    if (dateFilter) {

        dateFilter.addEventListener(
            "change",
            applyAttendanceFilter
        );

    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            applyAttendanceFilter
        );

    }
    document
        .querySelectorAll(
            ".delete-attendance-button"
        )
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    deleteAttendance(
                        button.dataset.id
                    );

                }
            );

        });

}
// =====================================================
// DELETE ATTENDANCE
// =====================================================

async function deleteAttendance(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this attendance?"
    );

    if (!confirmed) {
        return;
    }

    try {

        const response = await fetch(
            `/api/attendance/${encodeURIComponent(id)}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to delete attendance."
            );

        }

        showToast(
            data.message ||
            "Attendance deleted successfully."
        );

        // Attendance list dobara load karo
        await loadAttendance();

    } catch (error) {

        console.error(
            "Attendance Delete Error:",
            error
        );

        showToast(
            error.message ||
            "Unable to delete attendance."
        );

    }

}

// =====================================================
// ADD ATTENDANCE FORM
// =====================================================

async function openAddAttendanceForm() {

    let students = [];

    try {

        const response =
            await fetch("/api/students");

        const data =
            await response.json();

        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to load students."
            );

        }

        students =
            data.data || [];

    } catch (error) {

        console.error(
            "Student Loading Error:",
            error
        );

        showToast(
            error.message
        );

        return;

    }


    const studentOptions =
        students.map(
            function (student) {

                const id =
                    student._id ||
                    student.id;

                const name =
                    `${student.firstName || ""} ${student.lastName || ""}`
                        .trim() ||
                    "Student";

                const roll =
                    student.rollNumber ||
                    "-";

                return `
                    <option
                        value="${escapeHtml(id)}"
                    >
                        ${escapeHtml(name)}
                        — Roll: ${escapeHtml(
                            String(roll)
                        )}
                    </option>
                `;

            }
        ).join("");


    moduleContent.innerHTML = `

        <div>

            <h2 style="
                color:#ffffff;
                margin-bottom:8px;
            ">
                Mark Attendance
            </h2>

            <p style="
                color:#94a3b8;
                margin-bottom:25px;
            ">
                Mark attendance for a student.
            </p>


            <form id="attendanceForm">

                <div style="
                    display:grid;
                    grid-template-columns:
                        repeat(2, minmax(0, 1fr));
                    gap:18px;
                ">


                    <div>

                        <label style="${labelStyle()}">
                            Student
                        </label>

                        <select
                            name="student"
                            required
                            style="${inputStyle()}"
                        >

                            <option value="">
                                Select Student
                            </option>

                            ${studentOptions}

                        </select>

                    </div>


                    ${formField(
                        "Date",
                        "date",
                        new Date()
                            .toISOString()
                            .split("T")[0],
                        true,
                        "date"
                    )}


                    <div>

                        <label style="${labelStyle()}">
                            Status
                        </label>

                        <select
                            name="status"
                            required
                            style="${inputStyle()}"
                        >

                            <option value="present">
                                Present
                            </option>

                            <option value="absent">
                                Absent
                            </option>

                            <option value="late">
                                Late
                            </option>

                            <option value="leave">
                                Leave
                            </option>

                        </select>

                    </div>


                    ${formField(
                        "Remarks",
                        "remarks",
                        "",
                        false,
                        "text"
                    )}

                </div>


                <div style="
                    display:flex;
                    gap:12px;
                    margin-top:25px;
                    flex-wrap:wrap;
                ">

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        Save Attendance
                    </button>

                    <button
                        type="button"
                        id="cancelAttendanceButton"
                        style="
                            padding:13px 20px;
                            border:1px solid #334e68;
                            border-radius:10px;
                            background:#14263e;
                            color:#ffffff;
                            font-weight:700;
                            cursor:pointer;
                        "
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    `;


    const form =
        document.getElementById(
            "attendanceForm"
        );


    form.addEventListener(
        "submit",
        handleAttendanceFormSubmit
    );


    document
        .getElementById(
            "cancelAttendanceButton"
        )
        .addEventListener(
            "click",
            loadAttendance
        );

}
// =====================================================
// EDIT ATTENDANCE FORM
// =====================================================

async function openEditAttendanceForm(id) {

    let attendanceList = [];
    let students = [];

    try {

        const attendanceResponse =
            await fetch("/api/attendance");

        const attendanceData =
            await attendanceResponse.json();

        if (
            !attendanceResponse.ok ||
            !attendanceData.success
        ) {
            throw new Error(
                attendanceData.message ||
                "Unable to load attendance."
            );
        }

        attendanceList =
            attendanceData.data || [];


        const studentResponse =
            await fetch("/api/students");

        const studentData =
            await studentResponse.json();

        if (
            !studentResponse.ok ||
            !studentData.success
        ) {
            throw new Error(
                studentData.message ||
                "Unable to load students."
            );
        }

        students =
            studentData.data || [];


        const attendance =
            attendanceList.find(function (item) {

                return String(
                    item._id || item.id
                ) === String(id);

            });


        if (!attendance) {

            throw new Error(
                "Attendance record not found."
            );

        }


        const currentStudentId =
            attendance.student
                ? (
                    attendance.student._id ||
                    attendance.student.id
                )
                : "";


        const currentDate =
            attendance.date
                ? new Date(attendance.date)
                    .toISOString()
                    .split("T")[0]
                : "";


        const studentOptions =
            students.map(function (student) {

                const studentId =
                    student._id ||
                    student.id;

                const studentName =
                    `${student.firstName || ""} ${student.lastName || ""}`
                        .trim() ||
                    student.name ||
                    "Student";

                const roll =
                    student.rollNumber ||
                    "-";


                return `
                    <option
                        value="${escapeHtml(studentId)}"
                        ${
                            String(studentId) ===
                            String(currentStudentId)
                                ? "selected"
                                : ""
                        }
                    >
                        ${escapeHtml(studentName)}
                        — Roll: ${escapeHtml(
                            String(roll)
                        )}
                    </option>
                `;

            }).join("");


        moduleContent.innerHTML = `

            <div>

                <h2 style="
                    color:#ffffff;
                    margin-bottom:8px;
                ">
                    Edit Attendance
                </h2>

                <p style="
                    color:#94a3b8;
                    margin-bottom:25px;
                ">
                    Update attendance information.
                </p>


                <form id="editAttendanceForm">

                    <div style="
                        display:grid;
                        grid-template-columns:
                            repeat(2, minmax(0, 1fr));
                        gap:18px;
                    ">


                        <div>

                            <label style="${labelStyle()}">
                                Student
                            </label>

                            <select
                                name="student"
                                required
                                style="${inputStyle()}"
                            >

                                <option value="">
                                    Select Student
                                </option>

                                ${studentOptions}

                            </select>

                        </div>


                        ${formField(
                            "Date",
                            "date",
                            currentDate,
                            true,
                            "date"
                        )}


                        <div>

                            <label style="${labelStyle()}">
                                Status
                            </label>

                            <select
                                name="status"
                                required
                                style="${inputStyle()}"
                            >

                                <option
                                    value="present"
                                    ${
                                        attendance.status ===
                                        "present"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    Present
                                </option>

                                <option
                                    value="absent"
                                    ${
                                        attendance.status ===
                                        "absent"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    Absent
                                </option>

                                <option
                                    value="late"
                                    ${
                                        attendance.status ===
                                        "late"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    Late
                                </option>

                                <option
                                    value="leave"
                                    ${
                                        attendance.status ===
                                        "leave"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    Leave
                                </option>

                            </select>

                        </div>


                        ${formField(
                            "Remarks",
                            "remarks",
                            attendance.remarks || "",
                            false,
                            "text"
                        )}

                    </div>


                    <div style="
                        display:flex;
                        gap:12px;
                        margin-top:25px;
                        flex-wrap:wrap;
                    ">

                        <button
                            type="submit"
                            class="primary-button"
                        >
                            Update Attendance
                        </button>


                        <button
                            type="button"
                            id="cancelEditAttendanceButton"
                            style="
                                padding:13px 20px;
                                border:1px solid #334e68;
                                border-radius:10px;
                                background:#14263e;
                                color:#ffffff;
                                font-weight:700;
                                cursor:pointer;
                            "
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;


        const form =
            document.getElementById(
                "editAttendanceForm"
            );


        form.addEventListener(
            "submit",
            function (event) {

                handleEditAttendanceSubmit(
                    event,
                    id
                );

            }
        );


        document
            .getElementById(
                "cancelEditAttendanceButton"
            )
            .addEventListener(
                "click",
                loadAttendance
            );


    } catch (error) {

        console.error(
            "Edit Attendance Form Error:",
            error
        );

        showToast(
            error.message
        );

        loadAttendance();

    }

}

// =====================================================
// SAVE ATTENDANCE
// =====================================================

async function handleAttendanceFormSubmit(event) {

    event.preventDefault();

    const form = event.currentTarget;

    const formData =
        new FormData(form);

    const attendanceData = {

        student:
            formData.get("student"),

        date:
            formData.get("date"),

        status:
            formData.get("status"),

        remarks:
            formData.get("remarks")

    };


    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );


    if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
            "Saving...";

    }


    try {

        const response =
            await fetch(
                "/api/attendance",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            attendanceData
                        )
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to save attendance."
            );

        }


        showToast(
            data.message ||
            "Attendance saved successfully."
        );


        await loadAttendance();


    } catch (error) {

        console.error(
            "Attendance Save Error:",
            error
        );


        showToast(
            error.message
        );


        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                "Save Attendance";

        }

    }

}
// =====================================================
// UPDATE ATTENDANCE
// =====================================================

async function handleEditAttendanceSubmit(
    event,
    id
) {

    event.preventDefault();

    const form =
        event.currentTarget;

    const formData =
        new FormData(form);

    const attendanceData = {

        student:
            formData.get("student"),

        date:
            formData.get("date"),

        status:
            formData.get("status"),

        remarks:
            formData.get("remarks")

    };


    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );


    if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
            "Updating...";

    }


    try {

        const response =
            await fetch(
                `/api/attendance/${encodeURIComponent(id)}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            attendanceData
                        )
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to update attendance."
            );

        }


        showToast(
            data.message ||
            "Attendance updated successfully."
        );


        await loadAttendance();


    } catch (error) {

        console.error(
            "Attendance Update Error:",
            error
        );


        showToast(
            error.message
        );


        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                "Update Attendance";

        }

    }

}

    // =====================================================
// CLASS API
// =====================================================

async function getClasses() {

    const response =
        await fetch("/api/classes");

    const data =
        await response.json();

    if (!response.ok || !data.success) {

        throw new Error(
            data.message ||
            "Unable to fetch classes."
        );
    }

    return data.data || [];
}


// =====================================================
// LOAD CLASSES
// =====================================================

async function loadClasses() {

    moduleAddButton.textContent =
        "+ Add Class";

    moduleAddButton.onclick =
        openAddClassForm;


    moduleContent.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">
                ⏳
            </div>

            <h3>
                Loading Classes...
            </h3>

            <p>
                Please wait.
            </p>

        </div>

    `;


    try {

        const classes =
            await getClasses();

        renderClasses(classes);

    } catch (error) {

        console.error(
            "Class Loading Error:",
            error
        );


        moduleContent.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to Load Classes
                </h3>

                <p>
                    ${escapeHtml(error.message)}
                </p>

                <button
                    type="button"
                    id="retryClassesButton"
                    class="primary-button"
                    style="margin-top:20px;"
                >
                    Retry
                </button>

            </div>

        `;


        const retryButton =
            document.getElementById(
                "retryClassesButton"
            );


        if (retryButton) {

            retryButton.onclick =
                loadClasses;

        }

    }

}


// =====================================================
// RENDER CLASSES
// =====================================================

function renderClasses(classes) {

    let rows = "";


    if (!classes.length) {

        rows = `

            <tr>

                <td
                    colspan="7"
                    style="
                        text-align:center;
                        padding:40px;
                        color:#94a3b8;
                    "
                >
                    No classes found.
                </td>

            </tr>

        `;

    } else {

        classes.forEach(
            function (classItem) {

                const id =
                    classItem._id ||
                    classItem.id;


                const className =
                    classItem.className ||
                    "-";


                const classCode =
                    classItem.classCode ||
                    "-";


                const sections =
                    classItem.sections ||
                    [];


                const sectionNames =
                    sections.length
                        ? sections
                            .map(
                                function (section) {

                                    return (
                                        section.name ||
                                        "-"
                                    );

                                }
                            )
                            .join(", ")
                        : "No sections";


                const status =
                    classItem.status ||
                    "active";


                rows += `

                    <tr>

                        <td>
                            <strong>
                                ${escapeHtml(className)}
                            </strong>
                        </td>


                        <td>
                            ${escapeHtml(classCode)}
                        </td>


                        <td>
                            ${escapeHtml(
                                String(
                                    sections.length
                                )
                            )}
                        </td>


                        <td>
                            ${escapeHtml(
                                sectionNames
                            )}
                        </td>


                        <td>

                            <span
                                style="
                                    display:inline-block;
                                    padding:5px 9px;
                                    border-radius:20px;
                                    background:${
                                        status === "active"
                                            ? "#064e3b"
                                            : "#3f1d1d"
                                    };
                                    color:${
                                        status === "active"
                                            ? "#a7f3d0"
                                            : "#fecaca"
                                    };
                                    font-size:12px;
                                "
                            >
                                ${escapeHtml(status)}
                            </span>

                        </td>


                        <td>

                            <div
                                style="
                                    display:flex;
                                    gap:8px;
                                    flex-wrap:wrap;
                                "
                            >

                                <button
                                    type="button"
                                    class="primary-button edit-class-button"
                                    data-id="${escapeHtml(id)}"
                                    style="
                                        padding:8px 12px;
                                    "
                                >
                                    Edit
                                </button>


                                <button
                                    type="button"
                                    class="section-class-button"
                                    data-id="${escapeHtml(id)}"
                                    style="
                                        padding:8px 12px;
                                        border:1px solid #2563eb;
                                        border-radius:10px;
                                        background:#172554;
                                        color:#bfdbfe;
                                        cursor:pointer;
                                    "
                                >
                                    Sections
                                </button>


                                <button
                                    type="button"
                                    class="delete-class-button"
                                    data-id="${escapeHtml(id)}"
                                    style="
                                        padding:8px 12px;
                                        border:1px solid #7f1d1d;
                                        border-radius:10px;
                                        background:#3b1720;
                                        color:#fecaca;
                                        cursor:pointer;
                                    "
                                >
                                    Delete
                                </button>

                            </div>

                        </td>

                    </tr>

                `;

            }
        );

    }


    moduleContent.innerHTML = `

        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:15px;
            flex-wrap:wrap;
            margin-bottom:20px;
        ">

            <div>

                <h3 style="
                    color:#ffffff;
                    margin-bottom:5px;
                ">
                    Classes & Sections
                </h3>

                <p style="
                    color:#94a3b8;
                    font-size:13px;
                ">
                    Total Classes:
                    <strong>
                        ${classes.length}
                    </strong>
                </p>

            </div>


            <input
                type="search"
                id="classSearch"
                placeholder="Search class..."
                style="
                    width:260px;
                    max-width:100%;
                    padding:12px;
                    border:1px solid #2b415b;
                    border-radius:10px;
                    background:#07111f;
                    color:#ffffff;
                    outline:none;
                "
            >

        </div>


        <div style="
            overflow-x:auto;
        ">

            <table
                id="classesTable"
                style="
                    width:100%;
                    border-collapse:collapse;
                    min-width:900px;
                "
            >

                <thead>

                    <tr>

                        <th style="${tableHeaderStyle()}">
                            Class
                        </th>

                        <th style="${tableHeaderStyle()}">
                            Code
                        </th>

                        <th style="${tableHeaderStyle()}">
                            Sections
                        </th>

                        <th style="${tableHeaderStyle()}">
                            Section Names
                        </th>

                        <th style="${tableHeaderStyle()}">
                            Status
                        </th>

                        <th style="${tableHeaderStyle()}">
                            Actions
                        </th>

                    </tr>

                </thead>


                <tbody>
                    ${rows}
                </tbody>

            </table>

        </div>

    `;


    // =================================================
    // SEARCH
    // =================================================

    const searchInput =
        document.getElementById(
            "classSearch"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const search =
                    searchInput.value
                        .toLowerCase()
                        .trim();


                document
                    .querySelectorAll(
                        "#classesTable tbody tr"
                    )
                    .forEach(
                        function (row) {

                            row.style.display =
                                row.textContent
                                    .toLowerCase()
                                    .includes(search)
                                    ? ""
                                    : "none";

                        }
                    );

            }
        );

    }


    // =================================================
    // EDIT
    // =================================================

    document
        .querySelectorAll(
            ".edit-class-button"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        openEditClassForm(
                            button.dataset.id
                        );

                    }
                );

            }
        );


    // =================================================
    // SECTIONS
    // =================================================

    document
        .querySelectorAll(
            ".section-class-button"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        openSections(
                            button.dataset.id
                        );

                    }
                );

            }
        );


    // =================================================
    // DELETE
    // =================================================

    document
        .querySelectorAll(
            ".delete-class-button"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        deleteClass(
                            button.dataset.id
                        );

                    }
                );

            }
        );

}
// =====================================================
// ADD CLASS
// =====================================================

function openAddClassForm() {

    moduleContent.innerHTML = `

        <div>

            <h2 style="
                color:#ffffff;
                margin-bottom:8px;
            ">
                Add Class
            </h2>

            <p style="
                color:#94a3b8;
                margin-bottom:25px;
            ">
                Create a new class.
            </p>


            <form id="classForm">

                <div style="
                    display:grid;
                    grid-template-columns:
                        repeat(2, minmax(0, 1fr));
                    gap:18px;
                ">

                    ${formField(
                        "Class Name",
                        "className",
                        "",
                        true,
                        "text"
                    )}


                    ${formField(
                        "Class Code",
                        "classCode",
                        "",
                        false,
                        "text"
                    )}


                    ${formField(
                        "Description",
                        "description",
                        "",
                        false,
                        "text"
                    )}


                    <div>

                        <label style="${labelStyle()}">
                            Status
                        </label>

                        <select
                            name="status"
                            style="${inputStyle()}"
                        >

                            <option value="active">
                                Active
                            </option>

                            <option value="inactive">
                                Inactive
                            </option>

                        </select>

                    </div>

                </div>


                <div style="
                    display:flex;
                    gap:12px;
                    margin-top:25px;
                    flex-wrap:wrap;
                ">

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        Save Class
                    </button>


                    <button
                        type="button"
                        id="cancelClassButton"
                        style="
                            padding:13px 20px;
                            border:1px solid #334e68;
                            border-radius:10px;
                            background:#14263e;
                            color:#ffffff;
                            font-weight:700;
                            cursor:pointer;
                        "
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    `;


    const form =
        document.getElementById(
            "classForm"
        );


    form.addEventListener(
        "submit",
        handleClassFormSubmit
    );


    document
        .getElementById(
            "cancelClassButton"
        )
        .addEventListener(
            "click",
            loadClasses
        );

}


// =====================================================
// CLASS FORM SUBMIT
// =====================================================

async function handleClassFormSubmit(event) {

    event.preventDefault();


    const form =
        event.currentTarget;


    const formData =
        new FormData(form);


    const classData = {

        className:
            formData.get("className"),

        classCode:
            formData.get("classCode"),

        description:
            formData.get("description"),

        status:
            formData.get("status")

    };


    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );


    if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
            "Saving...";

    }


    try {

        const response =
            await fetch(
                "/api/classes",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            classData
                        )
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to save class."
            );

        }


        showToast(
            data.message ||
            "Class created successfully."
        );


        await loadClasses();


    } catch (error) {

        console.error(
            "Class Save Error:",
            error
        );


        showToast(
            error.message
        );


        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                "Save Class";

        }

    }

}
// =====================================================
// EDIT CLASS
// =====================================================

async function openEditClassForm(id) {

    moduleContent.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">⏳</div>
            <h3>Loading Class...</h3>
            <p>Please wait.</p>
        </div>
    `;

    try {

        const response =
            await fetch(
                `/api/classes/${encodeURIComponent(id)}`
            );

        const data =
            await response.json();

        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to load class."
            );

        }

        const classItem =
            data.data;

        const className =
            classItem.className || "";

        const classCode =
            classItem.classCode || "";

        const description =
            classItem.description || "";

        const status =
            classItem.status || "active";


        moduleContent.innerHTML = `

            <div>

                <h2 style="
                    color:#ffffff;
                    margin-bottom:8px;
                ">
                    Edit Class
                </h2>

                <p style="
                    color:#94a3b8;
                    margin-bottom:25px;
                ">
                    Update class information.
                </p>


                <form id="editClassForm">

                    <div style="
                        display:grid;
                        grid-template-columns:
                            repeat(2, minmax(0, 1fr));
                        gap:18px;
                    ">

                        ${formField(
                            "Class Name",
                            "className",
                            className,
                            true,
                            "text"
                        )}

                        ${formField(
                            "Class Code",
                            "classCode",
                            classCode,
                            false,
                            "text"
                        )}

                        ${formField(
                            "Description",
                            "description",
                            description,
                            false,
                            "text"
                        )}

                        <div>

                            <label style="${labelStyle()}">
                                Status
                            </label>

                            <select
                                name="status"
                                style="${inputStyle()}"
                            >

                                <option
                                    value="active"
                                    ${
                                        status === "active"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    Active
                                </option>

                                <option
                                    value="inactive"
                                    ${
                                        status === "inactive"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    Inactive
                                </option>

                            </select>

                        </div>

                    </div>


                    <div style="
                        display:flex;
                        gap:12px;
                        margin-top:25px;
                        flex-wrap:wrap;
                    ">

                        <button
                            type="submit"
                            class="primary-button"
                        >
                            Update Class
                        </button>

                        <button
                            type="button"
                            id="cancelEditClassButton"
                            style="
                                padding:13px 20px;
                                border:1px solid #334e68;
                                border-radius:10px;
                                background:#14263e;
                                color:#ffffff;
                                font-weight:700;
                                cursor:pointer;
                            "
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;


        const form =
            document.getElementById(
                "editClassForm"
            );


        form.addEventListener(
            "submit",
            function (event) {

                handleEditClassSubmit(
                    event,
                    id
                );

            }
        );


        document
            .getElementById(
                "cancelEditClassButton"
            )
            .addEventListener(
                "click",
                loadClasses
            );


    } catch (error) {

        console.error(
            "Edit Class Form Error:",
            error
        );

        showToast(
            error.message
        );

        loadClasses();

    }

}
// =====================================================
// UPDATE CLASS SUBMIT
// =====================================================

async function handleEditClassSubmit(event, id) {

    event.preventDefault();

    const form =
        event.currentTarget;

    const formData =
        new FormData(form);

    const classData = {

        className:
            formData.get("className"),

        classCode:
            formData.get("classCode"),

        description:
            formData.get("description"),

        status:
            formData.get("status")

    };


    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );


    if (submitButton) {

        submitButton.disabled = true;

        submitButton.textContent =
            "Updating...";

    }


    try {

        const response =
            await fetch(
                `/api/classes/${encodeURIComponent(id)}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            classData
                        )
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to update class."
            );

        }


        showToast(
            data.message ||
            "Class updated successfully."
        );


        await loadClasses();


    } catch (error) {

        console.error(
            "Class Update Error:",
            error
        );


        showToast(
            error.message
        );


        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                "Update Class";

        }

    }

}
// =====================================================
// DELETE CLASS
// =====================================================

async function deleteClass(id) {

    const confirmed = confirm(
        "Are you sure you want to delete this class?"
    );

    if (!confirmed) {
        return;
    }

    try {

        const response = await fetch(
            `/api/classes/${encodeURIComponent(id)}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.message ||
                "Unable to delete class."
            );
        }

        showToast(
            data.message ||
            "Class deleted successfully."
        );

        await loadClasses();

    } catch (error) {

        console.error(
            "Class Delete Error:",
            error
        );

        showToast(
            error.message
        );
    }
}

// =====================================================
// SECTIONS
// =====================================================

async function openSections(classId) {

    moduleContent.innerHTML = `
        <div class="empty-state">
            <div class="empty-icon">⏳</div>
            <h3>Loading Sections...</h3>
            <p>Please wait.</p>
        </div>
    `;

    try {

        const response =
            await fetch(
                `/api/classes/${encodeURIComponent(classId)}`
            );

        const data =
            await response.json();

        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to load class."
            );
        }

        const classItem =
            data.data;

        renderSections(classItem);

    } catch (error) {

        console.error(
            "Section Loading Error:",
            error
        );

        showToast(error.message);

        loadClasses();
    }
}


// =====================================================
// RENDER SECTIONS
// =====================================================

function renderSections(classItem) {

    const sections =
        classItem.sections || [];

    const classId =
        classItem._id ||
        classItem.id;

    let rows = "";

    if (!sections.length) {

        rows = `
            <tr>
                <td
                    colspan="5"
                    style="
                        text-align:center;
                        padding:40px;
                        color:#94a3b8;
                    "
                >
                    No sections found.
                </td>
            </tr>
        `;

    } else {

        sections.forEach(
            function (section) {

                const teacher =
                    section.classTeacher;

                const teacherName =
                    teacher
                        ? `${teacher.firstName || ""} ${teacher.lastName || ""}`.trim()
                        : "Not Assigned";

                const sectionId =
                    section._id ||
                    section.id;

                rows += `
                    <tr>

                        <td>
                            <strong>
                                ${escapeHtml(
                                    section.name || "-"
                                )}
                            </strong>
                        </td>

                        <td>
                            ${escapeHtml(
                                String(
                                    section.capacity || 40
                                )
                            )}
                        </td>

                        <td>
                            ${escapeHtml(
                                teacherName
                            )}
                        </td>

                        <td>
                            ${escapeHtml(
                                section.status || "active"
                            )}
                        </td>

                        <td>

                            <button
                                type="button"
                                class="primary-button edit-section-button"
                                data-class-id="${escapeHtml(classId)}"
                                data-section-id="${escapeHtml(sectionId)}"
                                style="
                                    padding:8px 12px;
                                "
                            >
                                Edit
                            </button>

                            <button
                                type="button"
                                class="delete-section-button"
                                data-class-id="${escapeHtml(classId)}"
                                data-section-id="${escapeHtml(sectionId)}"
                                style="
                                    padding:8px 12px;
                                    margin-left:6px;
                                    border:1px solid #7f1d1d;
                                    border-radius:10px;
                                    background:#3b1720;
                                    color:#fecaca;
                                    cursor:pointer;
                                "
                            >
                                Delete
                            </button>

                        </td>

                    </tr>
                `;

            }
        );

    }


    moduleContent.innerHTML = `

        <div>

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:15px;
                flex-wrap:wrap;
                margin-bottom:20px;
            ">

                <div>

                    <h2 style="
                        color:#ffffff;
                        margin-bottom:6px;
                    ">
                        Class ${escapeHtml(
                            classItem.className || ""
                        )}
                    </h2>

                    <p style="
                        color:#94a3b8;
                    ">
                        Manage Sections
                    </p>

                </div>

                <div>

                    <button
                        type="button"
                        class="primary-button"
                        id="addSectionButton"
                    >
                        + Add Section
                    </button>

                    <button
                        type="button"
                        id="backToClassesButton"
                        style="
                            padding:12px 18px;
                            margin-left:8px;
                            border:1px solid #334e68;
                            border-radius:10px;
                            background:#14263e;
                            color:#ffffff;
                            font-weight:700;
                            cursor:pointer;
                        "
                    >
                        Back
                    </button>

                </div>

            </div>


            <div style="
                overflow-x:auto;
            ">

                <table style="
                    width:100%;
                    border-collapse:collapse;
                    min-width:750px;
                ">

                    <thead>

                        <tr>

                            <th style="${tableHeaderStyle()}">
                                Section
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Capacity
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Class Teacher
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Status
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>
                        ${rows}
                    </tbody>

                </table>

            </div>

        </div>

    `;


    document
        .getElementById(
            "backToClassesButton"
        )
        .addEventListener(
            "click",
            loadClasses
        );


    document
        .getElementById(
            "addSectionButton"
        )
        .addEventListener(
            "click",
            function () {

                openAddSectionForm(
                    classId
                );

            }
        );


    document
        .querySelectorAll(
            ".edit-section-button"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        openEditSectionForm(
                            button.dataset.classId,
                            button.dataset.sectionId
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".delete-section-button"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        deleteSection(
                            button.dataset.classId,
                            button.dataset.sectionId
                        );

                    }
                );

            }
        );

}
// =====================================================
// ADD SECTION
// =====================================================

async function openAddSectionForm(classId) {

    let teachers = [];

    try {

        const response =
            await fetch(
                "/api/classes/teachers/list"
            );

        const data =
            await response.json();

        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to load teachers."
            );
        }

        teachers =
            data.data || [];

    } catch (error) {

        showToast(error.message);
        return;

    }


    const teacherOptions =
        teachers.map(
            function (teacher) {

                const id =
                    teacher._id ||
                    teacher.id;

                const name =
                    `${teacher.firstName || ""} ${teacher.lastName || ""}`.trim() ||
                    "Teacher";

                return `
                    <option value="${escapeHtml(id)}">
                        ${escapeHtml(name)}
                    </option>
                `;

            }
        ).join("");


    moduleContent.innerHTML = `

        <div>

            <h2 style="
                color:#ffffff;
                margin-bottom:8px;
            ">
                Add Section
            </h2>

            <p style="
                color:#94a3b8;
                margin-bottom:25px;
            ">
                Add a section to this class.
            </p>


            <form id="sectionForm">

                <div style="
                    display:grid;
                    grid-template-columns:
                        repeat(2, minmax(0, 1fr));
                    gap:18px;
                ">

                    ${formField(
                        "Section Name",
                        "name",
                        "",
                        true,
                        "text"
                    )}


                    ${formField(
                        "Capacity",
                        "capacity",
                        "40",
                        true,
                        "number"
                    )}


                    <div>

                        <label style="${labelStyle()}">
                            Class Teacher
                        </label>

                        <select
                            name="classTeacher"
                            style="${inputStyle()}"
                        >

                            <option value="">
                                Not Assigned
                            </option>

                            ${teacherOptions}

                        </select>

                    </div>


                    <div>

                        <label style="${labelStyle()}">
                            Status
                        </label>

                        <select
                            name="status"
                            style="${inputStyle()}"
                        >

                            <option value="active">
                                Active
                            </option>

                            <option value="inactive">
                                Inactive
                            </option>

                        </select>

                    </div>

                </div>


                <div style="
                    display:flex;
                    gap:12px;
                    margin-top:25px;
                    flex-wrap:wrap;
                ">

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        Save Section
                    </button>


                    <button
                        type="button"
                        id="cancelSectionButton"
                        style="
                            padding:13px 20px;
                            border:1px solid #334e68;
                            border-radius:10px;
                            background:#14263e;
                            color:#ffffff;
                            font-weight:700;
                            cursor:pointer;
                        "
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    `;


    const form =
        document.getElementById(
            "sectionForm"
        );


    form.addEventListener(
        "submit",
        function (event) {

            handleSectionFormSubmit(
                event,
                classId
            );

        }
    );


    document
        .getElementById(
            "cancelSectionButton"
        )
        .addEventListener(
            "click",
            function () {

                openSections(
                    classId
                );

            }
        );

}


// =====================================================
// SAVE SECTION
// =====================================================

async function handleSectionFormSubmit(
    event,
    classId
) {

    event.preventDefault();


    const form =
        event.currentTarget;


    const formData =
        new FormData(form);


    const sectionData = {

        name:
            formData.get("name"),

        capacity:
            Number(
                formData.get("capacity")
            ),

        classTeacher:
            formData.get(
                "classTeacher"
            ) || null,

        status:
            formData.get("status")

    };


    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );


    if (submitButton) {

        submitButton.disabled =
            true;

        submitButton.textContent =
            "Saving...";

    }


    try {

        const response =
            await fetch(
                `/api/classes/${encodeURIComponent(classId)}/sections`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            sectionData
                        )
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to save section."
            );

        }


        showToast(
            data.message ||
            "Section added successfully."
        );


        openSections(
            classId
        );


    } catch (error) {

        console.error(
            "Section Save Error:",
            error
        );


        showToast(
            error.message
        );


        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                "Save Section";

        }

    }

}
// =====================================================
// EDIT SECTION
// =====================================================

async function openEditSectionForm(
    classId,
    sectionId
) {

    try {

        const classResponse =
            await fetch(
                `/api/classes/${encodeURIComponent(classId)}`
            );

        const classData =
            await classResponse.json();

        if (
            !classResponse.ok ||
            !classData.success
        ) {

            throw new Error(
                classData.message ||
                "Unable to load section."
            );

        }


        const classItem =
            classData.data;

        const section =
            (classItem.sections || [])
                .find(
                    function (item) {

                        return (
                            String(item._id) ===
                            String(sectionId)
                        );

                    }
                );


        if (!section) {

            throw new Error(
                "Section not found."
            );

        }


        const teachersResponse =
            await fetch(
                "/api/classes/teachers/list"
            );

        const teachersData =
            await teachersResponse.json();


        if (
            !teachersResponse.ok ||
            !teachersData.success
        ) {

            throw new Error(
                teachersData.message ||
                "Unable to load teachers."
            );

        }


        const teachers =
            teachersData.data || [];


        const teacherOptions =
            teachers.map(
                function (teacher) {

                    const id =
                        teacher._id ||
                        teacher.id;

                    const name =
                        `${teacher.firstName || ""} ${teacher.lastName || ""}`.trim() ||
                        "Teacher";


                    return `
                        <option
                            value="${escapeHtml(id)}"
                            ${
                                section.classTeacher &&
                                String(
                                    section.classTeacher._id ||
                                    section.classTeacher
                                ) === String(id)
                                    ? "selected"
                                    : ""
                            }
                        >
                            ${escapeHtml(name)}
                        </option>
                    `;

                }
            ).join("");


        moduleContent.innerHTML = `

            <div>

                <h2 style="
                    color:#ffffff;
                    margin-bottom:8px;
                ">
                    Edit Section
                </h2>

                <p style="
                    color:#94a3b8;
                    margin-bottom:25px;
                ">
                    Update section details.
                </p>


                <form id="editSectionForm">

                    <div style="
                        display:grid;
                        grid-template-columns:
                            repeat(2, minmax(0, 1fr));
                        gap:18px;
                    ">

                        ${formField(
                            "Section Name",
                            "name",
                            section.name || "",
                            true,
                            "text"
                        )}


                        ${formField(
                            "Capacity",
                            "capacity",
                            section.capacity || 40,
                            true,
                            "number"
                        )}


                        <div>

                            <label style="${labelStyle()}">
                                Class Teacher
                            </label>

                            <select
                                name="classTeacher"
                                style="${inputStyle()}"
                            >

                                <option value="">
                                    Not Assigned
                                </option>

                                ${teacherOptions}

                            </select>

                        </div>


                        <div>

                            <label style="${labelStyle()}">
                                Status
                            </label>

                            <select
                                name="status"
                                style="${inputStyle()}"
                            >

                                <option
                                    value="active"
                                    ${
                                        section.status ===
                                        "active"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    Active
                                </option>

                                <option
                                    value="inactive"
                                    ${
                                        section.status ===
                                        "inactive"
                                            ? "selected"
                                            : ""
                                    }
                                >
                                    Inactive
                                </option>

                            </select>

                        </div>

                    </div>


                    <div style="
                        display:flex;
                        gap:12px;
                        margin-top:25px;
                        flex-wrap:wrap;
                    ">

                        <button
                            type="submit"
                            class="primary-button"
                        >
                            Update Section
                        </button>


                        <button
                            type="button"
                            id="cancelEditSectionButton"
                            style="
                                padding:13px 20px;
                                border:1px solid #334e68;
                                border-radius:10px;
                                background:#14263e;
                                color:#ffffff;
                                font-weight:700;
                                cursor:pointer;
                            "
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;


        const form =
            document.getElementById(
                "editSectionForm"
            );


        form.addEventListener(
            "submit",
            function (event) {

                handleEditSectionSubmit(
                    event,
                    classId,
                    sectionId
                );

            }
        );


        document
            .getElementById(
                "cancelEditSectionButton"
            )
            .addEventListener(
                "click",
                function () {

                    openSections(
                        classId
                    );

                }
            );


    } catch (error) {

        console.error(
            "Edit Section Form Error:",
            error
        );

        showToast(
            error.message
        );

    }

}


// =====================================================
// UPDATE SECTION
// =====================================================

async function handleEditSectionSubmit(
    event,
    classId,
    sectionId
) {

    event.preventDefault();


    const form =
        event.currentTarget;


    const formData =
        new FormData(form);


    const sectionData = {

        name:
            formData.get("name"),

        capacity:
            Number(
                formData.get("capacity")
            ),

        classTeacher:
            formData.get(
                "classTeacher"
            ) || null,

        status:
            formData.get("status")

    };


    const submitButton =
        form.querySelector(
            'button[type="submit"]'
        );


    if (submitButton) {

        submitButton.disabled =
            true;

        submitButton.textContent =
            "Updating...";

    }


    try {

        const response =
            await fetch(
                `/api/classes/${encodeURIComponent(classId)}/sections/${encodeURIComponent(sectionId)}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            sectionData
                        )
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to update section."
            );

        }


        showToast(
            data.message ||
            "Section updated successfully."
        );


        openSections(
            classId
        );


    } catch (error) {

        console.error(
            "Section Update Error:",
            error
        );


        showToast(
            error.message
        );


        if (submitButton) {

            submitButton.disabled =
                false;

            submitButton.textContent =
                "Update Section";

        }

    }

}






// =====================================================
// DELETE SECTION
// =====================================================

async function deleteSection(classId, sectionId) {

    const confirmed = confirm(
        "Are you sure you want to delete this section?"
    );

    if (!confirmed) {
        return;
    }

    try {

        const response = await fetch(
            `/api/classes/${encodeURIComponent(classId)}/sections/${encodeURIComponent(sectionId)}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (!response.ok || !data.success) {
            throw new Error(
                data.message ||
                "Unable to delete section."
            );
        }

        showToast(
            data.message ||
            "Section deleted successfully."
        );

        await openSections(classId);

    } catch (error) {

        console.error(
            "Section Delete Error:",
            error
        );

        showToast(error.message);
    }
}
    // =====================================================
    // STUDENT API
    // =====================================================

    async function getStudents() {

        const response =
            await fetch("/api/students");

        const data =
            await response.json();

        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to fetch students."
            );
        }

        return data.data || [];
    }


    // =====================================================
    // LOAD STUDENTS
    // =====================================================

    async function loadStudents() {

        moduleAddButton.textContent =
            "+ Add Student";

        moduleAddButton.onclick =
            openAddStudentForm;


        moduleContent.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ⏳
                </div>

                <h3>
                    Loading Students...
                </h3>

                <p>
                    Please wait.
                </p>

            </div>

        `;


        try {

            const students =
                await getStudents();

            renderStudents(students);

        } catch (error) {

            console.error(
                "Student Loading Error:",
                error
            );

            moduleContent.innerHTML = `

                <div class="empty-state">

                    <div class="empty-icon">
                        ⚠️
                    </div>

                    <h3>
                        Unable to Load Students
                    </h3>

                    <p>
                        ${escapeHtml(error.message)}
                    </p>

                    <button
                        type="button"
                        id="retryStudentsButton"
                        class="primary-button"
                        style="margin-top:20px;"
                    >
                        Retry
                    </button>

                </div>

            `;


            const retryButton =
                document.getElementById(
                    "retryStudentsButton"
                );

            if (retryButton) {

                retryButton.onclick =
                    loadStudents;
            }
        }
    }


    // =====================================================
    // RENDER STUDENTS
    // =====================================================

    function renderStudents(students) {

        let rows = "";


        if (!students.length) {

            rows = `

                <tr>

                    <td
                        colspan="7"
                        style="
                            text-align:center;
                            padding:40px;
                            color:#94a3b8;
                        "
                    >
                        No students found.
                    </td>

                </tr>

            `;

        } else {

            students.forEach(function (student) {

                const id =
                    student._id ||
                    student.id;

                const name =
                    student.fullName ||
                    student.name ||
                    `${student.firstName || ""} ${student.lastName || ""}`.trim() ||
                    "Unknown";

                const admissionNumber =
                    student.admissionNumber ||
                    student.admissionNo ||
                    "-";

                const className =
                    student.className ||
                    "-";

                const section =
                    student.section ||
                    "-";

                const phone =
                    student.phone ||
                    "-";

                const email =
                    student.email ||
                    "-";

                const status =
                    student.status ||
                    "active";


                rows += `

                    <tr>

                        <td>
                            <strong>
                                ${escapeHtml(admissionNumber)}
                            </strong>
                        </td>

                        <td>
                            ${escapeHtml(name)}
                        </td>

                        <td>
                            ${escapeHtml(className)}
                        </td>

                        <td>
                            ${escapeHtml(section)}
                        </td>

                        <td>
                            ${escapeHtml(phone)}
                        </td>

                        <td>
                            ${escapeHtml(email)}
                        </td>

                        <td>

                            <span
                                style="
                                    display:inline-block;
                                    padding:5px 9px;
                                    border-radius:20px;
                                    background:${
                                        status === "active"
                                            ? "#064e3b"
                                            : "#3f1d1d"
                                    };
                                    color:${
                                        status === "active"
                                            ? "#a7f3d0"
                                            : "#fecaca"
                                    };
                                    font-size:12px;
                                "
                            >
                                ${escapeHtml(status)}
                            </span>

                        </td>

                        <td>

                            <div
                                style="
                                    display:flex;
                                    gap:8px;
                                    flex-wrap:wrap;
                                "
                            >

                                <button
                                    type="button"
                                    class="primary-button edit-student-button"
                                    data-id="${escapeHtml(id)}"
                                    style="
                                        padding:8px 12px;
                                    "
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    class="delete-student-button"
                                    data-id="${escapeHtml(id)}"
                                    style="
                                        padding:8px 12px;
                                        border:1px solid #7f1d1d;
                                        border-radius:10px;
                                        background:#3b1720;
                                        color:#fecaca;
                                        cursor:pointer;
                                    "
                                >
                                    Delete
                                </button>

                            </div>

                        </td>

                    </tr>

                `;
            });

        }


        moduleContent.innerHTML = `

            <div style="
                display:flex;
                justify-content:space-between;
                align-items:center;
                gap:15px;
                flex-wrap:wrap;
                margin-bottom:20px;
            ">

                <div>

                    <h3 style="
                        color:#ffffff;
                        margin-bottom:5px;
                    ">
                        Student List
                    </h3>

                    <p style="
                        color:#94a3b8;
                        font-size:13px;
                    ">
                        Total Students:
                        <strong>
                            ${students.length}
                        </strong>
                    </p>

                </div>


                <input
                    type="search"
                    id="studentSearch"
                    placeholder="Search student..."
                    style="
                        width:260px;
                        max-width:100%;
                        padding:12px;
                        border:1px solid #2b415b;
                        border-radius:10px;
                        background:#07111f;
                        color:#ffffff;
                        outline:none;
                    "
                >

            </div>


            <div style="
                overflow-x:auto;
            ">

                <table
                    id="studentsTable"
                    style="
                        width:100%;
                        border-collapse:collapse;
                        min-width:900px;
                    "
                >

                    <thead>

                        <tr>

                            <th style="${tableHeaderStyle()}">
                                Admission No.
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Name
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Class
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Section
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Phone
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Email
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Status
                            </th>

                            <th style="${tableHeaderStyle()}">
                                Actions
                            </th>

                        </tr>

                    </thead>

                    <tbody>
                        ${rows}
                    </tbody>

                </table>

            </div>

        `;


        // -------------------------------------------------
        // SEARCH
        // -------------------------------------------------

        const searchInput =
            document.getElementById(
                "studentSearch"
            );


        if (searchInput) {

            searchInput.addEventListener(
                "input",
                function () {

                    const search =
                        searchInput.value
                            .toLowerCase()
                            .trim();

                    const tableRows =
                        document.querySelectorAll(
                            "#studentsTable tbody tr"
                        );


                    tableRows.forEach(
                        function (row) {

                            const text =
                                row.textContent
                                    .toLowerCase();

                            row.style.display =
                                text.includes(search)
                                    ? ""
                                    : "none";

                        }
                    );

                }
            );

        }


        // -------------------------------------------------
        // EDIT BUTTONS
        // -------------------------------------------------

        document
            .querySelectorAll(
                ".edit-student-button"
            )
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        openEditStudentForm(
                            button.dataset.id
                        );

                    }
                );

            });


        // -------------------------------------------------
        // DELETE BUTTONS
        // -------------------------------------------------

        document
            .querySelectorAll(
                ".delete-student-button"
            )
            .forEach(function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        deleteStudent(
                            button.dataset.id
                        );

                    }
                );

            });

    }


    // =====================================================
    // TABLE HEADER STYLE
    // =====================================================

    function tableHeaderStyle() {

        return `
            padding:14px 12px;
            text-align:left;
            color:#94a3b8;
            background:#0b1728;
            border-bottom:1px solid #263b55;
            font-size:12px;
            white-space:nowrap;
        `;
    }


    // =====================================================
    // ADD STUDENT FORM
    // =====================================================

    function openAddStudentForm() {

        moduleContent.innerHTML = studentFormHtml(
            "add"
        );


        const form =
            document.getElementById(
                "studentForm"
            );


        form.addEventListener(
            "submit",
            handleStudentFormSubmit
        );


        document
            .getElementById(
                "cancelStudentButton"
            )
            .addEventListener(
                "click",
                loadStudents
            );

    }


    // =====================================================
    // EDIT STUDENT FORM
    // =====================================================

    async function openEditStudentForm(id) {

        moduleContent.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ⏳
                </div>

                <h3>
                    Loading Student...
                </h3>

            </div>

        `;


        try {

            const response =
                await fetch(
                    `/api/students/${encodeURIComponent(id)}`
                );


            const data =
                await response.json();


            if (!response.ok || !data.success) {

                throw new Error(
                    data.message ||
                    "Unable to load student."
                );

            }


            moduleContent.innerHTML =
                studentFormHtml(
                    "edit",
                    data.data
                );


            const form =
                document.getElementById(
                    "studentForm"
                );


            form.addEventListener(
                "submit",
                handleStudentFormSubmit
            );


            document
                .getElementById(
                    "cancelStudentButton"
                )
                .addEventListener(
                    "click",
                    loadStudents
                );

        } catch (error) {

            showToast(
                error.message
            );

            loadStudents();
        }

    }


    // =====================================================
    // STUDENT FORM HTML
    // =====================================================

    function studentFormHtml(mode, student = {}) {

        const isEdit =
            mode === "edit";


        const firstName =
            student.firstName ||
            student.name ||
            "";


        const lastName =
            student.lastName ||
            "";


        const admissionNumber =
            student.admissionNumber ||
            student.admissionNo ||
            "";


        const dob =
            student.dateOfBirth ||
            student.dob ||
            "";


        const gender =
            String(
                student.gender || ""
            ).toLowerCase();


        const phone =
            student.phone ||
            "";


        const email =
            student.email ||
            "";


        const address =
            student.address ||
            "";


        const className =
            student.className ||
            "";


        const section =
            student.section ||
            "";


        const fatherName =
            student.fatherName ||
            student.guardianName ||
            "";


        const motherName =
            student.motherName ||
            "";


        const status =
            student.status ||
            "active";


        const id =
            student._id ||
            student.id ||
            "";


        return `

            <div>

                <div style="
                    margin-bottom:25px;
                ">

                    <h2 style="
                        color:#ffffff;
                        margin-bottom:6px;
                    ">
                        ${
                            isEdit
                                ? "Edit Student"
                                : "Add Student"
                        }
                    </h2>

                    <p style="
                        color:#94a3b8;
                        font-size:14px;
                    ">
                        ${
                            isEdit
                                ? "Update student information."
                                : "Create a new student account."
                        }
                    </p>

                </div>


                <form
                    id="studentForm"
                    data-mode="${isEdit ? "edit" : "add"}"
                    data-id="${escapeHtml(id)}"
                >

                    <div style="
                        display:grid;
                        grid-template-columns:
                            repeat(2, minmax(0, 1fr));
                        gap:18px;
                    ">


                        ${formField(
                            "Admission Number",
                            "admissionNumber",
                            admissionNumber,
                            true,
                            "text"
                        )}


                        ${formField(
                            "First Name",
                            "firstName",
                            firstName,
                            true,
                            "text"
                        )}


                        ${formField(
                            "Last Name",
                            "lastName",
                            lastName,
                            false,
                            "text"
                        )}


                        ${formField(
                            "Email",
                            "email",
                            email,
                            true,
                            "email"
                        )}


                        ${
                            !isEdit
                                ? formField(
                                    "Password",
                                    "password",
                                    "",
                                    true,
                                    "password"
                                )
                                : ""
                        }


                        ${formField(
                            "Phone",
                            "phone",
                            phone,
                            false,
                            "tel"
                        )}


                        ${formField(
                            "Date of Birth",
                            "dateOfBirth",
                            formatDateForInput(dob),
                            false,
                            "date"
                        )}


                        <div>

                            <label style="${labelStyle()}">
                                Gender
                            </label>

                            <select
                                name="gender"
                                style="${inputStyle()}"
                            >

                                <option
                                    value=""
                                    ${gender === "" ? "selected" : ""}
                                >
                                    Select Gender
                                </option>

                                <option
                                    value="male"
                                    ${gender === "male" ? "selected" : ""}
                                >
                                    Male
                                </option>

                                <option
                                    value="female"
                                    ${gender === "female" ? "selected" : ""}
                                >
                                    Female
                                </option>

                                <option
                                    value="other"
                                    ${gender === "other" ? "selected" : ""}
                                >
                                    Other
                                </option>

                            </select>

                        </div>


                        ${formField(
                            "Class",
                            "className",
                            className,
                            false,
                            "text"
                        )}


                        ${formField(
                            "Section",
                            "section",
                            section,
                            false,
                            "text"
                        )}


                        ${formField(
                            "Father Name",
                            "fatherName",
                            fatherName,
                            false,
                            "text"
                        )}


                        ${formField(
                            "Mother Name",
                            "motherName",
                            motherName,
                            false,
                            "text"
                        )}


                        ${formField(
                            "Address",
                            "address",
                            address,
                            false,
                            "text"
                        )}


                        <div>

                            <label style="${labelStyle()}">
                                Status
                            </label>

                            <select
                                name="status"
                                style="${inputStyle()}"
                            >

                                <option
                                    value="active"
                                    ${status === "active" ? "selected" : ""}
                                >
                                    Active
                                </option>

                                <option
                                    value="inactive"
                                    ${status === "inactive" ? "selected" : ""}
                                >
                                    Inactive
                                </option>

                                <option
                                    value="graduated"
                                    ${status === "graduated" ? "selected" : ""}
                                >
                                    Graduated
                                </option>

                                <option
                                    value="transferred"
                                    ${status === "transferred" ? "selected" : ""}
                                >
                                    Transferred
                                </option>

                            </select>

                        </div>


                    </div>


                    <div style="
                        display:flex;
                        gap:12px;
                        margin-top:25px;
                        flex-wrap:wrap;
                    ">

                        <button
                            type="submit"
                            class="primary-button"
                        >
                            ${
                                isEdit
                                    ? "Update Student"
                                    : "Save Student"
                            }
                        </button>


                        <button
                            type="button"
                            id="cancelStudentButton"
                            style="
                                padding:13px 20px;
                                border:1px solid #334e68;
                                border-radius:10px;
                                background:#14263e;
                                color:#ffffff;
                                font-weight:700;
                                cursor:pointer;
                            "
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;
    }


    // =====================================================
    // FORM FIELD
    // =====================================================

    function formField(
        label,
        name,
        value,
        required,
        type
    ) {

        return `

            <div>

                <label style="${labelStyle()}">
                    ${escapeHtml(label)}
                    ${
                        required
                            ? ' <span style="color:#f87171;">*</span>'
                            : ""
                    }
                </label>

                <input
                    type="${type}"
                    name="${name}"
                    value="${escapeHtml(value)}"
                    ${required ? "required" : ""}
                    style="${inputStyle()}"
                >

            </div>

        `;
    }


    function labelStyle() {

        return `
            display:block;
            margin-bottom:7px;
            color:#cbd5e1;
            font-size:13px;
            font-weight:600;
        `;
    }


    function inputStyle() {

        return `
            width:100%;
            padding:12px;
            border:1px solid #2b415b;
            border-radius:10px;
            background:#07111f;
            color:#ffffff;
            outline:none;
            font-size:14px;
        `;
    }


    // =====================================================
    // FORM SUBMIT
    // =====================================================

    async function handleStudentFormSubmit(event) {

        event.preventDefault();


        const form =
            event.currentTarget;

        const mode =
            form.dataset.mode;

        const id =
            form.dataset.id;


        const formData =
            new FormData(form);


        const studentData = {

            admissionNumber:
                formData.get(
                    "admissionNumber"
                ),

            firstName:
                formData.get(
                    "firstName"
                ),

            lastName:
                formData.get(
                    "lastName"
                ),

            email:
                formData.get(
                    "email"
                ),

            phone:
                formData.get(
                    "phone"
                ),

            dateOfBirth:
                formData.get(
                    "dateOfBirth"
                ),

            gender:
                formData.get(
                    "gender"
                ),

            address:
                formData.get(
                    "address"
                ),

            className:
                formData.get(
                    "className"
                ),

            section:
                formData.get(
                    "section"
                ),

            fatherName:
                formData.get(
                    "fatherName"
                ),

            motherName:
                formData.get(
                    "motherName"
                ),

            status:
                formData.get(
                    "status"
                )

        };


        // Password only required while adding
        if (mode === "add") {

            studentData.password =
                formData.get("password");

        }


        const submitButton =
            form.querySelector(
                'button[type="submit"]'
            );


        if (submitButton) {

            submitButton.disabled =
                true;

            submitButton.textContent =
                mode === "edit"
                    ? "Updating..."
                    : "Saving...";

        }


        try {

            const url =
                mode === "edit"
                    ? `/api/students/${encodeURIComponent(id)}`
                    : "/api/students";


            const method =
                mode === "edit"
                    ? "PUT"
                    : "POST";


            const response =
                await fetch(
                    url,
                    {
                        method: method,

                        headers: {
                            "Content-Type":
                                "application/json"
                        },

                        body:
                            JSON.stringify(
                                studentData
                            )
                    }
                );


            const data =
                await response.json();


            if (
                !response.ok ||
                !data.success
            ) {

                throw new Error(
                    data.message ||
                    "Unable to save student."
                );

            }


            showToast(
                data.message ||
                "Student saved successfully."
            );


            await loadStudents();


        } catch (error) {

            console.error(
                "Student Save Error:",
                error
            );

            showToast(
                error.message
            );


            if (submitButton) {

                submitButton.disabled =
                    false;

                submitButton.textContent =
                    mode === "edit"
                        ? "Update Student"
                        : "Save Student";

            }

        }

    }


    // =====================================================
    // DELETE STUDENT
    // =====================================================

    async function deleteStudent(id) {

        const confirmed =
            window.confirm(
                "Are you sure you want to delete this student?"
            );


        if (!confirmed) {
            return;
        }


        try {

            const response =
                await fetch(
                    `/api/students/${encodeURIComponent(id)}`,
                    {
                        method: "DELETE"
                    }
                );


            const data =
                await response.json();


            if (
                !response.ok ||
                !data.success
            ) {

                throw new Error(
                    data.message ||
                    "Unable to delete student."
                );

            }


            showToast(
                "Student deleted successfully."
            );


            await loadStudents();


        } catch (error) {

            console.error(
                "Delete Student Error:",
                error
            );

            showToast(
                error.message
            );

        }

    }


    // =====================================================
    // LOAD STUDENT COUNT
    // =====================================================

    async function loadStudentCount() {

        const totalStudents =
            document.getElementById(
                "totalStudents"
            );


        try {

            const students =
                await getStudents();


            if (totalStudents) {

                totalStudents.textContent =
                    students.length;

            }


        } catch (error) {

            console.error(
                "Student Count Error:",
                error
            );

        }

    }






    // =====================================================
// LOAD TEACHER COUNT
// =====================================================

async function loadTeacherCount() {

    const totalTeachers =
        document.getElementById(
            "totalTeachers"
        );

    try {

        const teachers =
            await getTeachers();

        if (totalTeachers) {

            totalTeachers.textContent =
                teachers.length;

        }

    } catch (error) {

        console.error(
            "Teacher Count Error:",
            error
        );

    }

}




// =====================================================
// LOAD CLASS COUNT
// =====================================================

async function loadClassCount() {

    const totalClasses =
        document.getElementById(
            "totalClasses"
        );

    try {

        const classes =
            await getClasses();

        if (totalClasses) {

            totalClasses.textContent =
                classes.length;

        }

    } catch (error) {

        console.error(
            "Class Count Error:",
            error
        );

    }

}







// =====================================================
// LOAD USER COUNT
// =====================================================

async function loadUserCount() {

    const totalUsers =
        document.getElementById(
            "totalUsers"
        );

    try {

        const response =
            await fetch("/api/users");

        const data =
            await response.json();

        if (!response.ok || !data.success) {

            throw new Error(
                data.message ||
                "Unable to fetch users."
            );

        }

        const users =
            data.data || [];

        if (totalUsers) {

            totalUsers.textContent =
                users.length;

        }

    } catch (error) {

        console.error(
            "User Count Error:",
            error
        );

    }

}







// =====================================================
// LOAD FEE COLLECTION
// =====================================================

async function loadFeeCollection() {

    const feeCollection =
    document.getElementById(
        "totalFees"
    );

    try {

        const fees =
            await getFees();

        const totalCollected =
            fees.reduce(
                function (sum, fee) {
                    return sum +
                        Number(
                            fee.paidAmount || 0
                        );
                },
                0
            );

        if (feeCollection) {

            feeCollection.textContent =
                `₹${totalCollected}`;

        }

    } catch (error) {

        console.error(
            "Fee Collection Error:",
            error
        );

    }

}





// =====================================================
// TEACHER API
// =====================================================

async function getTeachers() {

    const response =
        await fetch("/api/teachers");

    const data =
        await response.json();

    if (!response.ok || !data.success) {

        throw new Error(
            data.message ||
            "Unable to fetch teachers."
        );
    }

    return data.data || [];
}


// =====================================================
// LOAD TEACHERS
// =====================================================

async function loadTeachers() {

    moduleAddButton.textContent =
        "+ Add Teacher";

    moduleAddButton.onclick =
        openAddTeacherForm;

    moduleContent.innerHTML = `

        <div class="empty-state">

            <div class="empty-icon">
                ⏳
            </div>

            <h3>
                Loading Teachers...
            </h3>

            <p>
                Please wait.
            </p>

        </div>

    `;

    try {

        const teachers =
            await getTeachers();

        renderTeachers(teachers);

    } catch (error) {

        console.error(
            "Teacher Loading Error:",
            error
        );

        moduleContent.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ⚠️
                </div>

                <h3>
                    Unable to Load Teachers
                </h3>

                <p>
                    ${escapeHtml(error.message)}
                </p>

                <button
                    type="button"
                    id="retryTeachersButton"
                    class="primary-button"
                    style="margin-top:20px;"
                >
                    Retry
                </button>

            </div>

        `;

        const retryButton =
            document.getElementById(
                "retryTeachersButton"
            );

        if (retryButton) {

            retryButton.onclick =
                loadTeachers;

        }
    }
}


// =====================================================
// RENDER TEACHERS
// =====================================================

function renderTeachers(teachers) {

    let rows = "";

    if (!teachers.length) {

        rows = `

            <tr>

                <td
                    colspan="8"
                    style="
                        text-align:center;
                        padding:40px;
                        color:#94a3b8;
                    "
                >
                    No teachers found.
                </td>

            </tr>

        `;

    } else {

        teachers.forEach(
            function (teacher) {

                const id =
                    teacher._id ||
                    teacher.id;

                const name =
                    teacher.fullName ||
                    `${teacher.firstName || ""} ${teacher.lastName || ""}`.trim() ||
                    "Unknown Teacher";

                const employeeId =
                    teacher.employeeId ||
                    "-";

                const designation =
                    teacher.designation ||
                    "Teacher";

                const department =
                    teacher.department ||
                    "-";

                const phone =
                    teacher.phone ||
                    "-";

                const email =
                    teacher.email ||
                    "-";

                const status =
                    teacher.status ||
                    "active";

                rows += `

                    <tr>

                        <td>
                            <strong>
                                ${escapeHtml(employeeId)}
                            </strong>
                        </td>

                        <td>
                            ${escapeHtml(name)}
                        </td>

                        <td>
                            ${escapeHtml(designation)}
                        </td>

                        <td>
                            ${escapeHtml(department)}
                        </td>

                        <td>
                            ${escapeHtml(phone)}
                        </td>

                        <td>
                            ${escapeHtml(email)}
                        </td>

                        <td>

                            <span
                                style="
                                    display:inline-block;
                                    padding:5px 9px;
                                    border-radius:20px;
                                    background:${
                                        status === "active"
                                            ? "#064e3b"
                                            : "#3f1d1d"
                                    };
                                    color:${
                                        status === "active"
                                            ? "#a7f3d0"
                                            : "#fecaca"
                                    };
                                    font-size:12px;
                                "
                            >
                                ${escapeHtml(status)}
                            </span>

                        </td>

                        <td>

                            <div
                                style="
                                    display:flex;
                                    gap:8px;
                                    flex-wrap:wrap;
                                "
                            >

                                <button
                                    type="button"
                                    class="primary-button edit-teacher-button"
                                    data-id="${escapeHtml(id)}"
                                    style="
                                        padding:8px 12px;
                                    "
                                >
                                    Edit
                                </button>

                                <button
                                    type="button"
                                    class="delete-teacher-button"
                                    data-id="${escapeHtml(id)}"
                                    style="
                                        padding:8px 12px;
                                        border:1px solid #7f1d1d;
                                        border-radius:10px;
                                        background:#3b1720;
                                        color:#fecaca;
                                        cursor:pointer;
                                    "
                                >
                                    Delete
                                </button>

                            </div>

                        </td>

                    </tr>

                `;

            }
        );

    }

    moduleContent.innerHTML = `

        <div style="
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:15px;
            flex-wrap:wrap;
            margin-bottom:20px;
        ">

            <div>

                <h3 style="
                    color:#ffffff;
                    margin-bottom:5px;
                ">
                    Teacher List
                </h3>

                <p style="
                    color:#94a3b8;
                    font-size:13px;
                ">
                    Total Teachers:
                    <strong>
                        ${teachers.length}
                    </strong>
                </p>

            </div>

            <input
                type="search"
                id="teacherSearch"
                placeholder="Search teacher..."
                style="
                    width:260px;
                    max-width:100%;
                    padding:12px;
                    border:1px solid #2b415b;
                    border-radius:10px;
                    background:#07111f;
                    color:#ffffff;
                    outline:none;
                "
            >

        </div>

        <div style="
            overflow-x:auto;
        ">

            <table
                id="teachersTable"
                style="
                    width:100%;
                    border-collapse:collapse;
                    min-width:950px;
                "
            >

                <thead>

                    <tr>

                        <th style="${tableHeaderStyle()}">
                            Employee ID
                        </th>

                        <th style="${tableHeaderStyle()}">
                            Name
                        </th>

                        <th style="${tableHeaderStyle()}">
                            Designation
                        </th>

                        <th style="${tableHeaderStyle()}">
                            Department
                        </th>

                        <th style="${tableHeaderStyle()}">
                            Phone
                        </th>

                        <th style="${tableHeaderStyle()}">
                            Email
                        </th>

                        <th style="${tableHeaderStyle()}">
                            Status
                        </th>

                        <th style="${tableHeaderStyle()}">
                            Actions
                        </th>

                    </tr>

                </thead>

                <tbody>
                    ${rows}
                </tbody>

            </table>

        </div>

    `;


    const searchInput =
        document.getElementById(
            "teacherSearch"
        );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const search =
                    searchInput.value
                        .toLowerCase()
                        .trim();

                document
                    .querySelectorAll(
                        "#teachersTable tbody tr"
                    )
                    .forEach(
                        function (row) {

                            row.style.display =
                                row.textContent
                                    .toLowerCase()
                                    .includes(search)
                                    ? ""
                                    : "none";

                        }
                    );

            }
        );

    }


    document
        .querySelectorAll(
            ".edit-teacher-button"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        openEditTeacherForm(
                            button.dataset.id
                        );

                    }
                );

            }
        );


    document
        .querySelectorAll(
            ".delete-teacher-button"
        )
        .forEach(
            function (button) {

                button.addEventListener(
                    "click",
                    function () {

                        deleteTeacher(
                            button.dataset.id
                        );

                    }
                );

            }
        );

}
// =====================================================
// ADD TEACHER
// =====================================================

function openAddTeacherForm() {

    moduleContent.innerHTML = `

        <div>

            <h2 style="
                color:#ffffff;
                margin-bottom:8px;
            ">
                Add Teacher
            </h2>

            <p style="
                color:#94a3b8;
                margin-bottom:25px;
            ">
                Create a new teacher account.
            </p>

            <form id="teacherForm">

                <div style="
                    display:grid;
                    grid-template-columns:
                        repeat(2, minmax(0, 1fr));
                    gap:18px;
                ">

                    ${formField(
                        "Employee ID",
                        "employeeId",
                        "",
                        true,
                        "text"
                    )}

                    ${formField(
                        "First Name",
                        "firstName",
                        "",
                        true,
                        "text"
                    )}

                    ${formField(
                        "Last Name",
                        "lastName",
                        "",
                        false,
                        "text"
                    )}

                    ${formField(
                        "Email",
                        "email",
                        "",
                        true,
                        "email"
                    )}

                    ${formField(
                        "Password",
                        "password",
                        "",
                        true,
                        "password"
                    )}

                    ${formField(
                        "Phone",
                        "phone",
                        "",
                        false,
                        "tel"
                    )}

                    ${formField(
                        "Qualification",
                        "qualification",
                        "",
                        false,
                        "text"
                    )}

                    ${formField(
                        "Specialization",
                        "specialization",
                        "",
                        false,
                        "text"
                    )}

                    ${formField(
                        "Experience",
                        "experience",
                        "",
                        false,
                        "number"
                    )}

                    ${formField(
                        "Designation",
                        "designation",
                        "Teacher",
                        false,
                        "text"
                    )}

                    ${formField(
                        "Department",
                        "department",
                        "",
                        false,
                        "text"
                    )}

                </div>

                <div style="
                    display:flex;
                    gap:12px;
                    margin-top:25px;
                ">

                    <button
                        type="submit"
                        class="primary-button"
                    >
                        Save Teacher
                    </button>

                    <button
                        type="button"
                        id="cancelTeacherButton"
                        style="
                            padding:13px 20px;
                            border:1px solid #334e68;
                            border-radius:10px;
                            background:#14263e;
                            color:#ffffff;
                            cursor:pointer;
                        "
                    >
                        Cancel
                    </button>

                </div>

            </form>

        </div>

    `;


    document
        .getElementById("teacherForm")
        .addEventListener(
            "submit",
            handleTeacherFormSubmit
        );


    document
        .getElementById("cancelTeacherButton")
        .addEventListener(
            "click",
            loadTeachers
        );

}


// =====================================================
// SAVE TEACHER
// =====================================================

async function handleTeacherFormSubmit(event) {

    event.preventDefault();

    const form =
        event.currentTarget;

    const formData =
        new FormData(form);

    const teacherData = {

        employeeId:
            formData.get("employeeId"),

        firstName:
            formData.get("firstName"),

        lastName:
            formData.get("lastName"),

        email:
            formData.get("email"),

        password:
            formData.get("password"),

        phone:
            formData.get("phone"),

        qualification:
            formData.get("qualification"),

        specialization:
            formData.get("specialization"),

        experience:
            formData.get("experience"),

        designation:
            formData.get("designation"),

        department:
            formData.get("department")

    };


    const button =
        form.querySelector(
            'button[type="submit"]'
        );

    button.disabled = true;

    button.textContent =
        "Saving...";


    try {

        const response =
            await fetch(
                "/api/teachers",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body:
                        JSON.stringify(
                            teacherData
                        )
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to save teacher."
            );

        }


        showToast(
            "Teacher created successfully."
        );


        await loadTeachers();


    } catch (error) {

        console.error(
            "Teacher Save Error:",
            error
        );


        showToast(
            error.message
        );


        button.disabled = false;

        button.textContent =
            "Save Teacher";

    }

}


// =====================================================
// EDIT TEACHER
// =====================================================

async function openEditTeacherForm(id) {

    try {

        const response =
            await fetch(
                `/api/teachers/${encodeURIComponent(id)}`
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to load teacher."
            );

        }


        const teacher =
            data.data;


        moduleContent.innerHTML = `

            <div>

                <h2 style="
                    color:#ffffff;
                    margin-bottom:8px;
                ">
                    Edit Teacher
                </h2>


                <form id="teacherEditForm">

                    ${formField(
                        "Employee ID",
                        "employeeId",
                        teacher.employeeId || "",
                        true,
                        "text"
                    )}

                    ${formField(
                        "First Name",
                        "firstName",
                        teacher.firstName || "",
                        true,
                        "text"
                    )}

                    ${formField(
                        "Last Name",
                        "lastName",
                        teacher.lastName || "",
                        false,
                        "text"
                    )}

                    ${formField(
                        "Email",
                        "email",
                        teacher.email || "",
                        true,
                        "email"
                    )}

                    ${formField(
                        "Phone",
                        "phone",
                        teacher.phone || "",
                        false,
                        "tel"
                    )}

                    ${formField(
                        "Qualification",
                        "qualification",
                        teacher.qualification || "",
                        false,
                        "text"
                    )}

                    ${formField(
                        "Specialization",
                        "specialization",
                        teacher.specialization || "",
                        false,
                        "text"
                    )}

                    ${formField(
                        "Experience",
                        "experience",
                        teacher.experience || 0,
                        false,
                        "number"
                    )}

                    ${formField(
                        "Designation",
                        "designation",
                        teacher.designation || "Teacher",
                        false,
                        "text"
                    )}

                    ${formField(
                        "Department",
                        "department",
                        teacher.department || "",
                        false,
                        "text"
                    )}


                    <div style="
                        display:flex;
                        gap:12px;
                        margin-top:25px;
                    ">

                        <button
                            type="submit"
                            class="primary-button"
                        >
                            Update Teacher
                        </button>


                        <button
                            type="button"
                            id="cancelTeacherButton"
                            style="
                                padding:13px 20px;
                                border:1px solid #334e68;
                                border-radius:10px;
                                background:#14263e;
                                color:#ffffff;
                                cursor:pointer;
                            "
                        >
                            Cancel
                        </button>

                    </div>

                </form>

            </div>

        `;


        document
            .getElementById(
                "teacherEditForm"
            )
            .addEventListener(
                "submit",
                async function (event) {

                    event.preventDefault();


                    const formData =
                        new FormData(
                            event.currentTarget
                        );


                    const updateData = {

                        employeeId:
                            formData.get(
                                "employeeId"
                            ),

                        firstName:
                            formData.get(
                                "firstName"
                            ),

                        lastName:
                            formData.get(
                                "lastName"
                            ),

                        email:
                            formData.get(
                                "email"
                            ),

                        phone:
                            formData.get(
                                "phone"
                            ),

                        qualification:
                            formData.get(
                                "qualification"
                            ),

                        specialization:
                            formData.get(
                                "specialization"
                            ),

                        experience:
                            formData.get(
                                "experience"
                            ),

                        designation:
                            formData.get(
                                "designation"
                            ),

                        department:
                            formData.get(
                                "department"
                            )

                    };


                    try {

                        const response =
                            await fetch(
                                `/api/teachers/${encodeURIComponent(id)}`,
                                {
                                    method: "PUT",

                                    headers: {
                                        "Content-Type":
                                            "application/json"
                                    },

                                    body:
                                        JSON.stringify(
                                            updateData
                                        )
                                }
                            );


                        const result =
                            await response.json();


                        if (
                            !response.ok ||
                            !result.success
                        ) {

                            throw new Error(
                                result.message ||
                                "Unable to update teacher."
                            );

                        }


                        showToast(
                            "Teacher updated successfully."
                        );


                        await loadTeachers();


                    } catch (error) {

                        showToast(
                            error.message
                        );

                    }

                }
            );


        document
            .getElementById(
                "cancelTeacherButton"
            )
            .addEventListener(
                "click",
                loadTeachers
            );


    } catch (error) {

        showToast(
            error.message
        );

        loadTeachers();

    }

}


// =====================================================
// DELETE TEACHER
// =====================================================

async function deleteTeacher(id) {

    const confirmed =
        window.confirm(
            "Are you sure you want to delete this teacher?"
        );


    if (!confirmed) {

        return;

    }


    try {

        const response =
            await fetch(
                `/api/teachers/${encodeURIComponent(id)}`,
                {
                    method: "DELETE"
                }
            );


        const data =
            await response.json();


        if (
            !response.ok ||
            !data.success
        ) {

            throw new Error(
                data.message ||
                "Unable to delete teacher."
            );

        }


        showToast(
            "Teacher deleted successfully."
        );


        await loadTeachers();


    } catch (error) {

        console.error(
            "Delete Teacher Error:",
            error
        );


        showToast(
            error.message
        );

    }

}

    // =====================================================
    // OTHER MODULES
    // =====================================================

    function renderComingSoon(section) {

        const module =
            modules[section];

        moduleAddButton.textContent =
            "+ Add";


        moduleAddButton.onclick = function () {

    if (section === "hostel") {

        showAddHostelForm();

        return;

    }

    showToast(
        `${module.title} CRUD will be connected next.`
    );

};


        moduleContent.innerHTML = `

            <div class="empty-state">

                <div class="empty-icon">
                    ${module.icon}
                </div>

                <h3>
                    ${escapeHtml(module.title)}
                </h3>

                <p>
                    ${escapeHtml(module.description)}
                </p>

                <p style="
                    margin-top:12px;
                    color:#38bdf8;
                ">
                    Backend CRUD will be connected module-by-module.
                </p>

            </div>

        `;
    }


    // =====================================================
    // ESCAPE HTML
    // =====================================================

    function escapeHtml(value) {

        if (
            value === null ||
            value === undefined
        ) {
            return "";
        }

        return String(value)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }


    // =====================================================
    // DATE FORMAT
    // =====================================================

    function formatDateForInput(value) {

        if (!value) {
            return "";
        }


        const date =
            new Date(value);


        if (Number.isNaN(
            date.getTime()
        )) {

            return String(value)
                .slice(0, 10);

        }


        return date
            .toISOString()
            .slice(0, 10);
    }


    // =====================================================
    // THEME
    // =====================================================

    function updateThemeButton(isLight) {

        if (!themeToggle) {
            return;
        }


        themeToggle.innerHTML =
            isLight
                ? "☀️ <span>Light Mode</span>"
                : "🌙 <span>Dark Mode</span>";
    }


    function loadTheme() {

        const theme =
            localStorage.getItem(
                "school_theme"
            );


        const isLight =
            theme === "light";


        document.body.classList.toggle(
            "light-mode",
            isLight
        );


        updateThemeButton(
            isLight
        );
    }


    if (themeToggle) {

        themeToggle.addEventListener(
            "click",
            function () {

                const isLight =
                    document.body.classList.toggle(
                        "light-mode"
                    );


                localStorage.setItem(
                    "school_theme",
                    isLight
                        ? "light"
                        : "dark"
                );


                updateThemeButton(
                    isLight
                );

            }
        );

    }


    // =====================================================
    // LOGOUT
    // =====================================================

    if (logoutButton) {

        logoutButton.addEventListener(
            "click",
            function () {

                const confirmed =
                    window.confirm(
                        "Are you sure you want to logout?"
                    );


                if (!confirmed) {
                    return;
                }


                localStorage.removeItem(
                    "school_auth_token"
                );

                localStorage.removeItem(
                    "school_user"
                );


                window.location.href =
                    "/login";

            }
        );

    }


    // =====================================================
    // NOTIFICATIONS
    // =====================================================

    if (notificationButton) {

        notificationButton.addEventListener(
            "click",
            function () {

                showToast(
                    "No new notifications."
                );

            }
        );

    }


    // =====================================================
    // MENU EVENTS
    // =====================================================

    menuItems.forEach(function (item) {

        item.addEventListener(
            "click",
            function () {

                const section =
                    item.dataset.section;


                if (
                    section ===
                    "dashboard"
                ) {

                    showDashboard();

                } else {

                    showModule(
                        section
                    );

                }

            }
        );

    });


    // =====================================================
    // QUICK CARDS
    // =====================================================

    quickCards.forEach(function (card) {

        card.addEventListener(
            "click",
            function () {

                const section =
                    card.dataset.section;


                if (
                    section ===
                    "dashboard"
                ) {

                    showDashboard();

                } else {

                    showModule(
                        section
                    );

                }

            }
        );

    });


    // =====================================================
    // INITIALIZE
    // =====================================================

    if (!checkAuthentication()) {
        return;
    }


    loadTheme();

    loadAdminInformation();

    showDashboard();
    window.editNotice = editNotice;
window.deleteNotice = deleteNotice;
window.editLibraryBook = editLibraryBook;
window.deleteLibraryBook = deleteLibraryBook;
window.editPayroll = editPayroll;
window.deletePayroll = deletePayroll;
window.viewPayrollSlip = viewPayrollSlip;
window.printPayrollSlip = printPayrollSlip;
window.downloadPayrollSlip = downloadPayrollSlip;

});
// =====================================================
// APPROVE LEAVE
// =====================================================

window.approveLeave = async function (id) {

    const remarks = prompt(
        "Enter admin remarks:",
        "Leave approved by admin."
    );

    if (remarks === null) {
        return;
    }

    try {

        const response = await fetch(
            `/api/leaves/${id}/status`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    status: "Approved",
                    adminRemarks: remarks
                })
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.message ||
                "Unable to approve leave."
            );
        }

        alert("Leave approved successfully.");

        await loadLeave();

    } catch (error) {

        console.error(
            "Approve Leave Error:",
            error
        );

        alert(
            error.message ||
            "Unable to approve leave."
        );
    }
};


// =====================================================
// REJECT LEAVE
// =====================================================

window.rejectLeave = async function (id) {

    const remarks = prompt(
        "Enter reason for rejection:",
        "Leave rejected by admin."
    );

    if (remarks === null) {
        return;
    }

    try {

        const response = await fetch(
            `/api/leaves/${id}/status`,
            {
                method: "PUT",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    status: "Rejected",
                    adminRemarks: remarks
                })
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(
                result.message ||
                "Unable to reject leave."
            );
        }

        alert(
            "Leave rejected successfully."
        );

        // Reload page
        window.location.reload();

    } catch (error) {

        console.error(
            "Reject Leave Error:",
            error
        );

        alert(
            error.message ||
            "Unable to reject leave."
        );
    }
};




// =====================================================
// ADD LEAVE TYPE
// =====================================================

function showAddLeaveTypeForm() {

    const overlay = document.createElement("div");

    overlay.id = "leaveTypeModal";

    overlay.style.cssText = `
        position:fixed;
        top:0;
        left:0;
        width:100%;
        height:100%;
        background:rgba(0,0,0,0.6);
        display:flex;
        justify-content:center;
        align-items:center;
        z-index:9999;
    `;

    overlay.innerHTML = `
        <div
            style="
                width:500px;
                max-width:90%;
                background:#ffffff;
                border-radius:12px;
                padding:25px;
                box-shadow:0 10px 30px rgba(0,0,0,0.3);
            "
        >

            <h2 style="margin-top:0;">
                Add Leave Type
            </h2>

            <div style="margin-bottom:15px;">

                <label>
                    Leave Type
                </label>

                <input
                    type="text"
                    id="leaveTypeName"
                    placeholder="Enter leave type"
                    style="
                        width:100%;
                        padding:10px;
                        margin-top:6px;
                        box-sizing:border-box;
                    "
                >

            </div>


            <div style="margin-bottom:15px;">

                <label>
                    Description
                </label>

                <textarea
                    id="leaveTypeDescription"
                    placeholder="Enter description"
                    rows="3"
                    style="
                        width:100%;
                        padding:10px;
                        margin-top:6px;
                        box-sizing:border-box;
                        resize:vertical;
                    "
                ></textarea>

            </div>


            <div style="margin-bottom:15px;">

                <label>
                    Maximum Days
                </label>

                <input
                    type="number"
                    id="leaveTypeMaximumDays"
                    min="1"
                    placeholder="Enter maximum days"
                    style="
                        width:100%;
                        padding:10px;
                        margin-top:6px;
                        box-sizing:border-box;
                    "
                >

            </div>


            <div style="margin-bottom:20px;">

                <label>
                    Status
                </label>

                <select
                    id="leaveTypeStatus"
                    style="
                        width:100%;
                        padding:10px;
                        margin-top:6px;
                    "
                >

                    <option value="Active">
                        Active
                    </option>

                    <option value="Inactive">
                        Inactive
                    </option>

                </select>

            </div>


            <div
                style="
                    display:flex;
                    justify-content:flex-end;
                    gap:10px;
                "
            >

                <button
                    type="button"
                    class="action-btn"
                    onclick="closeLeaveTypeForm()"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    class="action-btn"
                    onclick="saveLeaveType()"
                >
                    Save Leave Type
                </button>

            </div>

        </div>
    `;

    document.body.appendChild(overlay);
}


// =====================================================
// CLOSE LEAVE TYPE FORM
// =====================================================

function closeLeaveTypeForm() {

    const modal =
        document.getElementById("leaveTypeModal");

    if (modal) {
        modal.remove();
    }
}


// =====================================================
// SAVE LEAVE TYPE
// =====================================================

async function saveLeaveType() {

    const leaveType =
        document.getElementById("leaveTypeName").value.trim();

    const description =
        document.getElementById("leaveTypeDescription").value.trim();

    const maximumDays =
        document.getElementById("leaveTypeMaximumDays").value;

    const status =
        document.getElementById("leaveTypeStatus").value;


    if (!leaveType) {
        alert("Please enter leave type.");
        return;
    }


    if (!maximumDays || Number(maximumDays) < 1) {
        alert("Please enter valid maximum days.");
        return;
    }


    try {

        const response = await fetch(
            "/api/leaves/types",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({
                    leaveType: leaveType,
                    description: description,
                    maximumDays: Number(maximumDays),
                    status: status
                })
            }
        );


        const result =
            await response.json();


        if (!response.ok || !result.success) {

            throw new Error(
                result.message ||
                "Unable to add leave type."
            );

        }


        alert("Leave type added successfully.");


        closeLeaveTypeForm();


        await loadLeave();

    } catch (error) {

        console.error(
            "Save Leave Type Error:",
            error
        );

        alert(
            error.message ||
            "Unable to add leave type."
        );

    }

}




// =====================================================
// EDIT LEAVE TYPE
// =====================================================

async function editLeaveType(id) {

    try {

        // Get all leave types
        const response =
            await fetch("/api/leaves/types/all", {
                cache: "no-store"
            });

        const result =
            await response.json();


        if (!response.ok || !result.success) {
            throw new Error(
                result.message ||
                "Unable to load leave types."
            );
        }


        // Find selected leave type
        const leaveType =
            result.data.find(function (item) {
                return item._id === id;
            });


        if (!leaveType) {
            alert("Leave type not found.");
            return;
        }


        // Create modal
        const overlay =
            document.createElement("div");

        overlay.id = "editLeaveTypeModal";

        overlay.style.cssText = `
            position:fixed;
            top:0;
            left:0;
            width:100%;
            height:100%;
            background:rgba(0,0,0,0.6);
            display:flex;
            justify-content:center;
            align-items:center;
            z-index:9999;
        `;


        overlay.innerHTML = `

            <div
                style="
                    width:500px;
                    max-width:90%;
                    background:#fff;
                    border-radius:12px;
                    padding:25px;
                    box-shadow:0 10px 30px rgba(0,0,0,0.3);
                "
            >

                <h2 style="margin-top:0;">
                    Edit Leave Type
                </h2>


                <div style="margin-bottom:15px;">

                    <label>
                        Leave Type
                    </label>

                    <input
                        type="text"
                        id="editLeaveTypeName"
                        value="${leaveType.leaveType || ""}"
                        style="
                            width:100%;
                            padding:10px;
                            margin-top:6px;
                            box-sizing:border-box;
                        "
                    >

                </div>


                <div style="margin-bottom:15px;">

                    <label>
                        Description
                    </label>

                    <textarea
                        id="editLeaveTypeDescription"
                        rows="3"
                        style="
                            width:100%;
                            padding:10px;
                            margin-top:6px;
                            box-sizing:border-box;
                            resize:vertical;
                        "
                    >${leaveType.description || ""}</textarea>

                </div>


                <div style="margin-bottom:15px;">

                    <label>
                        Maximum Days
                    </label>

                    <input
                        type="number"
                        id="editLeaveTypeMaximumDays"
                        min="1"
                        value="${leaveType.maximumDays || 1}"
                        style="
                            width:100%;
                            padding:10px;
                            margin-top:6px;
                            box-sizing:border-box;
                        "
                    >

                </div>


                <div style="margin-bottom:20px;">

                    <label>
                        Status
                    </label>

                    <select
                        id="editLeaveTypeStatus"
                        style="
                            width:100%;
                            padding:10px;
                            margin-top:6px;
                        "
                    >

                        <option
                            value="Active"
                            ${
                                leaveType.status === "Active"
                                    ? "selected"
                                    : ""
                            }
                        >
                            Active
                        </option>

                        <option
                            value="Inactive"
                            ${
                                leaveType.status === "Inactive"
                                    ? "selected"
                                    : ""
                            }
                        >
                            Inactive
                        </option>

                    </select>

                </div>


                <div
                    style="
                        display:flex;
                        justify-content:flex-end;
                        gap:10px;
                    "
                >

                    <button
                        type="button"
                        class="action-btn"
                        onclick="closeEditLeaveTypeForm()"
                    >
                        Cancel
                    </button>


                    <button
                        type="button"
                        class="action-btn"
                        onclick="updateLeaveType('${id}')"
                    >
                        Update Leave Type
                    </button>

                </div>

            </div>
        `;


        document.body.appendChild(overlay);


    } catch (error) {

        console.error(
            "Edit Leave Type Error:",
            error
        );

        alert(
            error.message ||
            "Unable to edit leave type."
        );

    }

}


// =====================================================
// CLOSE EDIT FORM
// =====================================================

function closeEditLeaveTypeForm() {

    const modal =
        document.getElementById(
            "editLeaveTypeModal"
        );

    if (modal) {
        modal.remove();
    }

}


// =====================================================
// UPDATE LEAVE TYPE
// =====================================================

async function updateLeaveType(id) {

    const leaveType =
        document
            .getElementById("editLeaveTypeName")
            .value
            .trim();

    const description =
        document
            .getElementById("editLeaveTypeDescription")
            .value
            .trim();

    const maximumDays =
        document
            .getElementById("editLeaveTypeMaximumDays")
            .value;

    const status =
        document
            .getElementById("editLeaveTypeStatus")
            .value;


    if (!leaveType) {
        alert("Please enter leave type.");
        return;
    }


    if (!maximumDays || Number(maximumDays) < 1) {
        alert("Please enter valid maximum days.");
        return;
    }


    try {

        const response =
            await fetch(
                `/api/leaves/types/${id}`,
                {
                    method: "PUT",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        leaveType: leaveType,
                        description: description,
                        maximumDays: Number(maximumDays),
                        status: status
                    })
                }
            );


        const result =
            await response.json();


        if (!response.ok || !result.success) {

            throw new Error(
                result.message ||
                "Unable to update leave type."
            );

        }


        alert(
            "Leave type updated successfully."
        );


        closeEditLeaveTypeForm();

window.location.reload();


    } catch (error) {

        console.error(
            "Update Leave Type Error:",
            error
        );

        alert(
            error.message ||
            "Unable to update leave type."
        );

    }

}







// =====================================================
// DELETE LEAVE TYPE
// =====================================================

async function deleteLeaveType(id) {

    const confirmDelete = confirm(
        "Are you sure you want to delete this leave type?"
    );

    if (!confirmDelete) {
        return;
    }


    try {

        const response =
            await fetch(
                `/api/leaves/types/${id}`,
                {
                    method: "DELETE"
                }
            );


        const result =
            await response.json();


        if (!response.ok || !result.success) {

            throw new Error(
                result.message ||
                "Unable to delete leave type."
            );

        }


        alert(
            "Leave type deleted successfully."
        );


        window.location.reload();


    } catch (error) {

        console.error(
            "Delete Leave Type Error:",
            error
        );

        alert(
            error.message ||
            "Unable to delete leave type."
        );

    }

}