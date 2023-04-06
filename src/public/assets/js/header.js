// Clicking on the store title opens index.html page. This page contains list of products in the store.
const title = document.querySelector('.store-title');
title.addEventListener('click', () => {
    window.location.href = './index.html';
});

// Get userId of the logged in user from the local storage
const userId = JSON.parse(window.localStorage.getItem("userId"));

// Profile is the div present in the top-right side of every page. 
// It contains user icon if the user is logged in
// It contains `Login` button if the user is not logged in
const profile = document.querySelector('.profile');

// If userId is present in the localStorage then userId variable will have some value
// If userId variable has some value, display user icon
if (userId) {
    profile.innerHTML = `<i class="fa-solid fa-user fa-xl"></i>`;

    const userIcon = document.querySelector('.fa-xl');

    // Show menu when user icon is clicked
    userIcon.addEventListener('click', () => {
        const dropdownContent = document.querySelector('.menu');
        dropdownContent.style.display = 'flex';
    });

    // Hide menu when mouse stops hovering on the user icon
    userIcon.addEventListener('mouseout', () => {
        const dropdownContent = document.querySelector('.menu');
        dropdownContent.style.display = 'none';
    });

    // Keep showing the menu when mouse hovers on the menu
    const dropdownContent = document.querySelector('.menu');
    dropdownContent.addEventListener('mouseover', () => {
        dropdownContent.style.display = 'flex';
    });

    // Hide the menu when mouse stops hovering on the menu
    dropdownContent.addEventListener('mouseout', () => {
        dropdownContent.style.display = 'none';
    })

    // Delete userId from local Storage when logout is clicked
    const logout = document.getElementById("logout");
    logout.addEventListener('click', () => {
        window.localStorage.removeItem("userId");
        window.location.reload();
    });

    // Open myaccount page when My Account is clicked 
    const myAccount = document.getElementById("my-account");
    myAccount.addEventListener('click', () => {
        window.location.href = "./src/pages/user/myaccount.html";
    });

    // If userId is not present in the localStorage then user has not logged in
    // If user has not logged in, display Login button
} else {
    profile.innerHTML = `<button class="login-btn" onclick="window.location.href = './src/pages/user/login.html'">Login</button>`;
}
