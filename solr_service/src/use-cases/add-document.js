module.exports = function makeAddDocument({
    Joi,
    addDocumentDb,
    checkCollection,
    ValidationError,
    createCollection
}) {
    return async function addDocument({
        docs, collectionName

    }) {
        validateCollectionName(collectionName);
        validateInputData({ docs });
        const isCollectionExist = await checkCollection({ collectionName });
        if (!isCollectionExist) {
            await createCollection({ docs, collectionName, numShards: 1, replicationFactor: 1, config: "_default" });
        }
        const result = await addDocumentDb({ docs, collectionName })
        return result;
    }
    function validateCollectionName({ collectionName }) {
        const schema = Joi.object({
            collectionName: Joi.string().required(),
        });
        const { error } = schema.validate({ collectionName });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }

    function validateInputData({ docs }) {
        for (let doc of docs) {
            console.log("doc", doc)
            let keys = Object.keys(doc);
            console.log("keys", keys)
            for (let key of keys) {
                console.log("key", key)
                if (key == 'id') {
                    validateId({ id: doc[key] })
                }
                else if (key == 'Name') {
                    validateName({ name: doc[key] })
                }
                else if (key == 'city') {
                    validateCity({ city: doc[key] })
                }
            }
        }
    }


    function validateId({ id }) {
        console.log("id validateId", id);
        const schema = Joi.object({
            id: Joi.string().guid({ version: 'uuidv4' }).required(),
        });
        const { error } = schema.validate({ id });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }

    function validateCity({ city }) {
        const schema = Joi.object({
            city: Joi.string().required(),
        });
        const { error } = schema.validate({ city });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }

    function validateName({ name }) {
        console.log("name");
        const schema = Joi.object({
            name: Joi.string().min(2).required(),
        });
        const { error } = schema.validate({ name });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}





