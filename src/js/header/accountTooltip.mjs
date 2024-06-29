const headerAccountSpan = document.getElementById('header-account-span');
const main = document.querySelector('main');

const logoutButton = document.getElementById('account-logout');

// Event Listeners
headerAccountSpan.addEventListener('mouseenter', (e) => {
    e.preventDefault();

    const accountTooltip = document.getElementById('account-tooltip');
    accountTooltip.style.display = "flex";
})

main.addEventListener('mouseenter', (e) => {
    e.preventDefault();

    const accountTooltip = document.getElementById('account-tooltip');
    accountTooltip.style.display = "none";
})

logoutButton.addEventListener('click', (e) => {
    e.preventDefault();

    localStorage.clear();
    location.reload();
})