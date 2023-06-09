const passwordInput = document.querySelector('input[name="new_password"]');
const passwordStrength = document.querySelector('.password-strength');

passwordInput.addEventListener('input', function () {
    const password = this.value;
    const strength = checkPasswordStrength(password);

    passwordStrength.textContent = `Password Strength: ${strength}`;
});

function checkPasswordStrength(password) {
    //password strength criteria
    const minLength = 8;

    let strength = 0;

    if (password.length >= minLength) {
        strength++;
    }

    if (password.match(/[A-Z]/) && password.match(/[a-z]/)) {
        strength++;
    }

    if (password.match(/[0-9]/)) {
        strength++;
    }

    return getStrengthLabel(strength);
}

function getStrengthLabel(strength) {
    switch (strength) {
        case 1:
            return 'Weak';
        case 2:
            return 'Moderate';
        case 3:
            return 'Strong';
        default:
            return 'Very Weak';
    }
}