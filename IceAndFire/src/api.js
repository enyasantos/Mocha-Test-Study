const axios = require('axios');

const api = axios.create({
    baseURL: 'https://anapioficeandfire.com/api',
});

module.exports = api;