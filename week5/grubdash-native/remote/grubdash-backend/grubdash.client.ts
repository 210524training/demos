import axios from 'axios';
// import env from 'dotenv';
// You can create an axios configuration for specific remote APIs with baseline
// configuration options
// These can generally be overridden when sending individual requests

// env.config({});

console.log(process.env.REACT_APP_ENVIRONMENT);
console.log(process.env.REACT_APP_GRUBDASH_URL);

const grubdashClient = axios.create({
  // baseURL: process.env.REACT_APP_ENVIRONMENT === 'local' ? 'http://3.239.29.226:4000' : process.env.REACT_APP_GRUBDASH_URL,
  baseURL: 'http://3.239.29.226:4000',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

export default grubdashClient;
