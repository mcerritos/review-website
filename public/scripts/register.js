console.log('Register JS...');
const btn = document.querySelector(".btnSubmit");

// Submit Event Listener
btn.addEventListener('click', handleSignupSubmit);

// Handle Submit
function handleSignupSubmit(event) {
  event.preventDefault();


  const username = document.getElementById('uname').value;
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const userData = {
    username,
    email,
    password,
  };
  console.log(userData);

  // SUBMIT DATA TO SERVER
  console.log('Submitting User Data ---->', userData);

  fetch('/api/v1/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((stream) => stream.json())
    .then((res) => {
      if (res.status === 201) {
        console.log(res);
        window.location = '/';
      } else {
        console.log(res);
      }
    })
    .catch((err) => console.log(err));
};

// search bar functionality
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