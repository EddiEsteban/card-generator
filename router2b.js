const orm = require('./orm');

function router( app ){

    //getCard
    app.get('/api/cards/:search?', async function(req, res) {
        // const search = req.params.search ? { due: req.params.due } : ''
        console.log( `[GET] getting list, search=${req.params.search}`)
        const list = await orm.getCard( req.params.search )

        res.send( list )
    })
    // saveCard
    app.post('/api/cards', async function(req, res) {
        console.log( '[POST] we received this data:', req.body )
        const saveResult = await orm.saveCard( req.body )
        console.log( `... insertId: ${saveResult.insertId} ` )

        res.send( { status: true, insertId: saveResult.insertId, message: 'Saved successfully' } )
    });
//fil's assist ends

//Doug and saquib attempt begins

    // addCard
    app.post('/api/cards', async function(req, res) {
    console.log( '[POST] we received this data:', req.body.name, req.body.desc, req.body.location, req.body.deckId, req.body.attributes )
    const saveResult = await orm.addCard( req.body.name, req.body.desc, req.body.location, req.body.deckId, req.body.attributes )
    console.log( `... insertId: ${saveResult.insertId} ` )
    res.send( { status: true, insertId: saveResult.insertId, message: 'Card inserted successfully' } )
    })

    
    //deleteCard 
    app.delete('/api/cards/:id', async function(req, res) {
        const cardId = req.params.id
        console.log( `[DELETE] id=${cardId}` )
        const deleteResult = await orm.deleteCard( cardId )
        console.log( '... ', deleteResult )
        res.send( { status: true, message: 'Deleted successfully' } )

    
    //updateCard
    app.put('/api/cards', async function(req, res) {
        console.log( '[PUT] we received this data:', req.body )
        if( !req.body.id ) {
            res.status(404).send( { message: 'Invalid id' } )
        }
        const saveResult = await orm.saveCard( req.body.name, req.body.desc, req.body.location, req.body.deckId, req.body.attributes )
        console.log( '... ', saveResult )
        res.send( { status: true, message: 'Card Updated successfully' } )
    })

    // addDeck
    app.post('/api/decks', async function(req, res) {
        console.log( '[POST] we received this data:', req.body.name )
        const saveResult = await orm.addDeck( req.body.name )
        console.log( `... insertId: ${saveResult.insertId} ` )
        res.send( { status: true, insertId: saveResult.insertId, message: 'Deck inserted successfully' } )
    })

    // saveDeck
    app.put('/api/decks', async function(req, res) {
        console.log( '[PUT] we received this data:', req.body )
        if( !req.body.deckId ) {
            res.status(404).send( { message: 'Invalid id' } )
        }
        const saveResult = await orm.saveDeck( req.body.deckId, req.body.deckName )
        console.log( '... ', saveResult )
        res.send( { status: true, message: 'Deck Updated successfully' } )
    })

    // deleteDeck
    app.delete('/api/decks/:id', async function(req, res) {
        const deckId = req.params.id
        console.log( `[DELETE] id=${deckId}` )
        const deleteResult = await orm.deleteDeck( deckId )
        console.log( '... ', deleteResult )
        res.send( { status: true, message: 'Deck Deleted successfully' } )
    })
    
}

module.exports = router
