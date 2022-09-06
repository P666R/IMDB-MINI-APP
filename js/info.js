const resultGrid = document.getElementById("result-grid");

function displayMovieDetails() {
  let details = JSON.parse(localStorage.getItem("MovieInfo"));

  // console.log(details);

  // display detailed info of selected movie

  resultGrid.innerHTML = `
    <div class = "movie-poster">
    <img src = "${(details.Poster != "N/A") ? details.Poster : '../image/image_not_found.png'}" alt = "movie poster">
    </div>
    <div class = "movie-info">
    <h3 class = "movie-title">${details.Title}</h3>
    <ul class = "movie-misc-info">
    <li class = "year">Year: ${details.Year}</li>
    <li class = "rated">Ratings: ${details.Rated}</li>
    <li class = "released">Released: ${details.Released}</li>
    </ul>
    <p class = "genre"><b>Genre:</b> ${details.Genre}</p>
    <p class = "writer"><b>Writer:</b> ${details.Writer}</p>
    <p class = "actors"><b>Actors: </b>${details.Actors}</p>
    <p class = "plot"><b>Plot:</b> ${details.Plot}</p>
    <p class = "language"><b>Language:</b> ${details.Language}</p>
    <p class = "awards"><b><i class = "fas fa-award"></i></b> ${details.Awards}</p>
    <button id="fav-movie" class="fav-movie">Add to favourite movies</button>
    </div>
    `;

  // add selected movie to favMoviesInfo array of local storage on click event of fav-movie button

  function addFav() {
    const favMoviesInfo = !localStorage.getItem("favMoviesInfo") ? [] : JSON.parse(localStorage.getItem("favMoviesInfo"));
    const currentMovie = JSON.parse(localStorage.getItem("MovieInfo"));

    // console.log(currentMovie);

    favMoviesInfo.push(currentMovie);

    localStorage.setItem("favMoviesInfo", JSON.stringify(favMoviesInfo));
  }

  // click event on favourite movie button

  document.getElementById("fav-movie").addEventListener("click", addFav);
}

displayMovieDetails();