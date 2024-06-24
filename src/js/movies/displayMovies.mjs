import { cinemaGrader } from "../../instances/cinemaGrader.mjs";

// Movie Functions

function movieDOM(img, title, release, rating) {
    const movieList = document.getElementById('movie-list');
    const div = document.createElement('div');
    const poster = document.createElement('img');
    const h1 = document.createElement('h1');
    const h2 = document.createElement('h2');
    const div2 = document.createElement('div');
    const ratingImg = document.createElement('img');



    div.classList.add('movie');

    poster.src = img;
    poster.alt = 'poster';

    h1.innerText = title;
    h2.innerText = release;

    ratingImg.src = './src/svgs/stars/full.svg';
    ratingImg.alt = 'rating';

    div2.append(ratingImg);
    div.append(poster, h1, h2, div2);
    movieList.append(div);
}

async function getMovies() {
    let response;

    try {
        response = await cinemaGrader.get('/movies')
    } catch (error) {
        console.log(error);
    }

    return response.data;
}

async function start() {
    const movieList = await getMovies();

    for (let movie of movieList) {
        movieDOM(movie.picture, movie.title, movie.releaseDate.split('-')[0], 0)
    }
    console.log(movieList)
}

start();