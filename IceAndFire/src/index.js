const iceandfire = require('./iceandfire');

const id = 291

iceandfire.infoCharacter(id)
.then (response => {
    console.log(response.name)
})

iceandfire.infoBook(2)
.then(response => {
    console.log(response)
})
