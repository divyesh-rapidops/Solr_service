module.exports = function makeCreateCollectionAction({
    createCollection
}) {
    return async function createCollectionAction(req, res) {
        try {
            const collectionName = req.body.collectionName;
            const numShards = req.body.numShards;
            const replicationFactor = req.body.replicationFactor;
            const configset = req.body.configset;
            console.log("createCollection", collectionName, numShards, replicationFactor, configset, req.body)
            const result = await createCollection({ collectionName, numShards, replicationFactor, configset });
            res.status(201).json({
                message: "collction is created",
                result: result
            })
            res.end();
        } catch (error) {
            console.log("error", error);
            res.status(error.httpStatusCode).send(error);
        }

    }
}