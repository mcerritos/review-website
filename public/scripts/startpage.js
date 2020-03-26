console.log("Is this thing on...?");
const searchBar = document.querySelector('#search');

searchBar.addEventListener( 'submit', (event) => {
	event.preventDefault();
	let keywords = document.getElementById('bar').value;
	let words = keywords.split(" ");

	$.ajax({
		method: "GET",
		url: `http://localhost:4000/api/v1/games/search/${words}`,
		contentType: 'application/JSON',
		data: JSON.stringify({"keys" : words}),
		success: function (response) {
			console.log(response);
		},
		error: function (err) {
			console.log(err);
		}
	});
});