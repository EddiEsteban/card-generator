const db = require('./connection')
const fs = require('fs')
const dbFile = './medialist.data'

function getCard(id) {
    return db.query('SELECT * FROM cards WHERE id=?', id)
}

async function getCards() {
    return await db.query('SELECT * FROM cards')
}

async function getCardsforDeck(deckId) {
    return await db.query('SELECT * FROM cards where deck_id=?', deckId)
}

function getCardName(id) {
    console.log('getting card name')
    return db.query('SELECT name FROM cards WHERE id=? ', id)
}

function getCardLocation(id) {
    return db.query('SELECT img FROM cards WHERE id=? ', id)
}

function getCardDesc(id) {
    return db.query('SELECT description FROM cards WHERE id=? ', [id])
}

function addCard(name, desc, location, deckId, attributes) {
    console.log('inserting card data: ', name, desc, location, deckId, attributes)
    const queryString = `INSERT INTO cards (name, img, description, deck_id, attributes) VALUES ('${name}','${location}','${desc}',${deckId},'${JSON.stringify(attributes)}')`
    return db.query(queryString)
}

function saveCard(id, name, desc, location, deckId, attributes) {
    console.log(' saving card: ', id)
    const queryString = `UPDATE cards SET name='${name}', description='${desc}', img='${location}', deck_id=${deckId}, attributes='${JSON.stringify(attributes)}' WHERE id=${id}`
    return db.query(queryString)
}

function deleteCard(id) {
    console.log(' deleting card: ', id)
    return db.query('DELETE FROM cards WHERE id=?', [id])
}

function addDeck(name) {
    console.log(' creating card: ', name)
    return db.query('INSERT INTO decks (name) VALUES (?)', [name])
}

function deleteDeck(id) {
    console.log(' deleting deck: ', id)
    return db.query('DELETE FROM decks WHERE id=?', [id])
}

function saveDeck(id, name) {
    console.log(' updating deck id: %s, name: %s', id, name)
    return db.query('UPDATE decks SET name=? WHERE id=? ', [name, id])
}

function getDeck(id) {
    return db.query('SELECT * FROM decks WHERE id=? ', id)
}

async function getDecks() {
    return await db.query('SELECT * FROM decks')
}

async function getDeckswithImg() {
    // getting list of decks and adding deck img
    let queryString = 'select distinct id, name, "assets/img/blank_deck.jpg" as img from decks'
    return await db.query(queryString)
}

async function updateCardsDeck(deckId) {
    return await db.query('UPDATE cards SET deck_id=null WHERE deck_id = ?', deckId)
}

function getMedia() {
    console.log(`[getMedia] ${__dirname}`)
    if (!fs.existsSync(dbFile)) {
        return []
    }

    // split by the new-lines
    mediaList = fs.readFileSync(dbFile, 'utf8').split('\n')
    return mediaList
}

function saveMedia(mediaData) {
    fs.appendFileSync(dbFile, `${mediaData.imageUrl}\n`)
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