console.log('Game Index JS...');
const API_BASE = '/api/v1';
const cities = document.getElementById('games');

//get data
fetch(`${API_BASE}/games`)
	.then((stream)=>stream.json())
	.then(res=>render(res))
	.catch((err)=>console.log(err));


//render
function render(gamesArray){
	console.log(gamesArray); //just for debugging 
}