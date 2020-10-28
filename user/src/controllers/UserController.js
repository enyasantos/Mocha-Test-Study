const bcrypt = require('bcrypt');

const generateToken = require('./utils/generateToken');

const UsersModel = require('../database/models/UsersModel');
const deleteFile = require('./utils/deleteFile');

module.exports =  {
    async index(req, res){
        try {
            const users = await UsersModel.find();
            return res.json(users);
        } catch {
            return res.status(400).json({ message: 'Erro ao carregar dados dos usuários.'});
        }
    },
    async delete(req, res){
        try {
            const id = req.params.index;

            const user = await UsersModel.findOne({_id: id});

            if(!user)
                return res.status(404).json({ message: 'Usuário não encontrado.'});

            const path = `${__dirname}/../../public/uploads/${user.avatar}`;

            if(deleteFile.deleteFile(path))
                return res.status(500).json({ message: 'Erro ao deletar avatar do usuário.'});
    
            await UsersModel.deleteOne({ _id: id});
                    
            return res.status(200).json({ message: 'Membro deletado.'});
        } catch {
            return res.status(400).json({ message: 'Erro ao deletar dados do usuário.'});
        }
    },
    async create(req, res){
        try {
            const {
                name,
                birth_date,
                email,
                password
            } = req.body;

            const userEmail = await UsersModel.findOne({email});

            if(userEmail)
                return res.status(409).json({ message: 'Email já cadastrado'});

            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt);

            const requestImages = req.file;
            const avatar = requestImages.filename;

            const user = await UsersModel.create({
                avatar,
                name,
                birth_date,
                email,
                password: hash
            });

            return res.status(201).json({ 
                user, 
                message: 'Usuário cadastrado com sucesso.',
                token: generateToken({ id: user._id }),
            });

        } catch {
            return res.status(400).json({ message: 'Erro ao cadastrar usuário.'});
        }
    },
    async update(req, res){
        try {
            const {
                name,
                birth_date,
                email,
                password
            } = req.body;

            const id = req.params.index;

            const user = await UsersModel.findOne({_id: id});

            if(!user)
                return res.status(404).json({ message: 'Usuário não encontrado.'});

            let avatar = user.avatar;

            const requestImages = req.file;

            if(requestImages) {
                avatar = requestImages.filename;
                const path = `${__dirname}/../../public/uploads/${user.avatar}`;

                if(deleteFile.deleteFile(path))
                    return res.status(500).json({ message: 'Erro ao atualizar avatar do usuário.'});
            }

            const salt = bcrypt.genSaltSync();
            const hash = bcrypt.hashSync(password, salt);

            await UsersModel.findOneAndUpdate(
                {_id: id},
                {
                    avatar: avatar ? avatar : user.avatar,
                    name,
                    birth_date,
                    email,
                    password: hash
                },
                {useFindAndModify: false}
            );

            return res.status(200).json({ message: 'Usuário atualizado com sucesso.'});

        } catch (err) {
            console.log(err)
            return res.status(400).json({ message: 'Erro ao atualizar usuário.'});
        }
    },
    async show(req, res){
        try {
            const id = req.params.index;

            const user = await UsersModel.findOne({_id: id});

            if(!user)
                return res.status(404).json({ message: 'Usuário não encontrado.'});

            return res.status(200).json(user);
        } catch {
            return res.status(400).json({ message: 'Erro ao carregar dados do usuário.'});
        }
    },
}