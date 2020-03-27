console.log('Login JS...');
const btn = document.getElementById('loginbutton');


// Submit Event Listener
btn.addEventListener('click', handleLoginSubmit);

// Handle Submit
function handleLoginSubmit(event) {
  event.preventDefault();
  const username = document.getElementById('username').value;
  const password = document.getElementById('psw').value;

  const userData = {
    username,
    password,
  };
  
  console.log('Submitting User Data ---->', userData);

  fetch('/api/v1/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'credentials': 'include', // This must be included in all API requests until user logs out
    },
    body: JSON.stringify(userData),
  })
    .then((stream) => stream.json())
    .then((res) => {
      if (res.status === 200) {
        window.location = '/';
      } else {
        console.log(res);
      }
    })
    .catch((err) => console.log(err));
}