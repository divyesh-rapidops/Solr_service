module.exports = function makeUpdateDocument({
    updateDocumentDb,
    Joi
}) {
    return async function updateDocument({
        updateData
    }) {

        validateUpdateData(updateData);
        updateData = formateUpdateObject(updateData);
        const result = await updateDocumentDb({ updateData });
        return updateData;
    }
    function validateUpdateData(updateData) {
        for (let doc of updateData) {
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
    function formateUpdateObject(updateData) {
        for (let i = 0; i < updateData.length; i++) {
            for (let key in updateData[i]) {
                if (key != 'id') {
                    updateData[i][key] = {
                        set: updateData[i][key]
                    }
                }
            }
        }
        return updateData;
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

