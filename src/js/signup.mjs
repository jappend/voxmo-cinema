import { cinemaGrader } from "../instances/cinemaGrader.mjs";

const signupButton = document.getElementById('signup-button');
const signupModal = document.getElementById('signup-dialog');
const closeButton = document.getElementById('right-dialog-button');

const proceed = document.getElementById('signup-dialog-proceed');
const goback = document.getElementById('signup-dialog-goback');

const stepOne = document.getElementById('signup-dialog__dialog-step-one');
const stepTwo = document.getElementById('signup-dialog__dialog-step-two');
const stepThree = document.getElementById('signup-dialog__dialog-step-three');
const stepFour = document.getElementById('signup-dialog__dialog-step-four');

const nameInput = document.getElementById('signup-input-first-name');

const emailInput = document.getElementById('signup-input-email');
const emailError = document.getElementById('email-error');

const passwordInput = document.getElementById('signup-input-password');

const birthdayInput = document.getElementById('signup-input-birthdate');

let modalStep = 1;

signupButton.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.showModal();
})

closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.close();
})

function checkEmail(email) {
    const emailRegex = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$", "g") 

    if (email.match(emailRegex)) {
        return true;
    }

    return false;
}

function checkStep() {

    if (modalStep === 1) {
        goback.disabled = true;
        stepOne.classList.remove('invisible');
        stepTwo.classList.add('invisible');
    } 
    
    if (modalStep === 2) {
        goback.disabled = false;
        stepOne.classList.add('invisible');
        stepTwo.classList.remove('invisible');
        stepThree.classList.add('invisible');
    } 
    
    if (modalStep === 3) {
        if (checkEmail(emailInput.value)) {
            stepTwo.classList.add('invisible');
            stepThree.classList.remove('invisible');
            stepFour.classList.add('invisible');
        } else {
            modalStep = 2;

            emailInput.classList.add('input--error');
            emailError.classList.remove('invisible');

            setTimeout(() => {
                emailInput.classList.remove('input--error');
                emailError.classList.add('invisible');
            }, "3000")
        }
    } 
    
    if (modalStep === 4) {
        stepThree.classList.add('invisible');
        stepFour.classList.remove('invisible');
    } 

    if (modalStep === 5) {
        proceed.disabled = true;
        goback.disabled = true;
        console.log("creating...")

        let response;

        try {
            response = cinemaGrader.post('/users', {
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
                birthday: birthdayInput.value 
            })
        } catch(error) {
            console.log(error)
        } finally {
            modalStep = 1;
            stepFour.classList.add('invisible');
            stepOne.classList.remove('invisible')

            nameInput.value = ""
            emailInput.value = ""
            passwordInput.value = ""
            birthdayInput.value = null

            signupModal.close();
            proceed.disabled = false;
        }
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