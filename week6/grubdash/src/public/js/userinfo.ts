const data = sessionStorage.getItem('user');
if(data) {
  const currentUser = JSON.parse(data);

  if(currentUser) {
    console.log(JSON.stringify(currentUser));
  } else {
    console.log('Not Logged in!');
  }
} else {
  console.log('Not Logged in!');
}
