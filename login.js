document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function (e) {
        e.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        const ADMIN_USER = "Masterwung";
        const ADMIN_PASS = "Franklin2004";

        if (!username || !password) {
            alert("Please fill all fields");
            return;
        }

        if (username === ADMIN_USER && password === ADMIN_PASS) {

            localStorage.setItem("admin", "true");

            alert("Login successful!");

            window.location.href = "admin.html";

        } else {
            alert("Invalid username or password");
        }
    });

});