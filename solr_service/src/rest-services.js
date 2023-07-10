const express = require('express');
const router = express.Router();
const controllers = require('./controllers');


function init() {
    router.post('/solr/createCollection', controllers.collectionController.createCollectionAction);
    router.post('/solr/adddocument', controllers.documentController.addDocumentAction);
    router.patch('/solr/updatedocument', controllers.documentController.updateDocumentAction);
    router.delete('/solr/deletedocument/:docid', controllers.documentController.deleteDocumentAction);
    router.get('/solr/getdocument', controllers.documentController.getDocumentAction);
}
init();
module.exports = router;