const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const showPasswordCheckbox = document.getElementById('show-password');
const signupForm = document.querySelector('form'); 

//Toggle password visibility
showPasswordCheckbox.addEventListener('change', function () {
    passwordInput.type = this.checked ? 'text' : 'password';
});

// Remove error on input
[emailInput, passwordInput].forEach(input => {
    input.addEventListener('input', () => {
        document.getElementById(input.id + 'Error')?.classList.remove('active');
        input.classList.remove('input-error', 'shake-error');
    });
});

// Email validation function
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Show error message function
function showError(id, message, inputElement) {
    const errorEl = document.getElementById(id);
    if (errorEl) {
        errorEl.classList.add('active');
        errorEl.querySelector('span').textContent = message;
    }
    inputElement.classList.add('input-error', 'shake-error');
}

// Form validation
signupForm.addEventListener('submit', function (e) {
    e.preventDefault();
    let isValid = true;

    // Reset previous errors
    document.querySelectorAll('.input-error, .shake-error').forEach(el => {
        el.classList.remove('input-error', 'shake-error');
    });
    setTimeout(() => {
        document.querySelectorAll('.error-message.active').forEach(el => {
            el.classList.remove('active');
        });
    }, 5000);

    // Validate Email
    const email = emailInput.value.trim();
    if (!email) {
        showError('emailError', 'Email is required', emailInput);
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError('emailError', 'Please enter a valid email address', emailInput);
        isValid = false;
    }

    // Validate Password
    const password = passwordInput.value.trim();
    if (!password) {
        showError('passwordError', 'Password is required', passwordInput);
        isValid = false;
    } else if (password.length < 6) {
        showError('passwordError', 'Password must be at least 6 characters', passwordInput);
        isValid = false;
    }

    // ✅ On success
    if (isValid) {
        window.location.href = "main_page.html"; // or your desired page
    } else {
        // Optional: Focus on first invalid input
        document.querySelector('.input-error')?.focus();
    }
});
