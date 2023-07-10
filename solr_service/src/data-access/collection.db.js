const Table_Name = 'language';
module.exports = function makeCollectionDbMethod({
    pool,
    database,
    DatabaseError
}) {
    return Object.freeze({
        addLanguage,
        deleteLanguage,
        updatedLanguage,
        getLanguage,
        checkCollection
    })
    async function addLanguage({
        collectionName
    }) {
        try {
            const result = await pool.query(`insert into ${database}.${Table_Name} (name) values ($1) returning id`, [collectionName]);
            return result;
        }
        catch (e) {
            throw new DatabaseError(e);
        }
    }
    async function deleteLanguage({
        id
    }) {
        try {
            const result = await pool.query(`delete from ${database}.${Table_Name}  where id = $1 returning id`, [id]);
            return result;
        }
        catch (e) {
            throw new DatabaseError(e);
        }

    }
    async function updatedLanguage({
        collectionName, id
    }) {
        try {
            const result = await pool.query(`update ${database}.${Table_Name} set name = $1 where id = $2`[collectionName, id]);
            return result;
        }
        catch (e) {
            throw new DatabaseError(e);
        }

    }
    async function getLanguage({

    }) {
        try {
            const result = await pool.query(`select * from ${database}.${Table_Name}`);
            return result;
        }
        catch (e) {
            throw new DatabaseError(e);
        }

    }
    async function checkCollection({
        collectionName
    }) {
        try {
            const result = await pool.query(`select * from ${database}.${Table_Name} where name = $1`, [collectionName])
            return result.rows.length;
        }
        catch (e) {
            throw new DatabaseError(e);
        }
    }
}