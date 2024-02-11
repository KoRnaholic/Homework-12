const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';

const main = document.getElementById("main");
const search = document.getElementById("search");
const form = document.getElementById("form")

async function fetchMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  const { results } = data;

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
       <span class="vote ${classRate(vote_average)}">${vote_average.toFixed(1)}</span>
       <p>Release Date : ${release_date}</p>
    </div>
    <div class="overview">
       ${overview}
    </div>
    `
    main.appendChild(movieEl)

    movieEl.addEventListener("click", ()=> {
      console.log(movie)
      localStorage.setItem("movie", JSON.stringify(movie))

      var url = "description.html";
        
      // Open the new window with specified URL
      window.open(url);
    })
  });

}

form.addEventListener("submit", (e) => {
e.preventDefault();

fetchMovies(SEARCH_API + search.value)
search.value = ''
})

function classRate(vote){
if(vote >=7){
    return "green"
}else if(vote >=5){
    return "orange"
}else{
    return "red"
}
}
