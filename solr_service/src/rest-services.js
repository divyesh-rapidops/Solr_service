const express = require('express');
const router = express.Router();
const controllers = require('./controllers');


function init() {
    router.post('/solr/adddocument', controllers.addDocumentAction);
    router.patch('/solr/updatedocument', controllers.updateDocumentAction);
    router.delete('/solr/deletedocument/:docid', controllers.deleteDocumentAction);
    router.get('/solr/getdocument', controllers.getDocumentAction);
}
init();
module.exports = router;