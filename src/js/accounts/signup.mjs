import { cinemaGrader } from "../../instances/cinemaGrader.mjs";

const signupForm = document.getElementById('signup-form');

// Validation Functions
function checkInputs(formData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const birthdate = formData.get('birthdate');

    let inputStatus = {
        name: 'OK',
        email: 'OK',
        password: 'OK',
        birthday: 'OK'
    }

    // Check if birthdate is valid
    const birthdateDateType = new Date(birthdate).setHours(0, 0, 0, 0);
    const todaysDate = new Date().setHours(0, 0, 0, 0);

    if (birthdateDateType > todaysDate) {
        inputStatus.birthday = 'Birthdate must be valid.';
    }

    // Check if password is valid
    const passwordSymbol = new RegExp('[^\\w\\s]', 'g');
    const passwordUpper = new RegExp('[A-Z]', 'g');
    const passwordLower = new RegExp('[a-z]', 'g');
    const passwordNumber = new RegExp('[\\d]', 'g');

    if (password.length < 7 ||
        !password.match(passwordSymbol) ||
        !password.match(passwordUpper) ||
        !password.match(passwordLower) ||
        !password.match(passwordNumber)
    ) {
        inputStatus.password = 'The password must include at least 8 characters in length, one symbol, one lowercase letter, one uppercase letter and one number.'
    }


    // Check if email is valid
    const emailRegex = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$', 'g');

    if (!email.match(emailRegex)) {
        inputStatus.email = 'Email must be valid.';
    }

    // Check if inputs are empty
    if (name.replaceAll(' ', '') === '') {
        inputStatus.name = 'Name field is required.';
    }

    if (email.replaceAll(' ', '') === '') {
        inputStatus.email = 'Email field is required.';
    }

    if (password.replaceAll(' ', '') === '') {
        inputStatus.password = 'Password field is required.';
    }

    if (birthdate.replaceAll(' ', '') === '') {
        inputStatus.birthday = 'Birthday field is required.';
    }

    return inputStatus;
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

    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const passwordInput = document.getElementById('passwordInput');
    const birthdateInput = document.getElementById('birthdateInput');

    const nameError = document.getElementById('nameError');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');
    const birthdateError = document.getElementById('birthdateError');

    const inputsValidator = checkInputs(signupData);

    let loading = true;
    let allInputsValid = true;

    if (inputsValidator.name != 'OK') {
        allInputsValid = false;

        nameInput.classList.add('error');
        nameError.innerText = inputsValidator.name;
        nameError.classList.remove('invisible');
    } else {
        nameInput.classList.remove('error');
        nameError.classList.add('invisible');
    }

    if (inputsValidator.email != 'OK') {
        allInputsValid = false;

        emailInput.classList.add('error');
        emailError.innerText = inputsValidator.email;
        emailError.classList.remove('invisible');
    } else {
        emailInput.classList.remove('error');
        emailError.classList.add('invisible');
    }

    if (inputsValidator.password != 'OK') {
        allInputsValid = false;

        passwordInput.classList.add('error');
        passwordError.innerText = inputsValidator.password;
        passwordError.classList.remove('invisible');
    } else {
        passwordInput.classList.remove('error');
        passwordError.classList.add('invisible');
    }

    if (inputsValidator.birthday != 'OK') {
        allInputsValid = false;

        birthdateInput.classList.add('error');
        birthdateError.innerText = inputsValidator.birthday;
        birthdateError.classList.remove('invisible');
    } else {
        birthdateInput.classList.remove('error');
        birthdateError.classList.add('invisible');
    }

    if (!allInputsValid) {
        return
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
        const div1 = document.getElementById('div1');
        const div2 = document.getElementById('div2');
        const div3 = document.getElementById('div3');
        const div4 = document.getElementById('div4');
        const spanSubmit = document.getElementById('spanSubmit');

        const subtitle = document.querySelector('#signup-form > h2');

        div1.classList.add('invisible');
        div2.classList.add('invisible');
        div3.classList.add('invisible');
        div4.classList.add('invisible');
        spanSubmit.classList.add('invisible');

        subtitle.innerText = error.message;

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