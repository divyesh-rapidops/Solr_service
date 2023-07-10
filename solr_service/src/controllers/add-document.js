module.exports = function makeAddDocumentAction({
    addDocument,
    createCollection
}) {
    return async function addDocumentAction(req, res) {
        try {
            const docs = req.body;
            const collectionName = res.body.language;
            const result = await addDocument({ docs, collectionName })
            res.status(201).json({
                message: "data is added",
                result: result
            })
        }
        catch (e) {
            console.log(`error:${e}`);
            res.status(e.httpStatusCode).send(e);
        }

    }
}