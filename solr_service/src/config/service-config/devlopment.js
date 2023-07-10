const config = {
    baseURL: 'http://localhost:8983/solr',
    database: 'language',
    cockroach: {
        host: 'localhost',
        user: 'divyesh',
        password: 'divyesh',
        port: 26257,
        database: 'language',
        dialect: 'postgres'
    }
}
module.exports = config;