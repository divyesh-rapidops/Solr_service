const makeSolrDbMethod = require('./solr-data');
const axios = require('axios');
const config = require('../config');
const exceptions = require('../exceptions');
const solrDbMethod = makeSolrDbMethod({
    baseURL: config.baseURL,
    axios,
    DatabaseError: exceptions.DatabaseError
})
module.exports = { solrDbMethod };
