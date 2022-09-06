// http://www.omdbapi.com/?i=tt3896198&apikey=9c76e652
// http://www.omdbapi.com/?s=thor&page=1&apikey=9c76e652
// Here is your key: 9c76e652

const movieSearchBox = document.getElementById("movie-search-box");
const searchList = document.getElementById("search-list");
const resultGrid = document.getElementById("result-grid");

// load movies from api

async function loadMovies(searchTerm) {
    const URL = `https://www.omdbapi.com/?s=${searchTerm}&page=1&apikey=9c76e652`;
    const res = await fetch(`${URL}`);
    const data = await res.json();

    // console.log(data.Search);

    if (data.Response == "True") {
        displayMovieList(data.Search);
    }
}

// find movies via search input

function findMovies() {
    let searchTerm = (movieSearchBox.value).trim();

    // console.log(searchTerm);

    if (searchTerm.length > 0) {
        searchList.classList.remove("hide-search-list");
        loadMovies(searchTerm);
    } else {
        searchList.classList.add("hide-search-list");
    }
}

// display movies list post search query

function displayMovieList(movies) {
    searchList.innerHTML = "";
    for (let idx = 0; idx < movies.length; idx++) {
        let movieListItem = document.createElement("div");

        // console.log(movieListItem);

        // setting movie id in data-id

        movieListItem.dataset.id = movies[idx].imdbID;
        movieListItem.classList.add("search-list-item");
        if (movies[idx].Poster != "N/A") {
            moviePoster = movies[idx].Poster;
        } else {
            moviePoster = "./image/image_not_found.png";
        }

        movieListItem.innerHTML = `
        <div class = "search-item-thumbnail">
        <img src = "${moviePoster}">
        </div>
        <div class = "search-item-info">
        <h3>${movies[idx].Title}</h3>
        <p>${movies[idx].Year}</p>
        </div>
        `;
        searchList.appendChild(movieListItem);
    }

    loadMovieDetails();

}

// select relevant movie from the movies list and fetch its data

function loadMovieDetails() {
    const searchListMovies = searchList.querySelectorAll(".search-list-item");
    searchListMovies.forEach(movie => {

        // console.log(movie);

        movie.addEventListener("click", async () => {

            // console.log(movie.dataset.id);

            searchList.classList.add("hide-search-list");
            movieSearchBox.value = "";
            const result = await fetch(`https://www.omdbapi.com/?i=${movie.dataset.id}&apikey=9c76e652`);
            const movieDetails = await result.json();

            // console.log(movieDetails);

            displayMovieDetails(movieDetails);

        });
    });
}

// display the appropriate info of the queried movie

function displayMovieDetails(details) {
    resultGrid.innerHTML = `
    <div class = "movie-poster">
    <img src = "${(details.Poster != "N/A") ? details.Poster : './image/image_not_found.png'}" alt = "movie poster">
    </div>
    <div class = "movie-info">
    <h3 class = "movie-title">${details.Title}</h3>
    <ul class = "movie-misc-info">
    <li class = "year">Year: ${details.Year}</li>
    <li class = "rated">Ratings: ${details.Rated}</li>
    <li class = "released">Released: ${details.Released}</li>
    </ul>
    <button id="info-movie" class="info-movie">Click for more information</button>
    <button id="fav-movie" class="fav-movie">Add to favourite movies</button>
    </div>
    `;

    // call info.html page

    function openPage() {
        localStorage.setItem("MovieInfo", JSON.stringify(details));
        parent.location = "./html/info.html";
    }

    // click event on info movie button

    document.getElementById("info-movie").addEventListener("click", openPage);

    // click event on favourite movie button

    document.getElementById("fav-movie").addEventListener("click", addFav(details));

}

// add selected movie to favMoviesInfo array of local storage on click event of fav-movie button

function addFav(element) {
    const favMoviesInfo = !localStorage.getItem("favMoviesInfo") ? [] : JSON.parse(localStorage.getItem("favMoviesInfo"));
    const currentMovie = element;

    // console.log(currentMovie);

    favMoviesInfo.push(currentMovie);

    localStorage.setItem("favMoviesInfo", JSON.stringify(favMoviesInfo));
}

window.addEventListener("click", (event) => {
    if (event.target.className != "form-control") {
        searchList.classList.add("hide-search-list");
    }
});