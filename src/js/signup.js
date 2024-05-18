const signupButton = document.getElementById('signup-button');
const signupModal = document.getElementById('first-signup-dialog');

signupButton.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.showModal();
})