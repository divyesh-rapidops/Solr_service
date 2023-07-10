module.exports = function makeDeleteDocument({
    Joi,
    deleteDocumentDb,
    ValidationError
}) {
    return async function deleteDocument({
        id
    }) {
        validateInputData({ id })
        const result = await deleteDocumentDb({ id });
        return result;
    }
    function validateInputData({ id }) {
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
}