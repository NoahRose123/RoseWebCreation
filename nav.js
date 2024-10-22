

// Add event listener to button
document.getElementById("sendMailBtn").addEventListener("click", sendMail);

// Hamburger menu toggle
function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    menu.classList.toggle('show'); // This toggles the 'show' class to display/hide the menu
}



document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (!hamburgerMenu || !dropdownMenu) {
        console.error("Hamburger menu or dropdown menu not found!");
        return;
    }

    console.log('Hamburger menu and dropdown menu found!');

    hamburgerMenu.addEventListener('click', function () {
        console.log('Hamburger menu clicked!');
        dropdownMenu.classList.toggle('show');
    });
});
