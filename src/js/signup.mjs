import { cinemaGrader } from "../instances/cinemaGrader.mjs";

const signupForm = document.getElementById('signup-form');
const signupButton = document.getElementById('signup-button');
const signupModal = document.getElementById('signup-dialog');
const closeButton = document.getElementById('close-signup-button');

const proceed = document.getElementById('signup-dialog-proceed');
const goback = document.getElementById('signup-dialog-goback');
const returnButtonSignup = document.getElementById('return-button-signup');

const stepOne = document.getElementById('dialog-step-one');
const stepTwo = document.getElementById('dialog-step-two');
const stepThree = document.getElementById('dialog-step-three');
const stepFour = document.getElementById('dialog-step-four');
const stepFive = document.getElementById('dialog-step-five');

const nameInput = document.getElementById('signup-input-first-name');
const nameError = document.getElementById('firstname-error');

const emailInput = document.getElementById('signup-input-email');
const emailError = document.getElementById('email-error');

const passwordInput = document.getElementById('signup-input-password');

const passwordLengthVal = document.getElementById('password-val-1');
const passwordLengthValIcon = document.getElementById('password-val-1-icon');

const passwordSymbolVal = document.getElementById('password-val-2');
const passwordSymbolValIcon = document.getElementById('password-val-2-icon');

const passwordUppercaseVal = document.getElementById('password-val-3');
const passwordUppercaseValIcon = document.getElementById('password-val-3-icon');

const passwordLowercaseVal = document.getElementById('password-val-4');
const passwordLowercaseValIcon = document.getElementById('password-val-4-icon');

const passwordNumberVal = document.getElementById('password-val-5');
const passwordNumberValIcon = document.getElementById('password-val-5-icon');

const birthdayInput = document.getElementById('signup-input-birthdate');

const navigation = document.getElementById('navigation-bottom-signup');

let modalStep = 1;
let passwordComplete = false;
let isLoading = false;

function detectLoading() {
    const submitIcon = document.getElementById('submit-image');

    if (isLoading === true) {
        submitIcon.classList.add('loading-rotation');
        submitIcon.src = './src/svgs/spinner-solid.svg';
    } else {
        submitIcon.classList.remove('loading-rotation');
        submitIcon.src = './src/svgs/check-solid-text-white.svg';
    }
}


signupButton.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.showModal();

    nameInput.focus();
})

closeButton.addEventListener('click', (e) => {
    e.preventDefault();
    signupModal.close();
})

function checkPassword(password) {
    const symbolRegex = new RegExp("[^\\w\\s]", "g");
    const uppercaseRegex = new RegExp("[A-Z]", "g");
    const lowercaseRegex = new RegExp("[a-z]", "g");
    const numberRegex = new RegExp("[\\d]", "g");

    if (password.length > 7) {
        passwordLengthVal.classList.remove('signup-dialog--text-error');
        passwordLengthVal.classList.add('signup-dialog--text-right');

        passwordLengthValIcon.src = './src/svgs/check-solid.svg';
        passwordLengthValIcon.alt = 'check';
    } else {
        passwordLengthVal.classList.add('signup-dialog--text-error');
        passwordLengthVal.classList.remove('signup-dialog--text-right');

        passwordLengthValIcon.src = './src/svgs/xmark-solid-wrong.svg';
        passwordLengthValIcon.alt = 'wrong';
    }

    if (password.match(symbolRegex)) {
        passwordSymbolVal.classList.remove('signup-dialog--text-error');
        passwordSymbolVal.classList.add('signup-dialog--text-right');

        passwordSymbolValIcon.src = './src/svgs/check-solid.svg';
        passwordSymbolValIcon.alt = 'check';
    } else {
        passwordSymbolVal.classList.add('signup-dialog--text-error');
        passwordSymbolVal.classList.remove('signup-dialog--text-right');

        passwordSymbolValIcon.src = './src/svgs/xmark-solid-wrong.svg';
        passwordSymbolValIcon.alt = 'wrong';
    }

    if (password.match(uppercaseRegex)) {
        passwordUppercaseVal.classList.remove('signup-dialog--text-error');
        passwordUppercaseVal.classList.add('signup-dialog--text-right');

        passwordUppercaseValIcon.src = './src/svgs/check-solid.svg';
        passwordUppercaseValIcon.alt = 'check';
    } else {
        passwordUppercaseVal.classList.add('signup-dialog--text-error');
        passwordUppercaseVal.classList.remove('signup-dialog--text-right');

        passwordUppercaseValIcon.src = './src/svgs/xmark-solid-wrong.svg';
        passwordUppercaseValIcon.alt = 'wrong';
    }

    if (password.match(lowercaseRegex)) {
        passwordLowercaseVal.classList.remove('signup-dialog--text-error');
        passwordLowercaseVal.classList.add('signup-dialog--text-right');

        passwordLowercaseValIcon.src = './src/svgs/check-solid.svg';
        passwordLowercaseValIcon.alt = 'check';
    } else {
        passwordLowercaseVal.classList.add('signup-dialog--text-error');
        passwordLowercaseVal.classList.remove('signup-dialog--text-right');

        passwordLowercaseValIcon.src = './src/svgs/xmark-solid-wrong.svg';
        passwordLowercaseValIcon.alt = 'wrong';
    }

    if (password.match(numberRegex)) {
        passwordNumberVal.classList.remove('signup-dialog--text-error');
        passwordNumberVal.classList.add('signup-dialog--text-right');

        passwordNumberValIcon.src = './src/svgs/check-solid.svg';
        passwordNumberValIcon.alt = 'check';
    } else {
        passwordNumberVal.classList.add('signup-dialog--text-error');
        passwordNumberVal.classList.remove('signup-dialog--text-right');

        passwordNumberValIcon.src = './src/svgs/xmark-solid-wrong.svg';
    }

    if (
        password.length > 7 
        && password.match(symbolRegex) 
        && password.match(uppercaseRegex) 
        && password.match(lowercaseRegex) 
        && password.match(numberRegex)
    ) {
        passwordComplete = true;
    } else {
        passwordComplete = false;
    }
}

function checkStep() {

    if (modalStep === 1) {
        goback.disabled = true;
        stepOne.classList.remove('invisible');
        stepTwo.classList.add('invisible');

        nameInput.focus();
    } 
    
    if (modalStep === 2) {
        if (nameInput.value.replaceAll(' ', '') !== "") {
            signupModal.style.height = '423px';
            closeButton.style.top = '20%';

            goback.disabled = false;
            stepOne.classList.add('invisible');
            stepTwo.classList.remove('invisible');
            stepThree.classList.add('invisible');

            emailInput.focus();
        } else {
            modalStep = 1;

            nameInput.classList.add('input--error');
            nameError.classList.remove('invisible');

            setTimeout(() => {
                nameInput.classList.remove('input--error');
                nameError.classList.add('invisible');
            }, "3000")
        }
    } 
    
    if (modalStep === 3) {
        const emailRegex = new RegExp("^[\\w-.]+@([\\w-]+\\.)+[\\w-]{2,4}$", "g") 

        if (emailInput.value.match(emailRegex)) {
            stepTwo.classList.add('invisible');
            stepThree.classList.remove('invisible');
            stepFour.classList.add('invisible');

            signupModal.style.height = '694px';
            closeButton.style.top = '11%';
            
            passwordInput.focus();
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
        navigation.classList.add('signup-dialog__dialog-nav');
        navigation.classList.remove('invisible');
        if (passwordComplete) {
            signupModal.style.height = '423px';

            closeButton.style.top = '20%';

            stepThree.classList.add('invisible');
            stepFour.classList.remove('invisible');
            stepFive.classList.add('invisible');

            birthdayInput.focus();
        } else {
            modalStep = 3;
        }
    } 

    if (modalStep === 5) {
        let insertedDate = new Date(birthdayInput.value);
        let todaysDate = new Date();
        todaysDate.setHours(0, 0, 0, 0);

        if (birthdayInput.value != "" && insertedDate < todaysDate) {
            const confName = document.getElementById('confirmation-name');
            const confEmail = document.getElementById('confirmation-email');
            const confBirthdate = document.getElementById('confirmation-birthdate');

            confName.innerText = nameInput.value;
            confEmail.innerText = emailInput.value;
            confBirthdate.innerText = birthdayInput.value;

            navigation.classList.remove('signup-dialog__dialog-nav');
            navigation.classList.add('invisible');

            stepFive.classList.remove('invisible');
            stepFour.classList.add('invisible');
        } else {
            modalStep = 4;
            const birthdateError = document.getElementById('birthdate-error');

            birthdayInput.classList.add('input--error');
            birthdateError.classList.remove('invisible');

            setTimeout(() => {
                birthdayInput.classList.remove('input--error');
                birthdateError.classList.add('invisible');
            }, "3000")
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

returnButtonSignup.addEventListener('click', (e) => {
    e.preventDefault();

    modalStep--;
    checkStep();
})

// Password Input
passwordInput.addEventListener('input', (e) => {
    e.preventDefault();

    checkPassword(passwordInput.value)
})

// On Form Submit

async function submitSignup() {
    proceed.disabled = true;
    goback.disabled = true;

    let response;

    isLoading = true;
    detectLoading();

    try {
        response = await cinemaGrader.post('/users', {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            birthday: birthdayInput.value 
        })
    } catch(error) {
        console.log(error)
    } finally {
        isLoading = false;
        detectLoading();

        modalStep = 1;
        stepFive.classList.add('invisible');
        stepOne.classList.remove('invisible')

        navigation.classList.add('signup-dialog__dialog-nav');
        navigation.classList.remove('invisible');

        nameInput.value = ""
        emailInput.value = ""
        passwordInput.value = ""
        birthdayInput.value = null

        checkPassword(passwordInput.value);
        signupModal.close();
        proceed.disabled = false;
    }
}

signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    submitSignup();
})

let submitGate = 0;
document.body.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && modalStep === 5) {
        e.preventDefault();
        submitGate++;
    }

    if (submitGate === 2) {
        e.preventDefault();
        submitSignup();
    }
})

// Advance Step with Enter
nameInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();

        modalStep++;
        checkStep();
    }
})

emailInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();

        modalStep++;
        checkStep();
    }
})

passwordInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();

        modalStep++;
        checkStep();
    }
})

birthdayInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
        e.preventDefault();

        modalStep++;
        checkStep();
    }
})