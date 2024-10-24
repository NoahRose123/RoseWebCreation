// Hamburger menu toggle
function toggleMenu() {
    const menu = document.getElementById('dropdownMenu');
    if (menu) {
        menu.classList.toggle('show');
        console.log('Menu toggled! Current state:', menu.classList.contains('show') ? 'Open' : 'Closed');
    } else {
        console.error('Dropdown menu not found!');
    }
}

// Ensure the DOM is fully loaded before adding event listeners
document.addEventListener('DOMContentLoaded', function () {
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const dropdownMenu = document.querySelector('.dropdown-menu');

    if (!hamburgerMenu || !dropdownMenu) {
        console.error("Hamburger menu or dropdown menu not found!");
        return;
    }

    console.log('Hamburger menu and dropdown menu found!');

    // Add event listener to the hamburger menu
    hamburgerMenu.addEventListener('click', function () {
        console.log('Hamburger menu clicked!');
        dropdownMenu.classList.toggle('show'); // Toggle the 'show' class on the dropdown menu
    });
});
