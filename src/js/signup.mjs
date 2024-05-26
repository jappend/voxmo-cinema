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

function checkStep() {

    if (modalStep === 1) {
        stepOne.classList.remove('invisible');
        stepTwo.classList.add('invisible');
    } 
    
    if (modalStep === 2) {
        stepOne.classList.add('invisible');
        stepTwo.classList.remove('invisible');
        stepThree.classList.add('invisible');
    } 
    
    if (modalStep === 3) {
        stepTwo.classList.add('invisible');
        stepThree.classList.remove('invisible');
        stepFour.classList.add('invisible');
    } 
    
    if (modalStep === 4) {
        stepThree.classList.add('invisible');
        stepFour.classList.remove('invisible');
    } 

    if (modalStep === 5) {
        console.log("creating...")

        cinemaGrader.post('/users', {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            birthday: birthdayInput.value 
        })
        .catch((error) => {
            console.log(error)
        })
        .finally(() => {
            modalStep = 1;
            stepFour.classList.add('invisible');
            stepOne.classList.remove('invisible')

            nameInput.value = ""
            emailInput.value = ""
            passwordInput.value = ""
            birthdayInput.value = null

            signupModal.close();
        })
    }
};

// Proceed Modal
proceed.addEventListener('click', (e) => {
    e.preventDefault();

    modalStep++;
    checkStep();
})

// Goback Modal
goback.addEventListener('click', (e) => {
    e.preventDefault();

    modalStep--;
    checkStep();
})