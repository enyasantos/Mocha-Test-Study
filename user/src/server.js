const express = require('express');
const mongoose = require('mongoose');

const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://mainAdmin:admin@cluster0-hrefk.mongodb.net/profiles?retryWrites=true&w=majority',{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
});

app.use(express.json());
app.use(routes);

app.listen(3001, () => console.log('🔥 Servidor rodando na porta 3001'));