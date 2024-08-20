
function createAccount() {
    // Clear previous error messages
    document.getElementById('firstNameError').style.display = 'none';
    document.getElementById('lastNameError').style.display = 'none';
    document.getElementById('identifierError').style.display = 'none';
    document.getElementById('passwordError').style.display = 'none';
    document.getElementById('roleError').style.display = 'none';

    // Get form values
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const identifier = document.getElementById('identifier').value.trim();
    const password = document.getElementById('password').value.trim();
    const role = document.getElementById('role').value;

    let isValid = true;

    // Validate first name
    if (!/^[a-zA-Z]+$/.test(firstName)) {
        document.getElementById('firstNameError').innerText = 'First name must contain only letters.';
        document.getElementById('firstNameError').style.display = 'block';
        isValid = false;
    }

    // Validate last name
    if (!/^[a-zA-Z]+$/.test(lastName)) {
        document.getElementById('lastNameError').innerText = 'Last name must contain only letters.';
        document.getElementById('lastNameError').style.display = 'block';
        isValid = false;
    }

    // Validate email or phone
    if (!/^\S+@\S+\.\S+$/.test(identifier) && !/^\d{10,15}$/.test(identifier)) {
        document.getElementById('identifierError').innerText = 'Invalid email or phone number.';
        document.getElementById('identifierError').style.display = 'block';
        isValid = false;
    }

    // Validate password
    if (!/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
        document.getElementById('passwordError').innerText = 'Password must be at least 8 characters long, include a number, and a capital letter.';
        document.getElementById('passwordError').style.display = 'block';
        isValid = false;
    }

    // Validate role
    if (!role) {
        document.getElementById('roleError').innerText = 'Please select a role.';
        document.getElementById('roleError').style.display = 'block';
        isValid = false;
    }

    if (isValid) {
        console.log('User signed up:', { firstName, lastName, identifier, password, role });
        // Perform signup logic here, e.g., send data to the server
        alert('Account created successfully!');
    }
}
