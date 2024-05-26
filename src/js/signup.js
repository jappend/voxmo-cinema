const signupButton = document.getElementById('signup-button');
const signupModal = document.getElementById('signup-dialog');
const closeButton = document.getElementById('left-dialog-button');
const signupForm = document.getElementById('signup-form');

signupButton.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.showModal();
})

closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.close();
})