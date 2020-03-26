console.log("game info"); //for debugging //extendtion only let login user can see review button(post review and delete this user's review)

const API_BASE='/api/v1';
const game=document.getElementById('game');
const gameId=window.location.pathname.split('/')[2]; //has question
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
		<div class="container" id="${review._id}">
			<div class="row">
				<div class="col-6 col-md-4" id="${review.user}">
					<h5>review.user</h5>
					${date.getMonth()}-${date.getDate()}-${date.getFullYear()}
				</div>
				<div class="col-12 col-md-8">
					<article>
					<h5>${review.title}</h5>
					<p>
					${review.content}
					</p>
					</article>
					
				</div>
			</div>

		</div>

		`;
	}).join('');
}



