
const gameId = window.location.pathname.split('/')[2];
const reviewId = window.location.pathname.split('/')[4];
const reviewForm = document.getElementById('editReview');
console.log('game ID = ', gameId); //for debugging



// GET game
fetch(`/api/v1/games/${gameId}/reviews/${reviewId}`)
    .then((stream) => stream.json())
    .then(res => updateForm(res))
    .catch((err) => console.log(err));



// Update Form Values
function updateForm(review) {
  console.log('review = ', review); //for debugging
  const titleInput = document.getElementById('title');
  const contentInput = document.getElementById('content');

  titleInput.value = review.title;
  contentInput.value = review.content;
}


reviewForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title');
  const content = document.getElementById('content');

  const updatedReview = {
    title: title.value,
    content: content.value,
  };

  console.log('Submit', updatedReview);

  // Redirect Back To citiesShow Page

  fetch(`/api/v1/games/${gameId}/reviews/${reviewId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updatedReview),
  })
    .then((stream) => stream.json())
    .then((res) => {
      // console.log(res);
      window.location = `/games/${gameId}`;
    })
    .catch((err) => console.log(err));
});


// Search bar
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
