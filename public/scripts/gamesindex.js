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
	let date=new Date(game.date)
	return `
<div class="container">
  <div class="row" id="${game._id}">
    <div class="col-sm">
      <img src="${game.img}" alt="${game.name}" />
    </div>
    <div class="col-sm">
     <h2> <a href="/games/${game._id}">${game.name}</a></h2>
     <h5>${date.getMonth()}-${date.getDate()}-${date.getFullYear()}</h5>
    </div>
    <div class="col-sm">
      Has ${game.reviews.length} ${game.reviews.length === 1 ? ' review' : ' reviews'} 
    </div>
  </div>
</div>


	`
}