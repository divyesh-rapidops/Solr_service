module.exports = function makeSolrDbMethod({ axios, baseURL, DatabaseError }) {
    return Object.freeze({
        addDocument,
        updateDocument,
        getDocument,
        deleteDocument,

    });

    async function addDocument({ docs }) {
        console.log("addData", docs);
        await axios.post(`${baseURL}/upldate?commit=true`, docs, {
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
            const response = await axios.post(baseURL, updateData, {
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
            const response = await axios.post(`${baseURL}/update?commit=true`, { delete: { id: id } }, {
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
            const response = await axios.get(`${baseURL}/select`, { params });

            console.log('Query results:');
            console.log(response.data.response.docs);
            return response.data.response.docs;
        } catch (error) {
            console.error('Error querying data:', error.message);
            throw new DatabaseError(error);

        }
    }

}
