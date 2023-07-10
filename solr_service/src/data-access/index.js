const axios = require('axios');
const config = require('../config');
const exceptions = require('../exceptions');
const { Pool } = require('pg');
const pool = new Pool({
    host: config.cockroach.host,
    user: config.cockroach.user,
    password: config.cockroach.password,
    port: config.cockroach.port,
    database: config.cockroach.database,
    ssl: {
        rejectUnauthorized: false
    },
    // isSSL:config.cockroach.ssl
})


pool.connect()
    .then(() => console.log(`cockroachDb connected on port ${config.cockroach.port}`))
    .catch((e) => console.error(`Error while connecting cockroachDb!:${e}`))


const makeSolrDbMethod = require('./solr-data');
const solrDbMethod = makeSolrDbMethod({
    baseURL: config.baseURL,
    axios,
    DatabaseError: exceptions.DatabaseError
})
const makeCollectionDbMethod = require('./collection.db');
const collectionDbMethod = makeCollectionDbMethod({
    pool,
    DatabaseError: exceptions.DatabaseError,
    database: config.cockroach.database
})
module.exports = { solrDbMethod, collectionDbMethod };
