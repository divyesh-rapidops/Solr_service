module.exports = function makeCreateCollection({
    axios,
    addCollectionDb
}) {
    return async function createCollection({
        collectionName, numShards, replicationFactor, configset
    }) {
        const url = 'http://localhost:8983/solr/admin/collections';
        validateInputData(collectionName, numShards, replicationFactor, configset);

        const data = {
            action: 'CREATE',
            name: collectionName,
            numShards: numShards,
            replicationFactor: replicationFactor,
            config: configset
        };

        try {
            const response = await axios.post(url, data);
            console.log(`Solr collection ${collectionName} created successfully.`);
            await addCollectionDb({ collectionName });
            console.log(response.data);
        } catch (error) {
            console.error('Error creating Solr collection:', error);
        }
    }

    function validateInputData({ collectionName, numShards, replicationFactor }) {
        const schema = Joi.object({
            collectionName: Joi.string().required(),
            numShards: Joi.number().integer().min(1).required(),
            replicationFactor: Joi.number().integer().min(1).required()
        });
        const { error } = schema.validate({ collectionName, numShards, replicationFactor });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}
