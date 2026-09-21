document.addEventListener("DOMContentLoaded", function () {

    const loginForm = document.getElementById("loginForm");
    const loginButton = document.getElementById("loginButton");
    const loginMessage = document.getElementById("loginMessage");
    const rememberMe = document.getElementById("rememberMe");


    function showMessage(message, type) {

        loginMessage.textContent = message;

        loginMessage.className =
            "message " + type;

    }


    loginForm.addEventListener("submit", async function (event) {

        event.preventDefault();


        const email =
            document.getElementById("email").value.trim();

        const password =
            document.getElementById("password").value;


        if (!email || !password) {

            showMessage(
                "Please enter email and password.",
                "error"
            );

            return;
        }


        loginButton.disabled = true;

        loginButton.textContent = "Logging in...";


        try {

            const response = await fetch(
                "/api/auth/login",
                {
                    method: "POST",

                    headers: {
                        "Content-Type": "application/json"
                    },

                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                }
            );


            const data = await response.json();


            if (!response.ok || !data.success) {

                throw new Error(
                    data.message ||
                    "Login failed."
                );

            }


            /*
             * Save JWT token
             */

            if (data.token) {

                localStorage.setItem(
                    "school_auth_token",
                    data.token
                );

            }


            /*
             * Save user information
             */

            if (data.user) {

                localStorage.setItem(
                    "school_user",
                    JSON.stringify(data.user)
                );

            }


            /*
             * Remember Me
             */

            if (rememberMe.checked) {

                localStorage.setItem(
                    "school_remember_me",
                    "true"
                );

            } else {

                localStorage.removeItem(
                    "school_remember_me"
                );

            }


            showMessage(
                "Login successful. Redirecting...",
                "success"
            );


            /*
             * Redirect according to role
             */

            const role =
                String(
                    data.user?.role || "admin"
                ).toLowerCase();


            setTimeout(function () {

                if (
                    role === "admin" ||
                    role === "superadmin" ||
                    role === "super_admin"
                ) {

                    window.location.href =
                        "/admin";

                }

                else if (role === "teacher") {

                    window.location.href =
                        "/teacher.html";

                }

                else if (role === "student") {

                    window.location.href =
                        "/student.html";

                }

                else if (role === "parent") {

                    window.location.href =
                        "/parent.html";

                }

                else {

                    window.location.href =
                        "/admin";

                }

            }, 700);


        } catch (error) {

            console.error(
                "Login Error:",
                error
            );


            showMessage(
                error.message ||
                "Unable to login.",
                "error"
            );


            loginButton.disabled = false;

            loginButton.textContent = "Login";

        }

    });

});