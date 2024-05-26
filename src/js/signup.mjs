import { cinemaGrader } from "../instances/cinemaGrader.mjs";

const signupButton = document.getElementById('signup-button');
const signupModal = document.getElementById('signup-dialog');
const closeButton = document.getElementById('right-dialog-button');

const proceed = document.getElementById('signup-dialog-proceed');
const goback = document.getElementById('signup-dialog-goback');

const stepOne = document.getElementById('dialog-step-one');
const stepTwo = document.getElementById('dialog-step-two');
const stepThree = document.getElementById('dialog-step-three');
const stepFour = document.getElementById('dialog-step-four');

const nameInput = document.getElementById('first-name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const birthdayInput = document.getElementById('birthday-input');

let modalStep = 1;

signupButton.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.showModal();
})

closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.close();
})

// Proceed Modal
proceed.addEventListener('click', (e) => {
    e.preventDefault();

    if (modalStep === 1) {
        stepOne.classList.add('invisible');
        stepTwo.classList.remove('invisible');
        modalStep++;
    } else if (modalStep === 2) {
        stepTwo.classList.add('invisible');
        stepThree.classList.remove('invisible');
        modalStep++;
    } else if (modalStep === 3) {
        stepThree.classList.add('invisible');
        stepFour.classList.remove('invisible');
        modalStep++;
    } else if (modalStep === 4) {
        modalStep++;
        console.log("creating...")
        cinemaGrader.post('/users', {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            birthday: birthdayInput.value 
        })
        .finally(function () {
            modalStep = 1;
            stepFour.classList.add('invisible');
            stepOne.classList.remove('invisible')

            nameInput.value = ""
            emailInput.value = ""
            passwordInput.value = ""
            birthdayInput.value = null

            signupModal.close();
        })
        .catch(function(error) {
            console.log(error)
        })
    }
})

// Goback Modal
goback.addEventListener('click', (e) => {
    e.preventDefault();

    if (modalStep === 2) {
        stepOne.classList.remove('invisible');
        stepTwo.classList.add('invisible');
        modalStep--;
    } else if (modalStep === 3) {
        stepThree.classList.add('invisible');
        stepTwo.classList.remove('invisible');
        modalStep--;
    } else if (modalStep === 4) {
        stepFour.classList.add('invisible');
        stepThree.classList.remove('invisible');
        modalStep--;
    }
})