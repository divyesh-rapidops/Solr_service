module.exports = function makeGetDocumentAction({
    getDocument
}) {
    return async function getDocumentAction(req, res) {
        try {
            console.log("getDocumentAction", req.body)
            const filterQuery = req.body.filterQuery || "";
            const startDoc = req.body.startDoc || 0;
            const rows = req.body.rows || 10
            const fieldList = req.body.fieldList || "";
            const defaultField = req.body.defaultField || "";
            const order = req.body.order || "";
            const querystring = req.body.querystring;
            const responseFormate = req.body.responseFormate;
            const result = await getDocument({ querystring, filterQuery, startDoc, rows, fieldList, defaultField, order, responseFormate });
            res.status(200).json({
                message: "data is successfully get !",
                data: result
            });
        }
        catch (e) {
            res.status(500).send(`error: ${e}`);
        }

    }
}