function login() {
    const identifier = document.getElementById('identifier').value;
    const password = document.getElementById('password').value;
    const role = document.getElementById('role').value;

    const identifierError = document.getElementById('identifierError');
    const passwordError = document.getElementById('passwordError');
    const roleError = document.getElementById('roleError');

    identifierError.style.display = 'none';
    passwordError.style.display = 'none';
    roleError.style.display = 'none';

    // Email and phone validation regex
    const phoneRegex = /^\d{8}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

    let isValid = true;

    if (!phoneRegex.test(identifier) && !emailRegex.test(identifier)) {
        identifierError.textContent = 'Invalid email or phone number.';
        identifierError.style.display = 'block';
        isValid = false;
    }

    if (!passwordRegex.test(password)) {
        passwordError.textContent = 'Password must be at least 8 characters long, include a number, and a capital letter.';
        passwordError.style.display = 'block';
        isValid = false;
    }

    if (!role) {
        roleError.textContent = 'Please select a role.';
        roleError.style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        alert(`Logged in with ${identifier}`);

        if (role === 'admin') {
            window.location.href = 'admin.html';
        } else if (role === 'security') {
            window.location.href = 'stadium.html';
        }
    }
}
