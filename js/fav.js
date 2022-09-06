const resultGrid = document.getElementById("result-grid");

const favMoviesInfo = !localStorage.getItem("favMoviesInfo") ? [] : JSON.parse(localStorage.getItem("favMoviesInfo"));

// remove selected movie from local storage

function removeMovie(index) {
    let data = JSON.parse(localStorage.getItem("favMoviesInfo"));
    data.splice(index, 1);
    localStorage.setItem("favMoviesInfo", JSON.stringify(data));
    window.location.reload();
}

// console.log(favMoviesInfo);

function displayMovieDetails() {
    let favMoviesList = JSON.parse(localStorage.getItem("favMoviesInfo"));

    // console.log(favMoviesList);

    Array.from(favMoviesList).forEach((element, index) => {
        resultGrid.innerHTML += `
    <div class = "movie-poster">
    <img src = "${(element.Poster != "N/A") ? element.Poster : '../image/image_not_found.png'}" alt = "movie poster">
    </div>
    <div class = "movie-info">
    <h3 class = "movie-title">${element.Title}</h3>
    <ul class = "movie-misc-info">
    <li class = "year">Year: ${element.Year}</li>
    <li class = "rated">Ratings: ${element.Rated}</li>
    <li class = "released">Released: ${element.Released}</li>
    </ul>
    <p class = "genre"><b>Genre:</b> ${element.Genre}</p>
    <p class = "writer"><b>Writer:</b> ${element.Writer}</p>
    <p class = "actors"><b>Actors: </b>${element.Actors}</p>
    <p class = "plot"><b>Plot:</b> ${element.Plot}</p>
    <p class = "language"><b>Language:</b> ${element.Language}</p>
    <p class = "awards"><b><i class = "fas fa-award"></i></b> ${element.Awards}</p>
    <button class="delete-movie" id='delete-movie' onclick="removeMovie(${index})">Remove</button>
    </div>
    `;

    });
}

displayMovieDetails();

