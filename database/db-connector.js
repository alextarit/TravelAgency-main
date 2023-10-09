// Get an instance of mysql we can use in the app
var mysql = require('mysql')

// Create a 'connection pool' using the provided credentials
var pool = mysql.createPool({
    connectionLimit : 10,
    host            : 'MacBook-Air-ADTarletskiy.local',
    user            : 'root',
    password        : '123456789',
    database        : 'travel-agency'
})

// Export it for use in our applicaiton
module.exports.pool = pool;