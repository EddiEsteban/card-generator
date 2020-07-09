const db = require('./connection')
const fs = require( 'fs' )
const dbFile = './medialist.data'

function getCard(id){
    return db.query( 'SELECT * FROM cards WHERE id=?', id)
}

async function getCards(){
    return await db.query('SELECT * FROM cards')
}

async function getCardsforDeck(deckId){
    return await db.query('SELECT * FROM cards where deck_id=?', deckId)
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

/*
function setCardAttributes( id, attributes={} ){
    console.log( ' setting attributes: ', id, attributes )
    console.log('stringify: ', JSON.stringify(attributes))
    // may need to tweak this due to JSON
    return db.query( 'UPDATE cards SET attributes=? WHERE id=? ', [JSON.stringify(attributes), id] )
}
*/

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
    const queryString = `UPDATE cards SET name='${name}', description='${desc}', img='${location}', deck_id=${deckId}, attributes='${JSON.stringify(attributes)}' WHERE id=${id}`
    // console.log(queryString)
    return db.query( queryString )
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

function saveDeck( id, name ){
    console.log( ' updating deck name: ', name )
    console.log( ' updating deck id: ', id )
    return db.query( 'UPDATE decks SET name=? WHERE id=? ', [ name , id ] )
}

function getDeck( id ){
    return db.query( 'SELECT * FROM decks WHERE id=? ', id )
}

async function getDecks(){
    return await db.query('SELECT * FROM decks')
}

async function getDeckswithImg(){
    // let queryString = 'select distinct d.id, d.name, c.img from decks d, cards c where d.id=c.deck_id '+
    // 'union select d.id, d.name, "assets/img/blank_deck.jpg" from decks d, cards c where d.id!=c.deck_id '+
    // 'union select d.id, d.name, "assets/img/blank_deck.jpg" from decks d, cards c where c.deck_id=null';
    let queryString = 'select distinct id, name, "assets/img/blank_deck.jpg" as img from decks'
    return await db.query(queryString)
}

async function updateCardsDeck(deckId){
    return await db.query('UPDATE cards SET deck_id=null WHERE deck_id = ?', deckId)
}

function getMedia(){
    console.log( `[getMedia] ${__dirname}` )
    if( !fs.existsSync( dbFile) ){
        return []
    }

    // split by the new-lines
    mediaList = fs.readFileSync( dbFile, 'utf8' ).split('\n')
    return mediaList
}

function saveMedia( mediaData ){
    fs.appendFileSync( dbFile, `${mediaData.imageUrl}\n` )
}

module.exports = {
    getCard,
    getCards,
    getCardsforDeck,
    getCardName,
    getCardLocation,
    getCardDesc,
    saveCard,
    addDeck,
    deleteCard,
    addCard,
    deleteDeck,
    saveDeck,
    getDeck,
    getDecks,
    getDeckswithImg,
    updateCardsDeck,
    getMedia,
    saveMedia
}