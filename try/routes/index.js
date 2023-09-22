const express = require('express');
const routes = express.Router();

const baseController = require('../controllers/index');

routes.get('/', baseController.getName);

module.exports = routes;