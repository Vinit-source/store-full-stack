const form = document.getElementById('signup-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const password = document.getElementById("password");
    const confirmPassword = document.getElementById("confirm-password");

    if (password.value !== confirmPassword.value) {
        alert("Passwords do not match.");
    } else {
        const formData = new FormData(form);
        const body = JSON.stringify(Object.fromEntries(formData));
        const baseURL = "http://localhost:3000"
        const response = await fetch(`${baseURL}/api/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });

        if (response.ok) {
            alert('Signup successful!');
            form.reset();
            window.location.href = "./login.html";
        } else {
            alert('Signup failed.');
        }
    }
});
