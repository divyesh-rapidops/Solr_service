const dbMethods = require('../../data-access');
const Joi = require('joi');
const exceptions = require('../../exceptions');
const collectionUsecase = require('../collection');

const makeAddDocument = require('./add-document');
const addDocument = makeAddDocument({
    Joi,
    addDocumentDb: dbMethods.solrDbMethod.addDocument,
    checkCollection: collectionUsecase.checkCollection,
    createCollection: collectionUsecase.createCollection,
    ValidationError: exceptions.ValidationError,
});
const makeGetDocument = require('./get-document');
const getDocument = makeGetDocument({
    Joi,
    getDocumentDb: dbMethods.solrDbMethod.getDocument,
    ValidationError: exceptions.ValidationError
})
const makeDeleteDocument = require('./delete-document');
const deleteDocument = makeDeleteDocument({
    Joi,
    deleteDocumentDb: dbMethods.solrDbMethod.deleteDocument,
    ValidationError: exceptions.ValidationError
});
const makeUpdateDocument = require('./update-document');
const updateDocument = makeUpdateDocument({
    Joi,
    updateDocumentDb: dbMethods.solrDbMethod.updateDocument,
    ValidationError: exceptions.ValidationError
});


module.exports = {
    addDocument,
    getDocument,
    deleteDocument,
    updateDocument,
}