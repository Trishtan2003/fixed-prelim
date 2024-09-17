document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('container');
    const registerBtn = document.getElementById('register');
    const loginBtn = document.getElementById('login');

    // Form container adjustment for responsiveness
    function adjustFormLayout() {
        const formContainer = document.querySelector('.form-container');
        if (window.innerWidth < 600) {
            formContainer.style.width = '90%'; // Full width on mobile
        } else {
            formContainer.style.width = '400px'; // Default width on larger screens
        }
    }

    registerBtn.addEventListener('click', () => {
        container.classList.add("active");
    });

    loginBtn.addEventListener('click', () => {
        container.classList.remove("active");
    });

    // Handle Sign Up form submission
    document.getElementById('signUpForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        const name = document.getElementById('signUpName').value;
        const email = document.getElementById('signUpEmail').value;
        const password = document.getElementById('signUpPassword').value;

        // Store user in localStorage
        localStorage.setItem('user', JSON.stringify({ name, email, password }));

        // Switch to sign in
        container.classList.remove('active');
    });

    // Handle Sign In form submission
    document.getElementById('signInForm').addEventListener('submit', (event) => {
        event.preventDefault(); // Prevent default form submission
        const email = document.getElementById('signInEmail').value;
        const password = document.getElementById('signInPassword').value;

        // Retrieve user from localStorage
        const user = JSON.parse(localStorage.getItem('user'));

        if (user && user.email === email && user.password === password) {
            // Redirect to grocery.html upon successful login
            window.location.href = 'grocery.html';
        } else {
            alert('Invalid credentials. Please try again.');
        }
    });

    // Initial layout adjustment
    adjustFormLayout();

    // Adjust layout on window resize
    window.addEventListener('resize', adjustFormLayout);
});
