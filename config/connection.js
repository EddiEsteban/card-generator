const mysql = require('mysql2')

class Database {
    constructor( config ) {
        this.connection = mysql.createConnection( config )
        console.log('Connected to the database')
    }
    query( sql, args ) {
        return new Promise( ( resolve, reject ) => {
            this.connection.query( sql, args, ( err, rows ) => {
                if ( err ) {
                    return reject( err )
                }
                resolve( rows )
            } )
        } )
    }
    close() {
        return new Promise( ( resolve, reject ) => {
            this.connection.end( err => {
                if ( err ) {
                    return reject( err )
                }
                resolve()
            } )
        } )
    }
}

let db

if (process.env.JAWSDB_URL){
    db = new Database(process.env.JAWSDB_URL)
} else {
    db = new Database({
        host: 'localhost',
        port: 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PWD,
        database: process.env.DB_NAME,
        insecureAuth : true
    });
}

module.exports = db