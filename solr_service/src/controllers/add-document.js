module.exports = function makeAddDocumentAction({
    addDocument,
    createCollection
}) {
    return async function addDocumentAction(req, res) {
        try {
            const docs = req.body;
            const collectionName = res.body.language;
            const language = ['en_us', 'en_uk', 'en_au', 'en_nz', 'en_in', 'en_ca'];
            if (!language.includes(collectionName)) {
                createCollection({ collectionName });
            }
            const result = await addDocument({ docs, collectionName })
            res.status(201).json({
                message: "data is added",
                result: result
            })
        }
        catch (e) {
            console.log(`error:${e}`);
            res.status(500).send(e);
        }

    }
}