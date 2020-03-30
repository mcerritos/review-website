console.log('Game Index JS...');
const API_BASE = '/api/v1';
const games = document.getElementById('games');

//get data
fetch(`${API_BASE}/games`)
	.then((stream)=>stream.json())
	.then(res=>render(res))
	.catch((err)=>console.log(err));


//render
function render(gamesArray){
	console.log(gamesArray); //just for debugging 
	const gameTemplates=gamesArray.map((game)=>getGameTemplate(game)).join('');
	games.insertAdjacentHTML('beforeend',gameTemplates);
}


function getGameTemplate(game){
	console.log('getGameTemplate'); //just for debugging
  let genres = "";
  for (let type of game.genre) {
    genres += ` ${type},`;
  };
  genres = genres.slice(0, -1);
	let date=new Date(game.date)
	return `
<div class="container">
  <div class="row gamerow" id="${game._id}">
    <div class="col-sm">
      <img src="${game.image}" class="img-thumbnail" alt="${game.name}" />
    </div>
    <div class="col-sm">
     <h2> <a href="/games/${game._id}">${game.name}</a></h2>
     <h5>${date.getMonth()}-${date.getDate()}-${date.getFullYear()}</h5>
     <h5>Genre: ${genres} </h5>
    </div>
    <div class="col-sm">
      Has ${game.reviews.length} ${game.reviews.length === 1 ? ' review' : ' reviews'} 
    </div>
  </div>
</div>


	`
}

//search bar functionality
const searchBar = document.querySelector('#search');

searchBar.addEventListener( 'submit', (event) => {
  event.preventDefault();
  let keywords = document.getElementById('bar').value;
  // let words = keywords.split(" ");

  $.ajax({
    method: "POST",
    url: `http://localhost:4000/api/v1/games/search/${keywords}`,
    success: function (response) {
      transport(response);
    },
    error: function (err) {
      console.log(err);
    }
  });
});

function transport(game){
  console.log(game);
  let result = game[0]._id;
  console.log(result);
  console.log(`http://localhost:4000/api/v1/games/${result}`);
  window.location.href = `http://localhost:4000/games/${result}`;
};