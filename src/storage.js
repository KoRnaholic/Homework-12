const main = document.getElementById("main")

const movie = localStorage.getItem("movie");
const parsedMovie = JSON.parse(movie)
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";


document.title = parsedMovie.title;

console.log(parsedMovie)
const {title,vote_average, overview, release_date, poster_path, original_language, vote_count,adult} = parsedMovie

main.innerHTML=`
<div class="container">
  <div class="card">
    <div class="cover">
      <img src="${IMG_PATH + poster_path}" alt="Movie cover" class="img-cover">
    </div>
    <div class="detail">
      <h1 class="title">
        ${title}
      </h1>
      <p class="review">
        ${overview}
      </p>
      <ul>
        <li><p>
          <span>Initial release:</span>  
          ${release_date}
        </p></li>
        <li><p>
          <span>Rate:</span>  
          ${vote_average.toFixed(2)} (${vote_count})
        </p></li>
        <li><p>
          <span>Language:</span>  
          ${original_language.toUpperCase()}
        </p></li>
        <li><p>
          <span>PG-13:</span>  
          ${adult ===false ? `No` : `Yes`}
        </p></li>
        <li><p>
          <span>Producers:</span>  
          Josh Appelbaum, André Nemec, Kendra Halland
        </p></li>
      </ul>
    </div>
  </div>
</div>
`