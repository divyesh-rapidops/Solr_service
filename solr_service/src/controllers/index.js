const makeAddDocumentAction = require('./add-document');
const useCase = require('../use-cases');

const makeCreateCollectionAction = require('./create-collection');
const createCollectionAction = makeCreateCollectionAction({
    createCollection: useCase.createCollection,
})

const addDocumentAction = makeAddDocumentAction({
    createCollection: useCase.createCollection,
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
    deleteDocumentAction,
    createCollectionAction
}