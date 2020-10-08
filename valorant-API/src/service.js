const express = require('express');
const server = express();
const router = express.Router();
const fs = require('fs');
require('dotenv/config');

server.use(express.json({extended: true}));
server.use(router);

const readFile = () => {
    const content = fs.readFileSync(`${__dirname}/data/agents.json`, 'utf-8');
    return JSON.parse(content);
}

const writeFile = (content) => {
    const updateFile = JSON.stringify(content);
    fs.writeFileSync(`${__dirname}/data/agents.json`, updateFile, 'utf-8');
}

router.use('/image', express.static(`${__dirname}/../public`));

router.get('/agents', (request, response) => {
    const content = readFile()
    response.send(content);
});

router.post('/agents', (request, response) => {
    try {
        const {
            body: { name, nationality, role, skills, image },
        } = request; 
        const imageURL = `${process.env.URL}/image/agents/${image}`;
        const currentContent = readFile();
        const id = Math.random().toString(32).substr(2, 9);
        currentContent.push({ 
            id, 
            name, 
            nationality, 
            role, 
            skills, 
            image:  imageURL});
        writeFile(currentContent);
        return response.status(201).send({ id, name, nationality, role, skills, image: imageURL });
    } catch (err) {
        return response.status(400).send();
    }
});

router.put('/agents/:id', (request, response) => {
    try {
        const id = request.params.id;

        const { name, nationality, role, skills, image } = request.body;
        const imageURL = `${process.env.URL}/image/agents/${image}`;

        const currentContent = readFile();
        const selectedIndex = currentContent.findIndex((item) => item.id === id);

        const { 
            id: cId,
            name: cName, 
            nationality: cNationality, 
            role: cRole, 
            skills: cSkills, 
            image: cImage } 
        = currentContent[selectedIndex]

        const newObject = {
            id: cId,
            name: name ? name : cName,
            nationality: nationality ? nationality : cNationality,
            role: role ? role : cRole,
            skills: skills ? skills : cSkills,
            image: image ? imageURL : cImage,
        }

        currentContent[selectedIndex] = newObject;

        writeFile(currentContent)

        return response.status(200).send(newObject);
    } catch (err) {
        return response.status(400).send();
    }
    
});

router.delete('/agents/:id', (request, response) => {
    try {
        const id = request.params.id;
        const currentContent = readFile();
        const selectedIndex = currentContent.findIndex((item) => item.id === id);
        currentContent.splice(selectedIndex, 1)
        writeFile(currentContent);
        return response.status(200).json({ message: 'Deletado com sucesso.'});
    } catch (err) {
        return response.status(400).send();
    }
});

router.get('/agent/:name', (request, response) => {
    try {
        const name = request.params.name;
        const currentContent = readFile();
        const selectedItem = currentContent.find((item) => item.name === name);
        return response.status(200).send(selectedItem);
    } catch (err) {
        return response.status(400).send();
    }
});

router.get('/agents/:role', (request, response) => {
    try {
        const role = request.params.role;
        const currentContent = readFile();
        const selectedItens = currentContent.filter(
            (value) => value.role === role
        );
        return response.status(200).send(selectedItens);
    } catch (err) {
        return response.status(400).send();
    }
});

server.listen(process.env.PORT, () => console.log(`API is running in port ${process.env.PORT}`));

module.exports = server;
