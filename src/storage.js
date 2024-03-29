const main = document.getElementById("main")

const movie = localStorage.getItem("movie");
const parsedMovie = JSON.parse(movie)
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";


document.title = parsedMovie.title;

const {title,vote_average, overview, release_date, poster_path, original_language, vote_count,adult} = parsedMovie;

const seatCount = [1,2,3,4,5,6,7,8,9,10,11,12]
const seats = [
  { row: 'A', seat: seatCount },
  { row: 'B', seat: seatCount },
  { row: 'C', seat: seatCount },
  { row: 'D', seat: seatCount },
  { row: 'E', seat: seatCount },
  { row: 'F', seat: seatCount },
  { row: 'G', seat: seatCount },
  { row: 'H', seat: seatCount },
  { row: 'I', seat: seatCount },
  { row: 'J', seat: seatCount },
  { row: 'K', seat: seatCount },
  { row: 'L', seat: seatCount },
]

// let price = 0;

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
      <button class="button">Add to Favorites</button>
    <div class="rating">
    <h2>Rate this Movie</h2>
    <div class="star-rating">
    <input type="radio" id="star5" name="rating" value="5"><label for="star5"></label>
    <input type="radio" id="star4" name="rating" value="4"><label for="star4"></label>
    <input type="radio" id="star3" name="rating" value="3"><label for="star3"></label>
    <input type="radio" id="star2" name="rating" value="2"><label for="star2"></label>
    <input type="radio" id="star1" name="rating" value="1"><label for="star1"></label>
  </div>
</div>
    </div>
  </div>
</div>
<div class="screen">
<img src="/src/images/screen.avif" width=900px height=199px />
</div>
<div class="chairs">
<table>
<tr class="seat">
    <td></td>
    <td>1</td>
    <td>2</td>
    <td>3</td>
    <td>4</td>
    <td>5</td>
    <td>6</td>
    <td>7</td>
    <td>8</td>
    <td>9</td>
    <td>10</td>
    <td>11</td>
    <td>12</td>
</tr>
${seats.map((seat, rowIndex)=> {
  return `
  <tr>
    <td class="row">${seat.row}</td>
    ${seat.seat.map((item)=> {
      const isVipRow = rowIndex < 3 ? 'vip-row' : '';
      return `<td><input type="checkbox" class="seats chair ${isVipRow}"  value=${seat.row + item}></td>`
    } ).join('')}
  </tr>
  `
}).join('')}
</table>
<div class="price-info">
<div class="example">
<span><input type="checkbox" class=" chair vip-row"><span class="vip">VIP</span></span>
<span><input type="checkbox" class=" chair"><span class="vip">Regular</span></span>
</div>
<p class="checked-seats">Selected Seats Are: <span id="values"></span></p>
<p class="price">Total Price: <span id="count">0</span></p>
<a href="#" class="button">Buy Ticket</a>
</div>
</div>
`


document.addEventListener('DOMContentLoaded', function() {
  const checkboxes = document.querySelectorAll('.seats');

  function updateCount() {
      const checkedCheckboxes = [...checkboxes].filter(checkbox => checkbox.checked);
      const checkedCount = checkedCheckboxes.length;
      const checkedValues = checkedCheckboxes.map(checkbox => checkbox.value).join(', ');
      document.getElementById('count').textContent = (checkedCount * 16.99).toFixed(2) + "$";
      document.getElementById('values').textContent = checkedValues;
  }

  checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', updateCount);
  });
});