const mongo = require('mongodb').MongoClient;
const dsn = 'mongodb://localhost:27017';
const colName = 'history';

async function findInCollection(dsn, colName, criteria, projection, limit) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);
    const res = await col.find(criteria, projection).limit(limit).toArray();

    await client.close();

    return res;
}

const chat = {
    getHistory: async function(req, res, next) {
        try {
            let result = await findInCollection(dsn, colName, {}, {}, 30);
            let chatArr = [];

            console.log(result)
            result.forEach(function(item) {
                chatArr.push(item.message);
            });
            return res.status(200).json({
                data: chatArr
            });
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                errors: {
                    status: 500,
                    title: "Database error",
                    detail: err.message
                }
            });
        }
    },
};

module.exports = chat;
