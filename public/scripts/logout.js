console.log('Logout JS...');


fetch('/api/v1/verify', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'credentials': 'include', // This must be included in all API requests until user logs out
    },

  })
    .then((stream) => stream.json())
    .then(res=>getSession(res))
    .catch((err) => console.log(err));


function getSession(session){

	if(session.status===200){
	console.log(session.currentUser);
	console.log(session.currentUser.username);
	console.log(session.currentUser._id);
	$('#login').empty();
	$('#login').html(`Hi ${session.currentUser.username} &nbsp <button id="logoutbutton" class="btn btn-outline-primary btn-light" type="submit">Logout</button>`);
	 const btn = document.getElementById('logoutbutton');
  btn.addEventListener('click', handleLogoutSubmit);
  }


}
function handleLogoutSubmit(event){
	event.preventDefault();
	fetch('/api/v1/logout', {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'credentials': 'include', // This must be included in all API requests until user logs out
    },
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