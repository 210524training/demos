import axios from 'axios';

// You can create an axios configuration for specific remote APIs with baseline
// configuration options
// These can generally be overridden when sending individual requests

console.log(process.env.REACT_APP_ENVIRONMENT);

const grubdashClient = axios.create({
  baseURL: process.env.REACT_APP_ENVIRONMENT === 'local' ? 'http://localhost:4000' : process.env.GRUBDASH_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default grubdashClient;
