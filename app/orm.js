const db = require('./connection')

function getCard( criteria={} ){
    return db.query( 'SELECT * FROM cards '+( criteria ? 'WHERE ? ' : '' ), criteria )
}

function getName( id ){
    console.log(`getting card name`)
    return db.query( 'SELECT name FROM cards WHERE id=? ', id )
}

function getImgLocation( id ){
    return db.query( 'SELECT img FROM cards WHERE id=? ', id )
}

function getDescription( id ){
    return db.query( 'SELECT description FROM cards WHERE id=? ', [ id ] )
}

function setAttributes( id, attributes={} ){
    // may need to tweak this due to JSON
    return db.query( 'UPDATE cards SET attributes=? WHERE id=? ', [attributes, id] )
}

function saveCard( id, name, desc, location, deck_id, attributes ){
    return db.query( 'UPDATE cards SET ? WHERE id=? ', 
        [{ name, desc, location, deck_id, attributes }, id ] )
}

function addDeck( name ){
    return db.query( 'INSERT INTO decks (name) VALUES (?)', [ name ] )
}

function deleteCard( id ){
    return db.query( 'DELETE FROM cards WHERE id=?', [ id ] )
}

function addCard( name, desc, location, deck_id, attributes){
    console.log( ' inserting card data: ', { name, desc, location, deck_id, attributes } )
    return db.query( 'INSERT INTO cards (name, desc, location, deck_id, attributes) VALUES (?,?,?,?,?)', [name, desc, location, deck_id, attributes])
}

/*
status
getName - done
getImg - done
getDesc - done
setAttributes - done (may need to test due to JSON)
saveCard
viewCard
addToDeck
    createDeck

View Cards
viewCard/getCard - done
editCard
deleteCard - done

deleteAttribute

*/

module.exports = {
    getCard, getName, getImgLocation, getDescription, setAttributes, saveCard, addDeck, deleteCard, addCard
}