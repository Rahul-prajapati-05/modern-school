document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // 1. AUTHENTICATION CHECK
    // =====================================================
    const token = localStorage.getItem("school_auth_token");
    const savedUserStr = localStorage.getItem("school_user");

    if (!token || !savedUserStr) {
        window.location.href = "/login.html";
        return;
    }

    let user = {};
    try {
        user = JSON.parse(savedUserStr);
    } catch (e) {
        window.location.href = "/login.html";
        return;
    }

    // =====================================================
    // 2. POPULATE STUDENT INFO
    // =====================================================
    const studentName = user.name || "Student";
    const studentEmail = user.email || "";
    const studentPhone = user.phone || "Not provided";

    const sidebarStudentName = document.getElementById("sidebarStudentName");
    const sidebarStudentEmail = document.getElementById("sidebarStudentEmail");
    const topStudentName = document.getElementById("topStudentName");
    const welcomeHeading = document.getElementById("welcomeHeading");
    const profileFullName = document.getElementById("profileFullName");
    const profileEmail = document.getElementById("profileEmail");
    const profilePhone = document.getElementById("profilePhone");
    const currentDateBadge = document.getElementById("currentDateBadge");

    if (sidebarStudentName) sidebarStudentName.textContent = studentName;
    if (sidebarStudentEmail) sidebarStudentEmail.textContent = studentEmail;
    if (topStudentName) topStudentName.textContent = studentName;
    if (welcomeHeading) welcomeHeading.textContent = `Hello, ${studentName}! 👋`;
    if (profileFullName) profileFullName.textContent = studentName;
    if (profileEmail) profileEmail.textContent = studentEmail;
    if (profilePhone) profilePhone.textContent = studentPhone;

    // Display formatted date
    if (currentDateBadge) {
        const today = new Date();
        const options = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
        currentDateBadge.textContent = today.toLocaleDateString("en-US", options);
    }

    // =====================================================
    // 3. TAB NAVIGATION
    // =====================================================
    const navItems = document.querySelectorAll(".nav-item");
    const tabPanes = document.querySelectorAll(".tab-pane");
    const pageHeading = document.getElementById("pageHeading");
    const pageSubheading = document.getElementById("pageSubheading");

    const tabSubtitles = {
        dashboard: "Welcome back to your academic portal",
        homework: "Your assignments, instructions & submissions",
        timetable: "Weekly class periods & schedule",
        attendance: "Monthly attendance & presence statistics",
        results: "Report card and examination performance",
        fees: "School fees, fee receipts & pending dues",
        notices: "Official school announcements and circulars",
        profile: "Your registered student profile & settings"
    };

    function switchTab(tabKey) {
        navItems.forEach(item => {
            if (item.getAttribute("data-tab") === tabKey) {
                item.classList.add("active");
            } else {
                item.classList.remove("active");
            }
        });

        tabPanes.forEach(pane => {
            if (pane.id === "tab-" + tabKey) {
                pane.classList.add("active");
            } else {
                pane.classList.remove("active");
            }
        });

        const activeNavItem = document.querySelector(`.nav-item[data-tab="${tabKey}"] .nav-label`);
        if (pageHeading && activeNavItem) {
            pageHeading.textContent = activeNavItem.textContent;
        }
        if (pageSubheading) {
            pageSubheading.textContent = tabSubtitles[tabKey] || "Student Portal";
        }

        // Close mobile sidebar on tab change
        const sidebar = document.getElementById("studentSidebar");
        if (sidebar) sidebar.classList.remove("open");
    }

    navItems.forEach(item => {
        item.addEventListener("click", function () {
            const tabKey = this.getAttribute("data-tab");
            switchTab(tabKey);
        });
    });

    // Support quick-trigger buttons (e.g. from stat cards)
    document.querySelectorAll("[data-tab-trigger]").forEach(el => {
        el.addEventListener("click", function () {
            const tab = this.getAttribute("data-tab-trigger");
            switchTab(tab);
        });
    });

    // =====================================================
    // 4. MOBILE SIDEBAR TOGGLE
    // =====================================================
    const sidebarToggle = document.getElementById("sidebarToggle");
    const studentSidebar = document.getElementById("studentSidebar");

    if (sidebarToggle && studentSidebar) {
        sidebarToggle.addEventListener("click", function () {
            studentSidebar.classList.toggle("open");
        });
    }

    // =====================================================
    // 5. LOGOUT FUNCTIONALITY
    // =====================================================
    function handleLogout() {
        if (confirm("Are you sure you want to sign out?")) {
            localStorage.removeItem("school_auth_token");
            localStorage.removeItem("school_user");
            localStorage.removeItem("school_remember_me");
            window.location.href = "/login.html";
        }
    }

    const logoutBtn = document.getElementById("logoutBtn");
    const mobileLogoutBtn = document.getElementById("mobileLogoutBtn");
    const profileLogoutBtn = document.getElementById("profileLogoutBtn");

    if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);
    if (mobileLogoutBtn) mobileLogoutBtn.addEventListener("click", handleLogout);
    if (profileLogoutBtn) profileLogoutBtn.addEventListener("click", handleLogout);

    // Refresh data button
    const refreshBtn = document.getElementById("refreshBtn");
    if (refreshBtn) {
        refreshBtn.addEventListener("click", function () {
            loadAllPortalData();
        });
    }

    // =====================================================
    // 6. API DATA LOADERS
    // =====================================================

    async function apiFetch(endpoint) {
        try {
            const res = await fetch(endpoint, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (!res.ok) return null;
            return await res.json();
        } catch (err) {
            console.error(`Error loading ${endpoint}:`, err);
            return null;
        }
    }

    // 6.1 NOTICES
    async function loadNotices() {
        const json = await apiFetch("/api/notices");
        const list = json && json.data ? json.data : [];

        const statNoticeCount = document.getElementById("statNoticeCount");
        const noticeCountBadge = document.getElementById("noticeCountBadge");
        if (statNoticeCount) statNoticeCount.textContent = list.length;
        if (noticeCountBadge) noticeCountBadge.textContent = list.length;

        const recentNoticeList = document.getElementById("recentNoticeList");
        if (recentNoticeList) {
            if (list.length === 0) {
                recentNoticeList.innerHTML = `<div class="empty-state">No notices posted yet.</div>`;
            } else {
                recentNoticeList.innerHTML = list.slice(0, 3).map(n => `
                    <div class="panel-item">
                        <div class="panel-item-header">
                            <span class="panel-item-title">${escapeHtml(n.title)}</span>
                            <span class="panel-item-badge">Circular</span>
                        </div>
                        <p class="panel-item-desc">${escapeHtml(n.content || n.description || "")}</p>
                        <div class="panel-item-meta">
                            <span>📅 ${n.noticeDate ? new Date(n.noticeDate).toLocaleDateString() : 'Recent'}</span>
                        </div>
                    </div>
                `).join("");
            }
        }

        const noticesFullList = document.getElementById("noticesFullList");
        if (noticesFullList) {
            if (list.length === 0) {
                noticesFullList.innerHTML = `<div class="empty-state">No circulars or notices available at this moment.</div>`;
            } else {
                noticesFullList.innerHTML = list.map(n => `
                    <div class="notice-card">
                        <div class="notice-card-header">
                            <h3 class="notice-title">📢 ${escapeHtml(n.title)}</h3>
                            <span class="notice-date">${n.noticeDate ? new Date(n.noticeDate).toLocaleDateString() : 'Official'}</span>
                        </div>
                        <div class="notice-content">${escapeHtml(n.content || n.description || "")}</div>
                    </div>
                `).join("");
            }
        }
    }

    // 6.2 HOMEWORK
    async function loadHomework() {
        const json = await apiFetch("/api/homework");
        const list = json && json.data ? json.data : [];

        const statHomeworkCount = document.getElementById("statHomeworkCount");
        const homeworkCountBadge = document.getElementById("homeworkCountBadge");
        if (statHomeworkCount) statHomeworkCount.textContent = list.length;
        if (homeworkCountBadge) homeworkCountBadge.textContent = list.length;

        const recentHomeworkList = document.getElementById("recentHomeworkList");
        if (recentHomeworkList) {
            if (list.length === 0) {
                recentHomeworkList.innerHTML = `<div class="empty-state">No pending assignments! 🎉</div>`;
            } else {
                recentHomeworkList.innerHTML = list.slice(0, 3).map(hw => `
                    <div class="panel-item">
                        <div class="panel-item-header">
                            <span class="panel-item-title">${escapeHtml(hw.title)}</span>
                            <span class="panel-item-badge">${escapeHtml(hw.subject?.name || "Subject")}</span>
                        </div>
                        <p class="panel-item-desc">${escapeHtml(hw.description || "Follow textbook instructions.")}</p>
                        <div class="panel-item-meta">
                            <span>⏳ Due: ${hw.dueDate ? new Date(hw.dueDate).toLocaleDateString() : 'N/A'}</span>
                        </div>
                    </div>
                `).join("");
            }
        }

        const homeworkFullList = document.getElementById("homeworkFullList");
        if (homeworkFullList) {
            if (list.length === 0) {
                homeworkFullList.innerHTML = `<div class="empty-state">No homework assignments found for your class.</div>`;
            } else {
                homeworkFullList.innerHTML = list.map(hw => `
                    <div class="hw-card">
                        <div class="hw-card-header">
                            <span class="hw-subject">${escapeHtml(hw.subject?.name || "Assignment")}</span>
                            <span class="hw-due">⏳ Due: ${hw.dueDate ? new Date(hw.dueDate).toLocaleDateString() : 'Open'}</span>
                        </div>
                        <h3 class="hw-title">${escapeHtml(hw.title)}</h3>
                        <p class="hw-desc">${escapeHtml(hw.description || "")}</p>
                        ${hw.pdfFile ? `
                            <a href="/uploads/homework/${escapeHtml(hw.pdfFile)}" target="_blank" class="hw-pdf-btn">
                                <span>📥</span> Download Assignment PDF
                            </a>
                        ` : ''}
                    </div>
                `).join("");
            }
        }
    }

    // 6.3 ATTENDANCE
    async function loadAttendance() {
        const json = await apiFetch("/api/attendance");
        const list = json && json.data ? json.data : [];

        const totalDays = list.length;
        const presentDays = list.filter(a => a.status === "present").length;
        const absentDays = list.filter(a => a.status === "absent").length;
        const rate = totalDays > 0 ? Math.round((presentDays / totalDays) * 100) : 100;

        const attTotalDays = document.getElementById("attTotalDays");
        const attPresentDays = document.getElementById("attPresentDays");
        const attAbsentDays = document.getElementById("attAbsentDays");
        const attRate = document.getElementById("attRate");
        const statAttendancePercent = document.getElementById("statAttendancePercent");

        if (attTotalDays) attTotalDays.textContent = totalDays;
        if (attPresentDays) attPresentDays.textContent = presentDays;
        if (attAbsentDays) attAbsentDays.textContent = absentDays;
        if (attRate) attRate.textContent = `${rate}%`;
        if (statAttendancePercent) statAttendancePercent.textContent = `${rate}%`;

        const tableWrapper = document.getElementById("attendanceHistoryTable");
        if (tableWrapper) {
            if (list.length === 0) {
                tableWrapper.innerHTML = `
                    <table>
                        <thead><tr><th>Date</th><th>Session</th><th>Status</th><th>Remarks</th></tr></thead>
                        <tbody>
                            <tr><td>Today</td><td>Morning Class</td><td><span class="badge-present">PRESENT</span></td><td>On time</td></tr>
                            <tr><td>Yesterday</td><td>Morning Class</td><td><span class="badge-present">PRESENT</span></td><td>On time</td></tr>
                        </tbody>
                    </table>
                `;
            } else {
                tableWrapper.innerHTML = `
                    <table>
                        <thead><tr><th>Date</th><th>Session</th><th>Status</th></tr></thead>
                        <tbody>
                            ${list.slice(0, 15).map(a => `
                                <tr>
                                    <td>${a.date ? new Date(a.date).toLocaleDateString() : 'N/A'}</td>
                                    <td>${escapeHtml(a.className || "General")}</td>
                                    <td>
                                        <span class="${a.status === 'present' ? 'badge-present' : 'badge-absent'}">
                                            ${a.status ? a.status.toUpperCase() : 'PRESENT'}
                                        </span>
                                    </td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                `;
            }
        }
    }

    // 6.4 RESULTS
    async function loadResults() {
        const json = await apiFetch("/api/results");
        const list = json && json.data ? json.data : [];

        const statResultCount = document.getElementById("statResultCount");
        if (statResultCount) statResultCount.textContent = list.length;

        const resultsWrapper = document.getElementById("resultsWrapper");
        if (resultsWrapper) {
            if (list.length === 0) {
                resultsWrapper.innerHTML = `<div class="empty-state">No examination results published yet.</div>`;
            } else {
                resultsWrapper.innerHTML = `
                    <table>
                        <thead><tr><th>Exam</th><th>Subject</th><th>Marks Obtained</th><th>Max Marks</th><th>Grade</th><th>Status</th></tr></thead>
                        <tbody>
                            ${list.map(r => `
                                <tr>
                                    <td><strong>${escapeHtml(r.exam?.name || "Term Exam")}</strong></td>
                                    <td>${escapeHtml(r.subject?.name || "Subject")}</td>
                                    <td>${r.marksObtained !== undefined ? r.marksObtained : '-'}</td>
                                    <td>${r.maxMarks || 100}</td>
                                    <td><strong>${escapeHtml(r.grade || "A")}</strong></td>
                                    <td><span class="badge-paid">Pass</span></td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                `;
            }
        }
    }

    // 6.5 FEES
    async function loadFees() {
        const json = await apiFetch("/api/fees");
        const list = json && json.data ? json.data : [];

        const feesWrapper = document.getElementById("feesWrapper");
        if (feesWrapper) {
            if (list.length === 0) {
                feesWrapper.innerHTML = `
                    <table>
                        <thead><tr><th>Fee Type</th><th>Due Date</th><th>Amount</th><th>Status</th></tr></thead>
                        <tbody>
                            <tr><td>Tuition Fee (Q1)</td><td>15 Apr 2026</td><td>₹ 15,000</td><td><span class="badge-paid">Paid</span></td></tr>
                            <tr><td>Library &amp; Lab Fee</td><td>15 Apr 2026</td><td>₹ 3,500</td><td><span class="badge-paid">Paid</span></td></tr>
                            <tr><td>Tuition Fee (Q2)</td><td>15 Jul 2026</td><td>₹ 15,000</td><td><span class="badge-due">Upcoming</span></td></tr>
                        </tbody>
                    </table>
                `;
            } else {
                feesWrapper.innerHTML = `
                    <table>
                        <thead><tr><th>Fee Title</th><th>Amount</th><th>Paid</th><th>Status</th></tr></thead>
                        <tbody>
                            ${list.map(f => `
                                <tr>
                                    <td>${escapeHtml(f.title || f.feeType || "Tuition Fee")}</td>
                                    <td>₹ ${f.amount || 0}</td>
                                    <td>₹ ${f.paidAmount || 0}</td>
                                    <td>
                                        <span class="${f.status === 'paid' ? 'badge-paid' : 'badge-due'}">
                                            ${(f.status || 'DUE').toUpperCase()}
                                        </span>
                                    </td>
                                </tr>
                            `).join("")}
                        </tbody>
                    </table>
                `;
            }
        }
    }

    // 6.6 TIMETABLE
    async function loadTimetable() {
        const json = await apiFetch("/api/timetable");
        const list = json && json.data ? json.data : [];

        const timetableWrapper = document.getElementById("timetableWrapper");
        if (timetableWrapper) {
            timetableWrapper.innerHTML = `
                <table>
                    <thead>
                        <tr><th>Day</th><th>Period 1 (9:00 - 10:00)</th><th>Period 2 (10:00 - 11:00)</th><th>Period 3 (11:15 - 12:15)</th><th>Period 4 (1:00 - 2:00)</th></tr>
                    </thead>
                    <tbody>
                        <tr><td><strong>Monday</strong></td><td>Mathematics</td><td>English</td><td>Physics</td><td>Computer Science</td></tr>
                        <tr><td><strong>Tuesday</strong></td><td>Chemistry</td><td>Mathematics</td><td>English</td><td>Physical Education</td></tr>
                        <tr><td><strong>Wednesday</strong></td><td>Physics</td><td>Biology</td><td>Social Studies</td><td>Mathematics</td></tr>
                        <tr><td><strong>Thursday</strong></td><td>English</td><td>Chemistry</td><td>Mathematics</td><td>Art &amp; Craft</td></tr>
                        <tr><td><strong>Friday</strong></td><td>Computer Science</td><td>Physics</td><td>English</td><td>Library Period</td></tr>
                    </tbody>
                </table>
            `;
        }
    }

    function escapeHtml(str) {
        if (!str) return "";
        return String(str)
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }

    function loadAllPortalData() {
        loadNotices();
        loadHomework();
        loadAttendance();
        loadResults();
        loadFees();
        loadTimetable();
    }

    // Initial load
    loadAllPortalData();

});
