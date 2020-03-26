console.log("game info"); //for debugging //extendtion only let login user can see review button(post review and delete this user's review)

const API_BASE='/api/v1';
const game=document.getElementById('game');
const gameId=window.location.pathname.split('/')[2]; //has question
const reviewForm = document.getElementById('newReview');
console.log('game id is:',gameId);

//get the game
function getGame(){
	fetch(`${API_BASE}/games/${gameId}`)
	.then((stream)=>stream.json())
	.then(res=>render(res))
	.catch((err)=>console.log(err));
}

getGame();


function render(gameObj) {
  console.log('Rendering game', gameObj); //debugging output
  const gameTemplate = getGameTemplate(gameObj);
  game.innerHTML = '';
  game.insertAdjacentHTML('beforeend', gameTemplate);
}

function getGameTemplate(game){ //not post review button yet 
	return `
	<div id="${game._id}" class="col-md-8 offset-md-2" >
		<h2>${game.name}</h2>
		<img src="${game.image}" class="img-fluid mb-3" width="100%" />
		<section>
			${getReviewTemplates(game.reviews)}
		</section>
	</div>

	`;
}

function getReviewTemplates(reviews){
	
	return reviews.map((review)=>{ //user and edit button  not avalible yet
		let date=new Date(review.updatedAt)
		return`
		<div class="container" >
			<div class="row">
				<div class="col-6 col-md-4" id="${review.user}">
					<h5>review.user</h5>
					${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}
				</div>
				<div class="col-12 col-md-8" id="${review._id}">
					<article >
					<h5>${review.title}</h5>
					<p>
					${review.content}
					</p>
					<a href="/games/${gameId}/reviews/${review._id}/edit" class="btn btn-sm btn-info float-right" type="button">Edit review</a>
          			<button id="deleteBtn" class="btn btn-sm btn-danger delete-review float-right mr-2" type="button">Delete review</button>
					</article>
					
				</div>
			</div>

		</div>

		`;
	}).join('');
}

game.addEventListener('click', (event) => {
  if (event.target.classList.contains('delete-review')) {
    deleteReview(event);
  }
});

function deleteReview(event){
	const reviewId=event.target.parentNode.parentNode.id;
	console.log(reviewId); //for debugging

	fetch(`${API_BASE}/games/${gameId}/reviews/${reviewId}`,{
		method:'DELETE',
	})
	.then((stream) => stream.json())
    .then((res) => {
      console.log(res);
      getGame();
    })
    .catch((err) => console.log(err));
}

//add new review
reviewForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title');
  const content = document.getElementById('content');

  const newReview = {
    title: title.value,
    content: content.value,
  };

  console.log('Submit', newReview);


  window.location = `/games/${gameId}`;

  fetch(`/api/v1/games/${gameId}/reviews`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newReview),
  })
    .then((stream) => stream.json())
    .then((res) => {
      console.log(res);
      if (res.status === 201) {
        window.location = `/gamess/${gameId}`;
      }
    })
    .catch((err) => console.log(err));
});