const db = require('./connection')

function getCard( criteria={} ){
    console.log('getting card: ', criteria)
    return db.query( 'SELECT * FROM cards '+( criteria ? 'WHERE ? ' : '' ), criteria )
}

function getCardName( id ){
    console.log('getting card name')
    return db.query( 'SELECT name FROM cards WHERE id=? ', id )
}

function getCardLocation( id ){
    return db.query( 'SELECT img FROM cards WHERE id=? ', id )
}

function getCardDesc( id ){
    return db.query( 'SELECT description FROM cards WHERE id=? ', [ id ] )
}

function setCardAttributes( id, attributes={} ){
    console.log( ' setting attributes: ', id, attributes )
    // may need to tweak this due to JSON
    return db.query( 'UPDATE cards SET attributes=? WHERE id=? ', [attributes, id] )
}

function addCard( name, desc, location, deckId, attributes ){
    console.log( 'inserting card data: ', name, desc, location, deckId, attributes )
    // return db.query( 'INSERT INTO cards (name, img, desc, deck_id, attributes) VALUES (?,?,?,?,?)', [name, location, desc, deckId, JSON.stringify(attributes)])
    const queryString = `INSERT INTO cards (name, img, description, deck_id, attributes) VALUES ('${name}','${location}','${desc}',${deckId},'${JSON.stringify(attributes)}')`
    // console.log(queryString)
    return db.query( queryString)
    // return db.query( `INSERT INTO cards (name, img, desc, deck_id, attributes) VALUES ('${name}','${location}','${desc}',${deckId},'${jsonData}')`)
}

function saveCard( id, name, desc, location, deckId, attributes ){
    console.log( ' saving card: ', id )
    return db.query( 'UPDATE cards SET ? WHERE id=? ', [{ name, desc, location, deckId, attributes }, id ] )
}

function deleteCard( id ){
    console.log( ' deleting card: ', id )
    return db.query( 'DELETE FROM cards WHERE id=?', [ id ] )
}

function addDeck( name ){
    console.log( ' creating card: ', name )
    return db.query( 'INSERT INTO decks (name) VALUES (?)', [ name ] )
}

function deleteDeck( id ){
    console.log( ' deleting deck: ', id )
    return db.query( 'DELETE FROM decks WHERE id=?', [ id ] )
}

function updateDeck( id, name ){
    console.log( ' updating deck: ', name )
    return db.query( 'UPDATE decks SET ? WHERE id=? ', [{ name }, id ] )
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
    getCard, getCardName, getCardLocation, getCardDesc, setCardAttributes, saveCard, addDeck, deleteCard, addCard, deleteDeck, updateDeck
}