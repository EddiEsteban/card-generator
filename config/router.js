const orm = require('./orm');
// hard-coded settings (should be in the .env)
const UPLOAD_PATH = process.env.UPLOAD_PATH || 'public/uploads/'
const uploadResizer = require( './uploadResizer' )
const upload = require('multer')({ dest: UPLOAD_PATH })
const publicPath = '../'
function router( app ){


    app.get('/api/cards', async (req, res)=>{
        // console.log('[GET] getting all cards')
        let cards = await orm.getCards()
        res.send(cards)
    })

    app.get('/api/cards/:id', async (req, res)=>{
        const cardId = req.params.id
        // console.log( `[GET] id=${cardId}` )
        const getResult = await orm.getCard( cardId )
        res.send( getResult[0] )
    })

    app.get('/api/cards/deck/:id', async (req, res)=>{
        const deckId = req.params.id
        console.log( `[GET] id=${deckId}` )
        const getResult = await orm.getCardsforDeck( deckId )
        res.send( getResult )
    })

    app.get('/api/cards/:search?', async function(req, res) {
        // const search = req.params.search ? { due: req.params.due } : ''
        // console.log( `[GET] getting list, search=${req.params.search}`)
        const list = await orm.getCard( req.params.search )

        res.send( list )
    })
    // addCard
    app.post('/api/cards', upload.single('imageFile'), async function(req, res) {
        let cardData = req.body
        console.log(cardData)
        // if they uploaded a file, let's add it to the thumbData
        let imageUrl = './assets/img/The Challengers.png'
        if( req.file ){
            imageUrl = await uploadResizer('../'+req.file.path, req.file.originalname, 512, 512);
            // imageUrl = `uploads/${req.file.filename}`
            console.log('image processed ', imageUrl, req.file)
        }

        console.log( '[POST] we received this data:', req.body.cardNameInput, req.body.cardNameDesc, imageUrl, null, req.body.attributes )

        let attributes = []
        let i = 0

        let validAttr = true
        while( validAttr ){
            let attrName = req.body[`attr${i}Input`]
            let attrVal = req.body[`val${i}Input`]
            if( attrName ){
                attributes.push({attr: attrName, val: attrVal})
            } else {
                validAttr = false
            }
            i++
        }

        console.log(`attributes: `, attributes)
        const saveResult = await orm.addCard( req.body.cardNameInput, req.body.cardDescInput, imageUrl, null, attributes )
        console.log( `... insertId: ${saveResult.insertId} ` )
        res.send( { status: true, insertId: saveResult.insertId, message: 'Card inserted successfully' } )
    })
    // deleteCard
    app.delete('/api/cards/:id', async function(req, res) {
        const cardId = req.params.id
        console.log( `[DELETE] id=${cardId}` )
        const deleteResult = await orm.deleteCard( cardId )
        console.log( '... ', deleteResult )
        res.send( { status: true, message: 'Card Deleted successfully' } )
    })

    //saveCard
    app.put('/api/cards', upload.single('imageFile'), async function(req, res) {
        let cardData = req.body
        console.log('PUT cardData: ', cardData)
        // if they uploaded a file, let's add it to the thumbData
        let imageUrl = './assets/img/The Challengers.png'
        if( req.file ){
            imageUrl = await uploadResizer('../'+req.file.path, req.file.originalname, 512, 512);
            // imageUrl = `uploads/${req.file.filename}`
            console.log('image processed ', imageUrl, req.file)
        }

        console.log( '[PUT] we received this data:', req.body.cardId, req.body.cardNameInput, req.body.cardNameDesc, imageUrl, null, req.body.attributes )

        let attributes = []
        let i = 0

        let validAttr = true
        while( validAttr ){
            let attrName = req.body[`attr${i}Input`]
            let attrVal = req.body[`val${i}Input`]
            if( attrName ){
                attributes.push({attr: attrName, val: attrVal})
            } else {
                validAttr = false
            }
            i++
        }


        console.log(`attributes: `, attributes)
        const saveResult = await orm.saveCard(req.body.cardId, req.body.cardNameInput, req.body.cardDescInput, imageUrl, null, attributes )
        console.log( `... insertId: ${saveResult.insertId} ` )
        res.send( { status: true, insertId: saveResult.insertId, message: 'Card inserted successfully' } )
    })
    /*
    // addCardAttributes
    app.post('/api/cards/attributes', async function(req, res) {
        console.log( '[PUT] we received this data:', req.body )
        if( !req.body.id ) {
            res.status(404).send( { message: 'Invalid id' } )
        }
        const saveResult = await orm.setCardAttributes( req.body.id, req.body.attributes )
        console.log( '... ', saveResult )
        res.send( { status: true, message: 'Card Updated successfully' } )
    })
    */

    // addDeck
    app.post('/api/decks', async function(req, res) {
        console.log( '[POST] we received this data:', req.body.name )
        const saveResult = await orm.addDeck( req.body.name )
        console.log( `... insertId: ${saveResult.insertId} ` )
        res.send( { status: true, insertId: saveResult.insertId, message: 'Deck inserted successfully' } )
    })

    // deleteDeck
    app.delete('/api/decks/:id', async function(req, res) {
        const deckId = req.params.id
        console.log( `[DELETE] id=${deckId}` )
        const deleteResult = await orm.deleteDeck( deckId )
        console.log( '... ', deleteResult )
        const updateResult = await orm.updateCardsDeck( deckId )
        console.log( '... ', updateResult )
        res.send( { status: true, message: 'Deck Deleted successfully' } )
    })

    // saveDeck
    app.put('/api/decks', async function(req, res) {
        console.log( '[PUT] we received this data:', req.body )
        if( !req.body.deckId ) {
            res.status(404).send( { message: 'Invalid id' } )
        }
        const saveResult = await orm.saveDeck( req.body.deckId, req.body.deckNameInput )
        console.log( '... ', saveResult )
        let postMsg = ''
        if (saveResult.affectedRows === 0){
            postMsg = "Deck doesn't exist"
            console.log('[PUT] saveDeck: ', postMsg)
            res.send( { status: false, message: postMsg } )
        } else {
            postMsg = 'Deck Updated successfully'
            console.log('[PUT] saveDeck: ', postMsg)
            res.send( { status: true, message: postMsg } )
        }

    })

    // get specific deck
    app.get('/api/decks/:id', async function(req, res) {
        console.log( `[GET] getting deck, id=${req.params.id}`)
        const list = await orm.getDeck( id=req.params.id )
        console.log('get deck list: ', list)
        res.send( list[0] )
    })
    // get ALL Decks
    app.get('/api/decks', async (req, res)=>{
        // console.log('[GET] getting all decks')
        let decks = await orm.getDeckswithImg()
        res.send( decks )
    })


    app.get( '/api/media', async function( req, res ){
        console.log( '[api/media] getting the list' )
        const mediaList = await orm.getMedia()
        res.send( { status: true, mediaList } )
    })

}

module.exports = router