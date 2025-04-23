// Password show/hide toggle
document.getElementById('show-password').addEventListener('change', function() {
        const passwordFields = document.querySelectorAll('.password');
        passwordFields.forEach(field => {
            field.type = this.checked ? 'text' : 'password';
        });
    });

// Form validation
document.getElementById('signupForm2').addEventListener('submit', function(e) {
        e.preventDefault();
        
        const password = document.getElementById('password').value;
        const confirmPass = document.getElementById('confirm-pass').value;
        
        if (password !== confirmPass) {
            alert('Passwords do not match!');
            return;
        }
        
        // Form is valid - proceed with submission
        alert('Registration successful!');
        sessionStorage.removeItem('signupData'); 
        window.location.href = 'welcome.html';
    });