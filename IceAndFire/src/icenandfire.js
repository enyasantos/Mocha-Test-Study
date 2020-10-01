
const api = require('./api');

module.exports = {
    async infoCharacter(id) {
        try {
            const response = await api.get(`/characters/${id}`);
            const { name, gender, culture, died, titles, tvSeries } = response.data;
            const infoCharacter = {
                name,
                gender,
                culture,
                died,
                titles, 
                tvSeries
            }
            return infoCharacter;
        } catch(err) {
            return 'Error'
        }
    },

    async infoBook(id) {
        try {
            const response = await api.get(`/books/${id}`);
            const { name, authors, numberOfPages, released } = response.data;
            const infoBook = {
                name, 
                authors, 
                numberOfPages, 
                released
            }
            return infoBook;
        } catch(err) {
            return 'Error'
        }
    },
}