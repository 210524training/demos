async function fetchJson() {
  const data = await fetch('http://localhost:3000/json');
  const obj = await data.json();

  console.log(obj);
}

fetchJson();
