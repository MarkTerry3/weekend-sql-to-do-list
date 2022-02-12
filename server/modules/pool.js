// lets us make a pool, so we can connect to the database and send queries
const pg = require('pg');


// database pool options
let poolOptions = {
    database: 'weekend-to-do-app',
    host: 'localhost',
    max: 10,
    // database on port 5432
    port: 5432,
    // timeout after 30 seconds of no connection
    idleTimeoutMillis: 30_000,
}

// create a pool instance for the koala database
const toDoPool = new pg.Pool(poolOptions);

// give an indicator when connected to database
toDoPool.on('connect', () => {
    console.log('Connected to weekend-to-do-list Database');
})

// handle database errors
toDoPool.on('error', (err) => {
    console.error('Error with Tasks Database:', err);
})


module.exports = toDoPool;

