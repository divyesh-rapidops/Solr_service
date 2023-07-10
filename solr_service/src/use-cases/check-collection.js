module.exports = function makeCheckCollection({
    checkCollectionDb
}) {
    return async function checkCollection({
        collectionName
    }) {
        validateInputData({ collectionName })
        const result = await checkCollectionDb({ collectionName });
        let isCollectionExist = false;
        if (result.length)
            isCollectionExist = true;

        return isCollectionExist;
    }

    function validateInputData({ collectionName }) {
        console.log("name");
        const schema = Joi.object({
            collectionName: Joi.string().min(2).required(),
        });
        const { error } = schema.validate({ collectionName });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}