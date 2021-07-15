import dotenv from 'dotenv';

dotenv.config({});

const host = process.env.DB_URL;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

const connectionString = `postgresql://${username}:${password}@${host}`;

export default connectionString;
