"use strict";

const mongo = require("mongodb").MongoClient;
const dsn = 'mongodb://localhost:27017';
const colName = 'history';


// Do it.
resetCollection(dsn, colName)
    .catch(err => console.log(err));

async function resetCollection(dsn, colName, doc) {
    const client  = await mongo.connect(dsn);
    const db = await client.db();
    const col = await db.collection(colName);

    await col.deleteMany();

    await client.close();
}
