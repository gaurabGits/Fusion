document.addEventListener('DOMContentLoaded', function () {
    const signupForm = document.getElementById('signupForm1');
    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const usernameInput = document.getElementById('username');
    const genderRadios = document.querySelectorAll('input[name="gender"]');

    // Live error removal
    [firstNameInput, lastNameInput, usernameInput].forEach(input => {
        input.addEventListener('input', () => {
            document.getElementById(input.id + 'Error')?.classList.remove('active');
            input.classList.remove('input-error');
        });
    });
    genderRadios.forEach(radio => {
        radio.addEventListener('change', () => {
            document.getElementById('genderError')?.classList.remove('active');
        });
    });

    signupForm.addEventListener('submit', function (e) {
        e.preventDefault();
        let isValid = true;

        document.querySelectorAll('.input-error, .shake-error').forEach(el => el.classList.remove('input-error', 'shake-error'));

        setTimeout(() => {
            document.querySelectorAll('.error-message').forEach(el => el.classList.remove('active'));
        }, 5000);

        const firstName = firstNameInput.value.trim();
        if (!firstName || firstName.length < 2) {
            showError('firstNameError', firstName ? 'At least 2 characters' : 'First Name is Required', firstNameInput);
            isValid = false;
        }

        const lastName = lastNameInput.value.trim();
        if (!lastName || lastName.length < 2) {
            showError('lastNameError', lastName ? 'At least 2 characters' : 'Last Name is Required', lastNameInput);
            isValid = false;
        }

        const username = usernameInput.value.trim();
        if (!username || username.length < 4 || !/^[a-zA-Z0-9_]+$/.test(username)) {
            showError('usernameError', !username ? 'Username is Required' : (username.length < 4 ? 'Min 4 characters' : 'Only letters, numbers, _'), usernameInput);
            isValid = false;
        }

        const genderSelected = Array.from(genderRadios).some(radio => radio.checked);
        if (!genderSelected) {
            showError('genderError', 'Please select your gender', document.querySelector('.radio-group'));
            isValid = false;
        }

        if (isValid) {
            window.location.href = "../Signup step 2/signup_phase_2.html";
        }
    });

    function showError(id, message, input) {
        const el = document.getElementById(id);
        el.querySelector('span').textContent = message;
        el.classList.add('active');
        input.classList.add('input-error', 'shake-error');
        setTimeout(() => input.classList.remove('shake-error'), 600);
    }
});
