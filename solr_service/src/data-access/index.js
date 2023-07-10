const makeSolrDbMethod = require('./solr-data');
const axios = require('axios');
const config = require('../config');
const exceptions = require('../exceptions');
const makeCollectionDbMethod = require('./collection.db');
const solrDbMethod = makeSolrDbMethod({
    baseURL: config.baseURL,
    axios,
    DatabaseError: exceptions.DatabaseError
})
const collectionDbMethod = makeCollectionDbMethod({
    DatabaseError: exceptions.DatabaseError
})
module.exports = { solrDbMethod, collectionDbMethod };
