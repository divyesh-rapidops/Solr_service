const useCase = require('../../use-cases');

const makeCreateCollectionAction = require('../collection/create-collection');
const createCollectionAction = makeCreateCollectionAction({
    createCollection: useCase.collection.createCollection,
})

module.exports = {
    createCollectionAction
}