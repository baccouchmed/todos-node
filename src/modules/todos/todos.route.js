const express = require('express');
const {
    getList,
    createOne,
    readOne,
    updateOne,
    deleteOne,
} = require('./todos.controller');

const todosRoute = express.Router();

// ****** Get list ******** //
todosRoute.get( '/', getList);
// ****** Create one ******** //
todosRoute.post('/', createOne);
// ****** Read one ******** //
todosRoute.get('/:id', readOne);
// ****** Update one ******** //
todosRoute.patch('/:id', updateOne);
// ****** Delete one ******** //
todosRoute.delete('/:id', deleteOne);

module.exports = todosRoute;
