import { cinemaGrader } from "../../instances/cinemaGrader.mjs";
import { setCookie } from "../misc/cookies.mjs";

const loginForm = document.getElementById('login-form');

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

// Checking Function
function checkInputs(formData) {
    const email = formData.get('email');
    const password = formData.get('password');

    let inputStatus = {
        email: 'OK',
        password: 'OK'
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

    // Check for empty inputs
    if (email.replaceAll(' ', '') === '') {
        inputStatus.email = 'Email field is required.';
    }

    if (password.replaceAll(' ', '') === '') {
        inputStatus.password = 'Password field is required.';
    }

    return inputStatus;
}

// Login Function

async function sendLoginRequest() {
    const formData = new FormData(loginForm);


    const inputCheck = checkInputs(formData);
    let inputsValid = true;

    if (inputCheck.email !== 'OK') {
        inputsValid = false;

        const emailInput = document.getElementById('emailInput');
        const emailError = document.getElementById('emailError');

        emailInput.classList.add('error');
        emailError.innerText = inputCheck.email;
        emailError.classList.remove('invisible');
    } else {
        emailInput.classList.remove('error');
        emailError.classList.add('invisible');
    }

    if (inputCheck.password !== 'OK') {
        inputsValid = false;

        const passwordInput = document.getElementById('passwordInput');
        const passwordError = document.getElementById('passwordError');

        passwordInput.classList.add('error');
        passwordError.innerText = inputCheck.password;
        passwordError.classList.remove('invisible');
    } else {
        passwordInput.classList.remove('error');
        passwordError.classList.add('invisible');
    }

    if (!inputsValid) {
        return
    }

    let loading = true;
    checkLoading(loading);

    let response;
    
    try {
        response = await cinemaGrader.post('/login', {
            email: formData.get('email'),
            password: formData.get('password')
        });
        localStorage.setItem('uuid', response?.data?.userId);
        setCookie('Authorization', response?.data?.token, 1);
        location.href = '../../index.html';
    } catch (error) {
        const errorDisplay = document.getElementById('error-display');

        if (error.response.data.message) {
            errorDisplay.innerText = error?.response?.data?.message
        } else {
            errorDisplay.innerText = error.message;
        }

        errorDisplay.classList.remove('invisible');

        console.log(error)
    } finally {
        loading = false
        checkLoading(loading);
    }
}

// Event Listeners
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    sendLoginRequest();
})