const orm = require('./orm');

function router( app ){
    app.get('/api/cards/:search?', async function(req, res) {
        // const search = req.params.search ? { due: req.params.due } : ''
        console.log( `[GET] getting list, search=${req.params.search}`)
        const list = await orm.getCard( req.params.search )

        res.send( list )
    })
    // function saveCard( id, name, desc, location, deckId, attributes ){
    app.post('/api/cards', async function(req, res) {
        console.log( '[POST] we received this data:', req.body )
        const saveResult = await orm.saveCard( req.body )
        console.log( `... insertId: ${saveResult.insertId} ` )

        res.send( { status: true, insertId: saveResult.insertId, message: 'Saved successfully' } )
    });

    app.put('/api/tasks', async function(req, res) {
        console.log( '[PUT] we received this data:', req.body )
        if( !req.body.id ) {
            res.status(404).send( { message: 'Invalid id' } )
        }

        const saveResult = await orm.updateTask( req.body.id, req.body.priority, req.body.info, req.body.due )
        console.log( '... ', saveResult )
        res.send( { status: true, message: 'Updated successfully' } )
    });

    app.delete('/api/tasks/:id', async function(req, res) {
        const taskId = req.params.id
        console.log( `[DELETE] id=${taskId}` )
        const deleteResult = await orm.deleteTask( taskId )
        console.log( '... ', deleteResult )

        res.send( { status: true, message: 'Deleted successfully' } )
    });
}

module.exports = router