document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("modal");
    const loginForm = document.getElementById("modal-login");
    const signupForm = document.getElementById("modal-signup");

    document.getElementById("login-btn").addEventListener("click", () => {
        modal.style.display = "block";
        loginForm.classList.add("active");
        signupForm.classList.remove("active");
    });

    document.getElementById("signup-btn").addEventListener("click", () => {
        modal.style.display = "block";
        loginForm.classList.remove("active");
        signupForm.classList.add("active");
    });

    document.getElementsByClassName("close")[0].addEventListener("click", () => {
        modal.style.display = "none";
    });

    window.onclick = (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    };

    // Login form submission
    document.getElementById("login-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const email = document.getElementById("login-email").value;
        const password = document.getElementById("login-password").value;

        fetch('https://your-app-name.herokuapp.com/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Login successful!') {
                window.location.href = 'home.html';
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while logging in.');
        });
    });

    // Sign up form submission
    document.getElementById("signup-form").addEventListener("submit", (event) => {
        event.preventDefault();
        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("signup-email").value;
        const password = document.getElementById("signup-password").value;
        const confirmPassword = document.getElementById("confirm-password").value;

        if (password !== confirmPassword) {
            alert("Passwords do not match");
            return;
        }

        fetch('https://your-app-name.herokuapp.com/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ firstName, lastName, email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Sign up successful!') {
                window.location.href = 'home.html';
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred while signing up.');
        });
    });
});
