import axios from 'axios';

// You can create an axios configuration for specific remote APIs with baseline
// configuration options
// These can generally be overridden when sending individual requests
const pokeClient = axios.create({
  baseURL: 'https://pokeapi.co/api/v2',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default pokeClient;
