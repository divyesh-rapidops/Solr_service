module.exports = function makeCreateCollection({
    axios
}) {
    return async function createCollection({
        collectionName, numShards, replicationFactor
    }) {
        const url = 'http://localhost:8983/solr/admin/collections';

        const data = {
            action: 'CREATE',
            name: collectionName,
            numShards: numShards,
            replicationFactor: replicationFactor
        };

        try {
            const response = await axios.post(url, data);
            console.log(`Solr collection ${collectionName} created successfully.`);
            console.log(response.data);
        } catch (error) {
            console.error('Error creating Solr collection:', error);
        }

    }
}