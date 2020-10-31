const bcrypt = require('bcrypt');

const UsersModel = require('../database/models/UsersModel');
const generateToken = require('./utils/generateToken');

module.exports = {
    async authenticate(req, res) {
        const { email, password } = req.body;

        const user  = await UsersModel.findOne({email: email});

        if(!user)
            return res.status(400).json({ message: "Usuário não encontrado." });

        const match = await bcrypt.compare(password, user.password);

        if(!match)
            return res.status(400).json({ message: "Senha inválida." });

        return res.status(200).send({ 
            user, 
            token: generateToken({ id: user._id }),
        })
    }
}