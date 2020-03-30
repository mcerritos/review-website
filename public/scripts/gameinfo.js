console.log("game info"); //for debugging //extendtion only let login user can see review button(post review and delete this user's review)

const API_BASE='/api/v1';
const game=document.getElementById('game');
const gameId=window.location.pathname.split('/')[2]; //has question
let reviewForm ;
console.log('game id is:',gameId);

/////////////////////////////////session test
let session;
fetch('/api/v1/verify', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'credentials': 'include', // This must be included in all API requests until user logs out
    },

  })
    .then((stream) => stream.json())
    .then((res)=>{
    	session = res;
    })
    .catch((err) => console.log(err));




//////////////////////////////

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
  if(session.status===200){
  	const review = document.querySelector(".mb-5");
  	newReview=`<section class="container mb-5">
      <form id="newReview" class="row">
        <div class="col-md-6 offset-md-3">
          <h4 class="mb-4">New review</h4>
          <div class="form-group">
            <label for="title">Title</label>
            <input id="title" type="text" name="title" class="form-control form-control-lg" />
          </div>
          <div class="form-group">
            <label for="content">Content</label>
            <textarea id="content" name="content" class="form-control form-control-lg" rows="10"></textarea>
          </div>
          <button type="submit" class="btn btn-primary float-right">Add New review</button>
        </div>
      </form>
    </section>`;
  review.insertAdjacentHTML('beforeend', newReview);
  reviewForm= document.getElementById('newReview');
  addReview();
  }
}

function getGameTemplate(game){ //not post review button yet 
	return `
	<div id="${game._id}" class="col-md-8 offset-md-2" >
		<h2>${game.name}</h2>
		<img src="${game.image}" class="img-fluid img-thumbnail"  />
		<section>
			${getReviewTemplates(game.reviews)}
		</section>
	</div>

	`;
}

function getReviewTemplates(reviews){
	
	return reviews.map((review)=>{ //user and edit button  not avalible yet
		console.log(review);
    console.log(typeof review.user);
    let date=new Date(review.updatedAt)
		if(session.status===200){
	if(review.user===session.currentUser._id){
		return`
		<div class="container" >
			<div class="row">
				<div class="col-6 col-md-4" id="${review.user}">
					<h5>${session.currentUser.username}</h5>
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

		`;}else{
            return`
    <div class="container" >
      <div class="row">
        <div class="col-6 col-md-4" id="${review.user}">
          <h5>${(review.user).substring(0,3)}*</h5>
          ${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}
        </div>
        <div class="col-12 col-md-8" id="${review._id}">
          <article >
          <h5>${review.title}</h5>
          <p>
          ${review.content}
          </p>
          </article>
          
        </div>
      </div>

    </div>

    `;

    }
	}else{
			return`
		<div class="container" >
			<div class="row">
				<div class="col-6 col-md-4" id="${review.user}">
					<h5>${(review.user).substring(0,3)}*</h5>
					${date.getMonth()+1}-${date.getDate()}-${date.getFullYear()}
				</div>
				<div class="col-12 col-md-8" id="${review._id}">
					<article >
					<h5>${review.title}</h5>
					<p>
					${review.content}
					</p>
					</article>
					
				</div>
			</div>

		</div>

		`;
		}
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
      //getGame();
      window.location = `/games/${gameId}`;
    })
    .catch((err) => console.log(err));
}

//add new review
function addReview(){
reviewForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const title = document.getElementById('title');
  const content = document.getElementById('content');

  const newReview = {
    title: title.value,
    content: content.value,
    user:session.currentUser._id
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
        window.location = `/games/${gameId}`;
      }
    })
    .catch((err) => console.log(err));
});
}