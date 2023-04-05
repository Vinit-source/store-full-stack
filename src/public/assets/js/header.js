// $(function () {
//     $("#header").load("../../../src/pages/header.html");
// });
const userId = JSON.parse(window.localStorage.getItem("userId"));
const profile = document.querySelector('.profile');
const title = document.querySelector('.store-title');

title.addEventListener('click', () => {
    window.location.href = './index.html';
});

if (userId) {
    profile.innerHTML = `<i class="fa-solid fa-user fa-xl"></i>`;

    const userIcon = document.querySelector('.fa-xl');

    userIcon.addEventListener('click', () => {
        const dropdownContent = document.querySelector('.menu');
        dropdownContent.style.display = 'flex';
    });

    userIcon.addEventListener('mouseout', () => {
        const dropdownContent = document.querySelector('.menu');
        dropdownContent.style.display = 'none';
    });



    const dropdownContent = document.querySelector('.menu');
    dropdownContent.addEventListener('mouseover', () => {
        dropdownContent.style.display = 'flex';
    });

    dropdownContent.addEventListener('mouseout', () => {
        dropdownContent.style.display = 'none';
    })


    const logout = document.getElementById("logout");
    logout.addEventListener('click', () => {
        window.localStorage.removeItem("userId");
        window.location.reload();
    });


    const myAccount = document.getElementById("my-account");
    myAccount.addEventListener('click', () => {
        window.location.href = "./src/pages/user/myaccount.html";
    });


} else {
    profile.innerHTML = `<button onclick="window.location.href = './src/pages/user/login.html'">Login</button>`;
}
