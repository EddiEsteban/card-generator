const orm = require('./orm');

function router( app ){

    app.get('/', async (req, res)=>{
        res.render('index', {example: 'hello'})
    })

    app.get('/api/cards/:search?', async function(req, res) {
        // const search = req.params.search ? { due: req.params.due } : ''
        console.log( `[GET] getting list, search=${req.params.search}`)
        const list = await orm.getCard( req.params.search )

        res.send( list )
    })
    // addCard
    app.post('/api/cards', async function(req, res) {
        console.log( '[POST] we received this data:', req.body.name, req.body.desc, req.body.location, req.body.deckId, req.body.attributes )
        const saveResult = await orm.addCard( req.body.name, req.body.desc, req.body.location, req.body.deckId, req.body.attributes )
        console.log( `... insertId: ${saveResult.insertId} ` )

        res.send( { status: true, insertId: saveResult.insertId, message: 'Card inserted successfully' } )
    })
    // deleteCard
    app.delete('/api/cards/:id', async function(req, res) {
        const cardId = req.params.id
        console.log( `[DELETE] id=${cardId}` )
        const deleteResult = await orm.deleteCard( cardId )
        console.log( '... ', deleteResult )

        res.send( { status: true, message: 'Deleted successfully' } )
    })

    app.put('/api/cards', async function(req, res) {
        console.log( '[PUT] we received this data:', req.body )
        if( !req.body.id ) {
            res.status(404).send( { message: 'Invalid id' } )
        }

        const saveResult = await orm.updateTask( req.body.id, req.body.priority, req.body.info, req.body.due )
        console.log( '... ', saveResult )
        res.send( { status: true, message: 'Updated successfully' } )
    })

}

module.exports = router