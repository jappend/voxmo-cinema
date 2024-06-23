import { cinemaGrader } from "../../instances/cinemaGrader.mjs";

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

// Login Function

async function sendLoginRequest() {
    const formData = new FormData(loginForm);

    let loading = true;
    checkLoading(loading);

    let response;
    
    try {
        response = await cinemaGrader.post('/login', {
            email: formData.get('email'),
            password: formData.get('password')
        });
        localStorage.setItem('uuid', response?.data?.userId)
        location.href = '../../index.html'
    } catch (error) {
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