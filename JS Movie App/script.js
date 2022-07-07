const APIURL = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI ="https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";

const main = document.querySelector('main');
const form = document.querySelector('form');
const searchMovie = document.querySelector('.search');

addAllMovies(APIURL);
async function addAllMovies(url) {
    // Skraceni Oblik
    //const resp = await (await (await fetch(APIURL)).json());
    resp = await fetch(url);
    const respData = await resp.json();

    console.log(respData);

    showMovies(respData.results);
};

function showMovies(movies) {
    main.innerHTML = '';
    movies.forEach((movie) => {
        const movieDiv = document.createElement('div');
        movieDiv.classList.add('movies');
        //const {poster_path, title, vote_average} = movie;
        movieDiv.innerHTML = `
            <img src="${IMGPATH + movie.poster_path}" alt="${movie.title}">

            <div class="movie-info">
                <h3>${movie.title}</h3>
                <span class="${voteColor(movie.vote_average)}">${movie.vote_average}</span>
            </div>

            <div class="overview">
                <h4 class="over-title">Overview</h4>
                <p>${movie.overview}</p>
            </div>
        `;
        main.appendChild(movieDiv);
    });
};

function voteColor(vote) {
    if (vote >= 8) {
        return 'green'
    }
    else if (vote >= 6) {
        return 'orange'
    }
    else {
        return 'red';
    }
};

form.addEventListener('submit', e => {
    e.preventDefault();
    const input = searchMovie.value;

    if (input) {
        addAllMovies(SEARCHAPI + input);
        searchMovie.value = '';
    }
});