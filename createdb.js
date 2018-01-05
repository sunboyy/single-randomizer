var MongoClient = require('mongodb').MongoClient;
var config = require('./config');

MongoClient.connect(config.database_url, (err, conn) => {
    if (err) throw err;
    db = conn.db('newyear2018');

    db.createCollection('player', (err2, res) => {
        if (err2) throw err2;
        console.log("Collection player created");
        conn.close();
    });

});
