//back history
document.getElementById('back-btn').addEventListener('click', () => {
    window.history.back(); 
    // window.location.href = "../Signup step 1/signup_phase_1.html"; 
  });

//for form validation
document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm2');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
    const confirmPassInput = document.getElementById('confirm-pass');
    const showPasswordCheckbox = document.getElementById('show-password');
    
    // Toggle password visibility
    showPasswordCheckbox.addEventListener('change', function() {
        const passwordFields = document.querySelectorAll('.password');
        passwordFields.forEach(field => {
            field.type = this.checked ? 'text' : 'password';
        });
    });

    // Live error removal
    [emailInput, passwordInput, confirmPassInput].forEach(input => {
        input.addEventListener('input', () => {
            document.getElementById(input.id + 'Error')?.classList.remove('active');
            input.classList.remove('input-error');
        });
    });
    
    // Form validation
    signupForm.addEventListener('submit', function(e) {
        e.preventDefault();
        let isValid = true;
        
        // Reset errors
        document.querySelectorAll('.input-error').forEach(el => {
            el.classList.remove('input-error');
        });
        document.querySelectorAll('.shake-error').forEach(el => {
            el.classList.remove('shake-error');
        });
        
        setTimeout(() => {
            document.querySelectorAll('.error-message').forEach(el => {
                el.classList.remove('active');
            });
        }, 5000);

        // Email validation
        const email = emailInput.value.trim();
        if (!email) {
            showError('emailError', 'Email is required', emailInput);
            isValid = false;
        } else if (!isValidEmail(email)) {
            showError('emailError', 'Please enter a valid email address', emailInput);
            isValid = false;
        }
        
        // Password validation
        const password = passwordInput.value.trim();
        if (!password) {
            showError('passwordError', 'Password is required', passwordInput);
            isValid = false;
        } else if (password.length < 6) {
            showError('passwordError', 'Password must be at least 6 characters', passwordInput);
            isValid = false;
        }
        
        // Confirm password validation
        const confirmPass = confirmPassInput.value.trim();
        if (!confirmPass) {
            showError('confirmPassError', 'Please confirm your password', confirmPassInput);
            isValid = false;
        } else if (password !== confirmPass) {
            showError('confirmPassError', 'Passwords do not match', confirmPassInput);
            isValid = false;
        }
        
        if (isValid) {
            alert('Form submitted successfully!');
        }
    });
    
    function showError(elementId, message, inputElement) {
        const errorElement = document.getElementById(elementId);

        errorElement.querySelector('span').textContent = message;
        errorElement.classList.add('active');

        inputElement.classList.add('input-error');
        inputElement.classList.add('shake-error');

        setTimeout(() => {
            inputElement.classList.remove('shake-error');
        }, 600);
    }
    
    function isValidEmail(email) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    // Real-time password strength indicator
    passwordInput.addEventListener('input', function() {
        const strengthElement = document.getElementById('passwordStrength');
        const password = this.value;
        
        if (password.length === 0) {
            strengthElement.textContent = 'Password should be at least 8 characters';
            strengthElement.style.color = 'var(--gray-dark)';
        } else if (password.length <= 4 ) {
            strengthElement.textContent = 'Password is too short';
            strengthElement.style.color = 'var(--error)';
        } else if (password.length >4 && password.length < 10) {
            strengthElement.textContent = 'Password strength: Medium';
            strengthElement.style.color = '#FFA500';
        } else {
            strengthElement.textContent = 'Password strength: Strong';
            strengthElement.style.color = '#00A300';
        }
    });
});