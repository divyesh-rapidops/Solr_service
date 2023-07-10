module.exports = function makeDeleteDocumentAction({
    deleteDocument
}) {
    return async function deleteDocumentAction(req, res) {
        try {
            const id = req.params.docid;
            const result = await deleteDocument({ id });
            res.send(result);
        }
        catch (e) {
            res.send(`error: ${e}`);
        }

    }
}