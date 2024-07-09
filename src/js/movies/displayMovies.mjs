import { cinemaGrader } from "../../instances/cinemaGrader.mjs";

// Movie Functions

function movieDOM(img, title, release, rating, synopsis) {
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

    const roundedHalfRating = (Math.round(rating * 2) / 2).toFixed(1);

    console.log(roundedHalfRating)

    ratingImg.src = `./src/svgs/stars/${roundedHalfRating}.svg`;
    ratingImg.alt = 'rating';

    div2.append(ratingImg);
    div.append(poster, h1, h2, div2);

    const movieGenre = synopsis.split(' ')[0];

    if (!document.getElementById(`${movieGenre}-list`)) {
        const main = document.querySelector('main');
        const titleSpan = document.createElement('span');
        const titleText = document.createElement('h1');
        const movieListElem = document.createElement('div');

        titleText.innerText = movieGenre;
        movieListElem.classList.add('movies');
        movieListElem.id = `${movieGenre}-list`;

        titleSpan.append(titleText);
        main.append(titleSpan, movieListElem);
    }

    const listElem = document.getElementById(`${movieGenre}-list`)

    listElem.append(div);
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
        movieDOM(movie.picture, movie.title, movie.releaseDate.split('-')[0], movie.averageGrade, movie.synopsis)
        console.log(movie)
    }
}

start();