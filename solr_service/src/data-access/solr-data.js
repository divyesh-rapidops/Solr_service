module.exports = function makeSolrDbMethod({ axios, baseURL, DatabaseError }) {
    return Object.freeze({
        addDocument,
        updateDocument,
        getDocument,
        deleteDocument,
        createCollection
    });

    async function addDocument({ docs, collectionName }) {
        console.log("addData", docs);
        await axios.post(`${baseURL}/${collectionName}/update?commit=true`, docs, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log('Documents added successfully');
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error adding documents:', error);
                throw new DatabaseError(error);
            });
    }

    async function updateDocument({
        updateData
    }) {

        try {
            const response = await axios.post(`${baseURL}/${collectionName}/update?commit=true`, updateData, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Document updated successfully');
            console.log(response.data);
        } catch (error) {
            console.error('Error updating document:', error.message);
            throw new DatabaseError(error);
        }
    }
    async function deleteDocument({
        id
    }) {
        console.log("documentid", id);

        const data = [
            { delete: { id: id } }
        ];

        try {
            const response = await axios.post(`${baseURL}/${collectionName}/update?commit=true`, { delete: { id: id } }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log('Document deleted successfully');
            console.log(response.data);
        } catch (error) {
            console.error('Error deleting document:', error.message);
            throw new DatabaseError(error);

        }
    }

    async function getDocument({
        querystring, filterQuery, startDoc, rows, fieldList, defaultField, order, responseFormate
    }) {
        console.log("qerystirng dataaccess getdocumtn", querystring)

        const params = {
            q: querystring,
            rows: rows, // Number of rows to retrieve,
            fq: filterQuery,
            fl: fieldList, // Fields to retrieve
            wt: responseFormate, // Response format,
            sort: `${defaultField} ${order}`,
            start: startDoc
        };

        try {
            const response = await axios.get(`${baseURL}/${collectionName}/select`, { params });
            console.log('Query results:');
            console.log(response.data.response.docs);
            return response.data.response.docs;
        } catch (error) {
            console.error('Error querying data:', error.message);
            throw new DatabaseError(error);

        }
    }
    async function createCollection({
        collectionName, numShards, replicationFactor, configset
    }) {
        console.log("createcollectionDb", collectionName, numShards, replicationFactor, configset)
        const data = {
            "create": {
                name: collectionName,
                numShards: numShards,
                replicationFactor: replicationFactor,
                config: configset
            }
        };

        try {
            const response = await axios.post(`http://localhost:8983/api/collections`, data, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log(`Solr collection ${collectionName} created successfully.`);
            console.log(response.data);
            return response;
        } catch (error) {
            console.error('Error creating Solr collection:', error);
            throw new DatabaseError(error);
        }
    }

}
