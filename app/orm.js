const db = require('./connection')

function getList( criteria={} ){
    return db.query( 'SELECT * FROM cards '+( criteria ? 'WHERE ? ' : '' ), criteria )
}



function insertTask( priority, info, due ){
    if( priority === '' ) {
        priority = 'primary'
    }
    // no due? set to 7 days from now
    if( due === '' ) {
        due = moment().add(7, 'days').format('YYYY-MM-DD' )
    }
    console.log( ' inserting task data: ', { priority, info, due } )
    return db.query( 'INSERT INTO cards SET ? ',
        { priority, info, due } )
}

function updateTask( id, priority, info, due ){
    return db.query( 'UPDATE cards SET ? WHERE id=?',
        [ { priority, info, due }, id ] )
}

function deleteTask( id ){
    return db.query( 'DELETE FROM cards WHERE id=?', [ id ] )
}

module.exports = {
    getList, insertTask, updateTask, deleteTask
}