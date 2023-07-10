module.exports = function makeCreateCollection({
    addCollectionDb,
    createCollectionDb,
    Joi,
    ValidationError
}) {
    return async function createCollection({
        collectionName, numShards, replicationFactor, configset
    }) {
        console.log("createCollection", collectionName, numShards, replicationFactor, configset)
        validateInputData({ collectionName, numShards, replicationFactor, configset });
        const res = await createCollectionDb({ collectionName, numShards, replicationFactor, configset });
        await addCollectionDb({ collectionName });

    }

    function validateInputData({ collectionName, numShards, replicationFactor, configset }) {
        const schema = Joi.object({
            collectionName: Joi.string().required(),
            numShards: Joi.number().integer().min(1).required(),
            replicationFactor: Joi.number().integer().min(1).required(),
            configset: Joi.string().required()
        });
        const { error } = schema.validate({ collectionName, numShards, replicationFactor, configset });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}
