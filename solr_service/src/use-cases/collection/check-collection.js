module.exports = function makeCheckCollection({
    checkCollectionDb,
    Joi
}) {
    return async function checkCollection({
        collectionName
    }) {
        console.log("checkCollection usecase", collectionName)
        validateInputData({ collectionName })
        const length = await checkCollectionDb({ collectionName });
        console.log("result of checkcollectionname", length);
        let isCollectionExist = false;
        if (length)
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