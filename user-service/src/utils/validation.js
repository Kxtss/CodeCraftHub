// Simple email validation regex
const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Password strength validation (example: at least 8 characters, one uppercase, one lowercase, one number, one special character)
const isValidPassword = (password) => {
    // This is a basic example. You can make it more robust.
    // Example: at least 8 characters
    if (password.length < 8) {
        return false;
    }
    return true;
    // Add more complex regex for uppercase, lowercase, number, special char if needed.
    // const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    // return passwordRegex.test(password);
};

module.exports = {
    isValidEmail,
    isValidPassword,
};