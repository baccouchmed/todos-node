const express = require('express');
const {
    getList,
    createOne,
    readOne,
    updateOne,
    deleteOne,
} = require('./features.controller');

const featuresRoute = express.Router();

// ****** Get list ******** //
featuresRoute.get( '/', getList);
// ****** Create one ******** //
featuresRoute.post('/', createOne);
// ****** Read one ******** //
featuresRoute.get('/:id', readOne);
// ****** Update one ******** //
featuresRoute.patch('/:id', updateOne);
// ****** Delete one ******** //
featuresRoute.delete('/:id', deleteOne);

module.exports = featuresRoute;
