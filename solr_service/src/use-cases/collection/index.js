const dbMethods = require('../../data-access');
const Joi = require('joi');
const exceptions = require('../../exceptions');

const makeCheckCollection = require('./check-collection');
const checkCollection = makeCheckCollection({
    checkCollectionDb: dbMethods.collectionDbMethod.checkCollection,
    Joi,
    ValidationError: exceptions.ValidationError
})

const makeCreateCollection = require('./create-collection');
const createCollection = makeCreateCollection({
    createCollectionDb: dbMethods.solrDbMethod.createCollection,
    Joi,
    ValidationError: exceptions.ValidationError,
    addCollectionDb: dbMethods.collectionDbMethod.addCollection
});


module.exports = {
    checkCollection,
    createCollection
}