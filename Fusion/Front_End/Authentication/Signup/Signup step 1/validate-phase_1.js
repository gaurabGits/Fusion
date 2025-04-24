document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signupForm1');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const usernameInput = document.getElementById('username');
    const genderRadios = document.querySelectorAll('input[name="gender"]');
    
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
        
        // First Name validation
        const firstName = firstNameInput.value.trim();
        if (!firstName) {
            showError('firstNameError', 'First name is required', firstNameInput);
            isValid = false;
        } else if (firstName.length < 2) {
            showError('firstNameError', 'First name must be at least 2 characters', firstNameInput);
            isValid = false;
        }
        
        // Last Name validation
        const lastName = lastNameInput.value.trim();
        if (!lastName) {
            showError('lastNameError', 'Last name is required', lastNameInput);
            isValid = false;
        } else if (lastName.length < 2) {
            showError('lastNameError', 'Last name must be at least 2 characters', lastNameInput);
            isValid = false;
        }
        
        // Username validation
        const username = usernameInput.value.trim();
        if (!username) {
            showError('usernameError', 'Username is required', usernameInput);
            isValid = false;
        } else if (username.length < 4) {
            showError('usernameError', 'Username must be at least 4 characters', usernameInput);
            isValid = false;
        } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            showError('usernameError', 'Username can only contain letters, numbers and underscores', usernameInput);
            isValid = false;
        }
        
        // Gender validation
        let genderSelected = false;
        genderRadios.forEach(radio => {
            if (radio.checked) genderSelected = true;
        });
        if (!genderSelected) {
            showError('genderError', 'Please select your gender', document.querySelector('.radio-group'));
            isValid = false;
        }
        
        if (isValid) {
            alert('Form submitted successfully!');
            // In a real application: this.submit();
        }
    });
    
    function showError(elementId, message, inputElement) {
        const errorElement = document.getElementById(elementId);
        
        errorElement.querySelector('span').textContent = message;
        errorElement.classList.add('active');
        
        if (inputElement.classList) {
            inputElement.classList.add('input-error');
            inputElement.classList.add('shake-error');

            setTimeout(() => {
                inputElement.classList.remove('shake-error');
            }, 600);
        }
    }
});