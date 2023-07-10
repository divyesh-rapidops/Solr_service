const makeAddDocumentAction = require('./add-document');
const useCase = require('../use-cases');

const makeCreateCollection = require('./create-collection');
const createCollection = makeCreateCollection({
    axios,
    Joi,
    ValidationError
})

const addDocumentAction = makeAddDocumentAction({
    createCollection,
    addDocument: useCase.addDocument
});
const makeDeleteDocumentAction = require('./delete-document');
const deleteDocumentAction = makeDeleteDocumentAction({
    deleteDocument: useCase.deleteDocument
})
const makeUpdateDocumentAction = require('./update-document');
const updateDocumentAction = makeUpdateDocumentAction({
    updateDocument: useCase.updateDocument
})
const makeGetDocumentAction = require('./get-document');
const getDocumentAction = makeGetDocumentAction({
    getDocument: useCase.getDocument
})



module.exports = {
    addDocumentAction,
    getDocumentAction,
    updateDocumentAction,
    deleteDocumentAction
}