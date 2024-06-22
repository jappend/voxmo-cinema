import { cinemaGrader } from "../../instances/cinemaGrader.mjs";

const signupForm = document.getElementById('signup-form');

// Validation Functions
function checkForEmptyInput(inputBox, inputError, errorMessage) {
    let errorBool = false;

    if (inputBox.value.replaceAll(' ', '') === '') {
        errorBool = true;

        inputBox.classList.add('error');
        inputError.innerText = errorMessage;
        inputError.classList.remove('invisible');
    } else {
        errorBool = false;

        inputBox.classList.remove('error');
        inputError.classList.add('invisible');
    }

    return errorBool;
}

function checkEmailAddress(emailBox, emailError, errorMessage) {
    let errorBool = false;

    const emailRegex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', 'g')

    if (!emailBox.value.match(emailRegex)) {
        errorBool = true;

        emailBox.classList.add('error');
        emailError.innerText = errorMessage;
        emailError.classList.remove('invisible');
    } else {
        errorBool = false;

        emailBox.classList.remove('error');
        emailError.classList.add('invisible');
    }

    return errorBool;
}

function validateInputs() {
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const birthdayInput = document.getElementById('birthdateInput');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const birthdayError = document.getElementById('birthdateError');

    let hasError = false;

    // Empty Input Check
    const nameEmpty = checkForEmptyInput(nameInput, nameError, 'Name field is required.');
    const emailEmpty = checkForEmptyInput(emailInput, emailError, 'Email field is required.');
    const passwordEmpty = checkForEmptyInput(passwordInput, passwordError, 'Password field is required.');
    const birthdayEmpty = checkForEmptyInput(birthdayInput, birthdayError, 'Birthday field is required.');

    if (nameEmpty || emailEmpty || passwordEmpty || birthdayEmpty) {
        hasError = true;
        return hasError;
    }

    // Valid Email Check
    const emailNotValid = checkEmailAddress(emailInput, emailError, 'Must be a valid email address.');

    if (emailNotValid) {
        hasError = true;
        return hasError;
    }

    return hasError;
}

// Loading Function
function checkLoading(loadingBool) {
    const buttonIcon = document.getElementById('buttonIcon');

    if (loadingBool) {
        buttonIcon.src = '../svgs/spinner-solid.svg';
        buttonIcon.classList.add('loading-rotation'); 
    } else {
        buttonIcon.src = '../svgs/check-solid-text-white.svg';
        buttonIcon.classList.remove('loading-rotation');
    }

}

// POST Function
async function postForm() {
    const signupData = new FormData(signupForm);

    let loading = true;

    if (validateInputs()) {
        return;
    }

    try {
        checkLoading(loading);
        await cinemaGrader.post('/users', {
            name: signupData.get('name'),
            email: signupData.get('email'),
            password: signupData.get('password'),
            birthday: signupData.get('birthdate')
        })
    } catch (error) {
        console.log(error);
    } finally {
        loading = false;
        checkLoading(loading);
    }
};

// Event Listeners
signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    postForm();
});