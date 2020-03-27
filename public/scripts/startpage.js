console.log("Is this thing on...?");
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
