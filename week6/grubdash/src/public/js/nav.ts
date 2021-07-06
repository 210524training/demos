/* eslint-disable @typescript-eslint/no-unused-vars */
const body = document.getElementsByTagName('body')[0];

const navbar = `<nav class="navbar navbar-nav navbar-expand-md navbar-dark bg-dark">
  <div id="nav" class="container-fluid">
  </div>
</nav>`;

const navbarContent = `<a class="navbar-brand" href="/">GrubDash</a>
<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
  <span class="navbar-toggler-icon"></span>
</button>
<div class="collapse navbar-collapse" id="navbarSupportedContent">
  <ul class="navbar-nav me-auto mb-2 mb-lg-0">
    <li class="nav-item">
      <a class="nav-link" href="login">Login</a>
    </li>
  </ul>
</div>`;

body.innerHTML = navbar + body.innerHTML;

const divFluid = document.getElementById('nav');
if(divFluid) {
  divFluid.innerHTML = navbarContent + divFluid.innerHTML;
} else {
  console.error('Something went wrong, could not attach Navbar content');
}

async function sendLogin() {
  const usernameInput = document.getElementById('usernameInput') as HTMLInputElement;
  const passwordInput = document.getElementById('passwordInput') as HTMLInputElement;

  if(!usernameInput || !passwordInput) {
    console.log('Failed to send login request, due to missing inputs!');
    return;
  }

  const response = await fetch('http://localhost:3000/login', {
    body: JSON.stringify({
      username: usernameInput.value,
      password: passwordInput.value,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  });

  const data = await response.json();

  console.log(data);

  sessionStorage.setItem('user', JSON.stringify(data));

  window.location.href = 'http://localhost:3000';
}
