module.exports = function makeGetDocument({
    getDocumentDb,
    Joi,
    ValidationError
}) {
    return async function getDocument({
        querystring, filterQuery, startDoc, rows, fieldList, defaultField, order, responseFormate
    }) {
        validationInputData({ querystring, filterQuery, startDoc, rows, fieldList, defaultField, order, responseFormate })
        return await getDocumentDb({ querystring, filterQuery, startDoc, rows, fieldList, defaultField, order, responseFormate });
    }
    function validationInputData({ querystring, filterQuery, startDoc, rows, fieldList, defaultField, order, responseFormate }) {
        console.log("querystring");
        const schema = Joi.object({
            querystring: Joi.string().required(),
            filterQuery: Joi.string().optional(),
            startDoc: Joi.number().integer().optional(),
            rows: Joi.number().integer().optional(),
            fieldList: Joi.string().optional(),
            defaultField: Joi.string().optional(),
            order: Joi.string().valid('asc', 'desc').optional(),
            responseFormate: Joi.string().required(),
        });
        const { error } = schema.validate({ querystring, filterQuery, startDoc, rows, fieldList, defaultField, order, responseFormate });
        if (error) {
            console.log(error.details[0].message)
            throw new ValidationError(error.details[0].message);
        }
    }
}