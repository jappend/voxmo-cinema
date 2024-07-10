import { cinemaGrader } from "../../instances/cinemaGrader.mjs";

async function getMovieInfo() {
    const searchParams = new URLSearchParams(window.location.search);

    let response;

    try {
        response = await cinemaGrader.get(`/movies/${searchParams.get('id')}`)
    } catch (error) {
        console.log(error);
        return;
    }

    return response.data;
}

async function getAllComments(id) {
    let response;

    try {
        response = await cinemaGrader.get(`/movies/${id}/comments?deleted=false`)
    } catch (error) {
        console.log(error)
        return;
    }

    return response.data;
}

async function movieDOM(movieInfo, parent) {
    const img = document.createElement('img');
    const div = document.createElement('div');
    const div2 = document.createElement('div');
    const div3 = document.createElement('div');
    const h2 = document.createElement('h2');
    const h3 = document.createElement('h3');
    const span = document.createElement('span');
    const imgRating = document.createElement('img');
    const reviewCount = document.createElement('p');
    const divExtraInfo = document.createElement('div');
    const releaseDate = document.createElement('p');
    const releaseDateA = document.createElement('a');
    const director = document.createElement('p');
    const directorA = document.createElement('a');

    const mainDiv = document.createElement('div');

    img.src = movieInfo.picture;
    img.alt = 'poster';

    div.classList.add('div__gradient');
    div2.classList.add('div__movie-info');

    const synopsisArray = movieInfo.synopsis.split(' ')
    synopsisArray.shift();

    h2.innerText = movieInfo.title;
    h3.innerText = synopsisArray.join(' ');

    const roundedHalfRating = (Math.round(movieInfo.averageGrade * 2) / 2).toFixed(1);

    imgRating.src = `../svgs/stars/${roundedHalfRating}.svg`;
    imgRating.alt = `rating of ${roundedHalfRating}`;

    const reviewNumber = await getAllComments(movieInfo.id);

    reviewCount.innerText = `(${reviewNumber.Comments.length} Reviews)`;

    releaseDate.innerText = 'Released in ';
    releaseDateA.href = '#';

    const releaseDateObject = new Date(movieInfo.releaseDate);
    const releaseDateFormatted = releaseDateObject.toLocaleDateString("en-US", {day: 'numeric'}) + " " + releaseDateObject.toLocaleDateString("en-US", {month: 'short'}) + ', ' + releaseDateObject.toLocaleDateString("en-US", {year: 'numeric'});

    releaseDateA.innerText = releaseDateFormatted;

    director.innerText = 'Directed by ';
    directorA.href = '#';
    directorA.innerText = movieInfo.director;

    span.append(imgRating, reviewCount);
    releaseDate.append(releaseDateA);
    director.append(directorA);
    divExtraInfo.append(releaseDate, director)
    div3.append(h2, h3, span);

    div2.append(div3, divExtraInfo)

    mainDiv.append(img, div, div2);
    parent.append(mainDiv)
}

async function start() {
    const movieInfo = await getMovieInfo();
    const mainTag = document.querySelector('main');

    document.title = `${movieInfo.title} (${movieInfo.releaseDate.split('-')[0]}) - VOXMO`;
    movieDOM(movieInfo, mainTag);
}

start();