const form = document.getElementById('login-form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const phone = document.getElementById("phone");
    const password = document.getElementById("password");

    const formData = new FormData(form);
    const body = JSON.stringify(Object.fromEntries(formData));
    const baseURL = "http://localhost:3000"
    const response = await fetch(`${baseURL}/api/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body
    });

    if (response.ok) {
        alert('Login successful!');
        form.reset();
        const user = JSON.parse(body);
        localStorage.setItem("user", { "phone": user.phone, "loggedIn": response.cookie.loggedIn });
        // window.location.href = "../../../index.html";
    } else {
        alert('Login failed.');
    }
});
