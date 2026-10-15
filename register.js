document.addEventListener("DOMContentLoaded", function () {

    const registerForm = document.getElementById("registerForm");
    const registerButton = document.getElementById("registerButton");
    const registerMessage = document.getElementById("registerMessage");
    const agreeTerms = document.getElementById("agreeTerms");

    // Toggle password visibility buttons
    document.querySelectorAll(".toggle-password").forEach(function (button) {
        button.addEventListener("click", function () {
            const targetId = button.getAttribute("data-target");
            const targetInput = document.getElementById(targetId);
            if (!targetInput) return;

            if (targetInput.type === "password") {
                targetInput.type = "text";
                button.textContent = "🙈";
            } else {
                targetInput.type = "password";
                button.textContent = "👁️";
            }
        });
    });

    function showMessage(message, type) {
        registerMessage.textContent = message;
        registerMessage.className = "message " + type;
        registerMessage.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }

    function hideMessage() {
        registerMessage.textContent = "";
        registerMessage.className = "message";
    }

    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        hideMessage();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const password = document.getElementById("password").value;
        const confirmPassword = document.getElementById("confirmPassword").value;
        const selectedRoleElement = document.querySelector('input[name="role"]:checked');
        const role = selectedRoleElement ? selectedRoleElement.value : "student";

        // Client-side validations
        if (!name) {
            showMessage("Please enter your full name.", "error");
            document.getElementById("name").focus();
            return;
        }

        if (!email) {
            showMessage("Please enter your email address.", "error");
            document.getElementById("email").focus();
            return;
        }

        // Basic email format check
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showMessage("Please enter a valid email address.", "error");
            document.getElementById("email").focus();
            return;
        }

        if (!password) {
            showMessage("Please enter a password.", "error");
            document.getElementById("password").focus();
            return;
        }

        if (password.length < 6) {
            showMessage("Password must be at least 6 characters long.", "error");
            document.getElementById("password").focus();
            return;
        }

        if (password !== confirmPassword) {
            showMessage("Passwords do not match. Please recheck.", "error");
            document.getElementById("confirmPassword").focus();
            return;
        }

        if (!agreeTerms.checked) {
            showMessage("Please agree to the Terms of Service to proceed.", "error");
            agreeTerms.focus();
            return;
        }

        // Disable button while processing
        registerButton.disabled = true;
        const originalButtonText = registerButton.textContent;
        registerButton.textContent = "Creating Account...";

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    email: email,
                    password: password,
                    role: role,
                    phone: phone
                })
            });

            const data = await response.json();

            if (!response.ok || !data.success) {
                throw new Error(data.message || "Registration failed. Please try again.");
            }

            showMessage("🎉 Account created successfully! Redirecting to login...", "success");

            // Redirect to login page after 1.5 seconds
            setTimeout(function () {
                window.location.href = "/login.html";
            }, 1500);

        } catch (error) {
            showMessage(error.message || "Something went wrong. Please try again.", "error");
            registerButton.disabled = false;
            registerButton.textContent = originalButtonText;
        }
    });

});
