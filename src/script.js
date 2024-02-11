const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';

const main = document.getElementById("main");
const search = document.getElementById("search");

async function fetchMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  const { results } = data;

  console.log(results);
  showMovies(results);
}

fetchMovies(API_URL);

function showMovies(movies) {
  main.innerHTML = "";

  movies.map((movie) => {
    const { title, vote_average, overview, release_date, poster_path } = movie;
    const imgPath = IMG_PATH+ poster_path
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML=`
    <img src="${imgPath}" alt="${title}" >
    <div class="movie_info">
       <h3>${title}</h3>
       <span class="${vote_average}">${vote_average}</span>
    </div>
    <div class="overview">
       ${overview}
    </div>
    `
    main.appendChild(movieEl)
  });
}
