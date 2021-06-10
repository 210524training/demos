const input = document.getElementById('input');

const button = document.getElementById('btn');
button.addEventListener('click', asyncFetch);

const output = document.getElementById('output');


function ajax() {
  // STEP 1: Create an XMLHttpRequest Object

  const xhr = new XMLHttpRequest();

  /**
   * AJAX Requests have a property called the readyState
   * It defines the current state of our request
   * There are 5 states (0 through 4)
   * 
   * 0: UNSENT - The request is not initialized, and the open() method has yet to be called
   * 1: OPENED - The open() method has been called
   * 2: HEADERS_RECEIVED - The request has received a response, and the headers have been received, as well as the status
   * 3: LOADING - Currently downloading the response. The responseText property contains the actual response
   * 4: DONE - Operation is complete
   */

  // STEP 2: Define a callback function, which will be called every time the state of the AJAX request changes

  // We can't actually use an arrow function here, because we need the value of "this"
  xhr.onreadystatechange = function() {
    if(this.readyState === 4 && this.status === 200) {
      let data = JSON.parse(this.responseText);

      // console.log(data);

      displayPokemon(data);
    }
  }

  // STEP 3: Open the XMLHttpRequest
  // Define the HTTP Verb and URL
  xhr.open("GET", "https://pokeapi.co/api/v2/pokemon/" + input.value);

  // STEP 4: Send the Request
  xhr.send();
}

function ajaxFetch() {
  // fetch is a built-in function for most (all) browsers
  // It is basically an abstraction around AJAX

  // fetch returns a Promise of a Response object
  // This Response object doesn't directly have the data, but it has methods to parse the data

  fetch("https://pokeapi.co/api/v2/pokemon/" + input.value, {
    // You can optionally provide some parameters here
    // credentials: 'include',
    // This credentials field does several things
    // One of the important aspects is that the browser will not attach cookies
    // without having credentials set to 'include'
    // mode: 'no-cors'
  })
  .then( (res) => res.json())
  .then( (data) => {
    displayPokemon(data)
  })
  .catch( (err) => {
    console.log(err);
  });
}

async function asyncFetch() {
  try {
    let res = await fetch("https://pokeapi.co/api/v2/pokemon/" + input.value);

    let data = await res.json();
  
    displayPokemon(data);
  } catch(error) {
    console.log(error);
  }
}

function displayPokemon(data) {
  const default_url = data.sprites.front_default;
  const shiny_url = data.sprites.front_shiny;

  const pokeDiv = document.createElement('div');

  const info = document.createElement('p');

  info.innerHTML = "Name: " + data.name + "<br />ID: " + data.id;

  const default_image = document.createElement('img');
  default_image.setAttribute('src', default_url);
  default_image.setAttribute('style', "height: 200px; width: 200px");

  const shiny_image = document.createElement('img');
  shiny_image.setAttribute('src', shiny_url);
  shiny_image.setAttribute('style', "height: 200px; width: 200px");

  pokeDiv.append(info);
  pokeDiv.append(default_image);
  pokeDiv.append(shiny_image);

  output.append(pokeDiv);
  output.append(document.createElement('hr'));
}