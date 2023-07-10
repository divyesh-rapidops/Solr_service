
module.exports = function makeUpdateDocumentAction({
    updateDocument
}) {
    return async function updateDocumentAction(req, res) {
        try {
            const updateData = req.body;
            const result = await updateDocument({ updateData });
            res.send(result);
        }
        catch (e) {
            res.send(`error: ${e}`);
        }
    }
}