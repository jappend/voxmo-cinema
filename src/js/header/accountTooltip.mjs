const headerAccountSpan = document.getElementById('header-account-span');
const main = document.querySelector('main');

const logoutButton = document.getElementById('account-logout');

// Event Listeners
headerAccountSpan.addEventListener('click', (e) => {
    e.preventDefault();
    const spanAccount = document.querySelector('.log-in-sign-up > span');

    const accountTooltip = document.getElementById('account-tooltip');

    if (accountTooltip.style.display === "flex") {
        accountTooltip.style.display = "none";
    } else {
        accountTooltip.style.right = spanAccount.offsetWidth / 2 + 10 + "px";
        accountTooltip.style.display = "flex";
    }
    
})

logoutButton.addEventListener('click', (e) => {
    e.preventDefault();

    localStorage.clear();
    location.reload();
})