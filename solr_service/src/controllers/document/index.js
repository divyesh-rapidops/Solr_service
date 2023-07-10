const useCase = require('../../use-cases');

const makeAddDocumentAction = require('./add-document');
const addDocumentAction = makeAddDocumentAction({
    addDocument: useCase.document.addDocument
});
const makeDeleteDocumentAction = require('./delete-document');
const deleteDocumentAction = makeDeleteDocumentAction({
    deleteDocument: useCase.document.deleteDocument
})
const makeUpdateDocumentAction = require('./update-document');
const updateDocumentAction = makeUpdateDocumentAction({
    updateDocument: useCase.document.updateDocument
})
const makeGetDocumentAction = require('./get-document');
const getDocumentAction = makeGetDocumentAction({
    getDocument: useCase.document.getDocument
})



module.exports = {
    addDocumentAction,
    getDocumentAction,
    updateDocumentAction,
    deleteDocumentAction,
}