import { cinemaGrader } from "../../instances/cinemaGrader.mjs";

// Login Function

async function detectLogin() { 
    if (localStorage.getItem('uuid') && localStorage.getItem('token')) {
        const headerAccountName = document.getElementById('header-account-name');
        const spanAccountName = document.querySelector('.log-in-sign-up > span > p');
        const spanAccountPic = document.querySelector('.log-in-sign-up > span > img');
        const signupButton = document.getElementById('signup-button');
        const loginButton = document.getElementById('login-button');

        let response;

        try {
            response = await cinemaGrader.get(`/users/${localStorage.getItem('uuid')}`, {
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })

            headerAccountName.innerText = response?.data?.name;
            signupButton.classList.add('invisible');
            loginButton.classList.add('invisible');
            spanAccountName.classList.remove('invisible');
            spanAccountPic.classList.remove('invisible');
        } catch (error) {
            signupButton.classList.remove('invisible');
            loginButton.classList.remove('invisible');
            spanAccountName.classList.add('invisible');
            spanAccountPic.classList.add('invisible');
            console.log(error);
        }
    }
}

detectLogin();