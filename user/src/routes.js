const express = require('express');
const multer = require('multer');

const authMiddleware = require('./middlewares/auth');
const uploadConfig = require('./config/upload');
const UserController = require('./controllers/UserController');
const AuthController = require('./controllers/AuthController');

const routes = express.Router();
const upload = multer(uploadConfig);

routes.post('/auth', AuthController.authenticate);

routes.get('/users', UserController.index);
routes.post('/users', upload.single('avatar'), UserController.create);
routes.put('/users/:index', authMiddleware, upload.single('avatar'), UserController.update);
routes.delete('/users/:index', authMiddleware, UserController.delete);

routes.get('/users/:index', authMiddleware, UserController.show);

module.exports = routes;