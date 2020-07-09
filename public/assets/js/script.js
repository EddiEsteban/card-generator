
let attrEnum

function clearCardForm(){
    document.querySelector('#cardNameInput').setAttribute('value', '')
    document.querySelector('#cardDescInput').value = ''
    // document.querySelector('#cardImgInput').value = ''
    document.querySelector('#cardAttrInputList').innerHTML = ''

    document.querySelector('#cardNamePreview').innerHTML = ''
    document.querySelector('#cardDescPreview').innerHTML = ''
    // document.querySelector('#cardImgInput').innerHTML = ''
    document.querySelector('#cardAttrListPreview').innerHTML = ''
}

function fillCardForm(card){
    document.querySelector('#cardNameInput').setAttribute('value', card.name)
    document.querySelector('#cardDescInput').value = card.description
    // document.querySelector('#cardImgInput').value = card.img
    if (card.attributes){
        card.attributes.forEach((attrval)=>{
            console.log('fillCard attributes iter', attrval)
            addAttribute(attrval)
            attrEnum++
        })
    }
    previewMatch('cardNameInput')
    previewMatch('cardDescInput')
}

function previewMatch(id) {
    let previewId = id.slice(0,-5)+'Preview'
    let previewEl = document.querySelector(`#${previewId}`)
    let fieldEl = document.querySelector(`#${id}`)
    if (fieldEl.matches('input')){
        fieldEl.setAttribute('value', fieldEl.value)
    } else if (fieldEl.matches('textarea')){
        fieldEl.innerHTML = fieldEl.value
    }
    previewEl.innerHTML = fieldEl.value
}

function userInputGenerator(attrval={attr: '', val: ''}){
    console.log('inputGen', attrval)
    let attrHTML = `<label for='attr${attrEnum}Input'>Attribute name</label><input type='text' name='attr${attrEnum}Input' id='attr${attrEnum}Input' class='form-control' onInput='previewMatch(id)' value=${attrval.attr}>`
    let valHTML = `<label for='val${attrEnum}Input'>Value</label><textarea name='val${attrEnum}Input' id='val${attrEnum}Input' class='form-control' onInput='previewMatch(id)'>${attrval.val}</textarea>`
    return `<div class='form-row mb-2' id='attrval${attrEnum}'><div class='col-md-6 col-lg-4'>${attrHTML}</div><div class='col-md-6 col-md-8'>${valHTML}</div></div>`
}


function addAttribute(attrval={attr: '', val: ''}){
    let attrListEl = document.querySelector('#cardAttrInputList')
    let previewAttrEl = document.querySelector('#cardAttrListPreview')
    console.log({attrval, attrListEl, previewAttrEl})
    attrListEl.innerHTML += userInputGenerator(attrval)
    previewAttrEl.innerHTML += `<li class='list-group-item'><div class='row'><div class='col' id='attr${attrEnum}Preview'>${attrval.attr}</div><div class='col' id='val${attrEnum}Preview'>${attrval.val}</div></div></li>`
    attrEnum +=1
}

// api requests below

async function apiCall( url, method='get', data={} ){
    method = method.toLowerCase()
    let settings = { method }

    // for formData we must NOT set content-type, let system do it
    const isFormData = (typeof data)==='string'
    if( !isFormData ) {
        settings.headers = { 'Content-Type': 'application/json' }
    }

    // only attach the body for put/post
    if( method === 'post' || method === 'put' ) {
        if( isFormData ){
            //* gather form data (esp. if attached media)
            //! each entry to be attached must have a valid **name** attribute
            settings.body = new FormData( document.querySelector(`${data}`) )
        } else {
            settings.body = JSON.stringify( data )
        }
    }

    const result = await fetch( url,settings ).then( res=>res.json() )

    return result
}

function showCardForm(event){
    attrEnum = 0
    event.preventDefault()
    clearCardForm()
    let crudButton = document.querySelector('#crudButtons')
    if (event.target.id == 'createCardInit'){
        document.querySelector('#cardId').value = 'default'
        document.querySelector('#mediaForm').setAttribute('method', 'POST')
        crudButton.innerHTML = `<button type='submit' class='btn btn-primary' onClick='createCard(event)'>Create card</button>`
    } else if (event.target.classList.contains('editBtn')){
        document.querySelector('#mediaForm').setAttribute('method', 'PUT')
        let fieldIds = ['cardNameInput', 'cardDescInput']
        fieldIds.forEach((id)=>{
            previewMatch(id)
        })
        crudButton.innerHTML = `<button type='submit' class='btn btn-primary' onClick='editCard(event)'>Edit card</button>`
    }
    let cardFormEl = document.querySelector('#cardFormBlock')
    cardFormEl.classList.remove('d-none')
}

let cardThumbnail = (card)=>{
    return `<div class="card col-4 col-sm-3 col-md-2" data-card-id='${card.id}'>`+
        `<img src="${card.img}" class="card-img-top img-fluid" alt="...">`+
        `<div class="card-body">`+
        `<h6 class="card-title">${card.name}</h6>`+
        `<button class='btn btn-secondary editBtn' onClick='getCard(event)'>📝</button>`+
        `<button class='btn btn-danger delBtn' onClick='deleteCard(event)'>🗑</button>`+
        `</div></div>`
}

async function showAllCards(){
    let cards = await apiCall('/api/cards')
    let cardListEl = document.querySelector('#cardListBlock')
    cardListEl.innerHTML = ''
    cards.forEach(card=>{
        cardListEl.innerHTML = cardThumbnail(card) + cardListEl.innerHTML
    })
}

async function getCard(event){
    event.preventDefault()
    let cardEl = event.target.parentNode.parentNode
    let id = cardEl.dataset.cardId
    document.querySelector('#cardId').value = id
    let card = await apiCall(`/api/cards/${id}`)
    showCardForm(event)
    clearCardForm()
    fillCardForm(card)
    

}

async function editCard(event){
    event.preventDefault()
    let result = await apiCall('/api/cards', 'put', '#mediaForm')
    clearCardForm()
    showAllCards()
    return result
}

async function createCard(event){
    event.preventDefault()
    // let nameInputEl = document.querySelector('#cardNameInput')
    // let imgInputEl = document.querySelector('#cardImgInput')
    // let descInputEl = document.querySelector('#cardDescInput')
    // let attrInputListEl = document.querySelector('#cardAttrInputList').children
    // let attributes = []
    // console.log(attrInputListEl)
    // for (let i=0; i < attrInputListEl.length; i++){
    //     console.log(i)
    //     attributes.push(
    //         {
    //             attr: attrInputListEl[i].children[0].children[1].value,
    //             val: attrInputListEl[i].children[1].children[1].value
    //         }
    //     )
    // }
    // console.log(attrInputListEl[1].children[0].children[1].value)
    // console.log(attributes)
    // let data = {
    //     name: nameInputEl.value,
    //     img: imgInputEl.value,
    //     description: descInputEl.value,
    //     attributes
    // }

    let result = await apiCall('/api/cards', 'post', '#mediaForm')
    clearCardForm()
    showAllCards()
    return result
}

async function deleteCard(event){
    event.preventDefault()
    let cardEl = event.target.parentNode.parentNode
    let id = cardEl.dataset.cardId
    let result = await apiCall(`/api/cards/${id}`, 'delete')
    showAllCards()
    return result
}


let deckThumbnail = (deck)=>{
    return `<div class="card col-4 col-sm-3 col-md-2">`+
        `<img src="${deck.img}" class="card-img-top img-fluid" alt="...">`+
        `<div class="card-body">`+
        `<h5 class="card-title">${deck.name}</h5>`+
        `</div></div>`
}

async function showAllDecks(){
    let decks = await apiCall('/api/decks')
    let deckListEl = document.querySelector('#deckListBlock')
    decks.forEach(deck=>{
        deckListEl.innerHTML += deckThumbnail(deck)
    })
}

async function getDeck(){
    let id
    return await apiCall(`/decks/${id}`)
}

async function editDeck(){
    let deckEl = document.querySelector('#')
    let id = deckEl.dataset.id
    return await apiCall(`/api/decks/${id}`, 'put', data)
}

async function deleteDeck(){
    return await apiCall(`/api/decks/${id}`, 'delete')
}

function previewImg(event){
    let output = document.getElementById('cardImgPreview');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
    }
}

async function mediaList( id ){
    // const getRequest = await apiCall( '/api/media' )
    // console.log( '[mediaList] ', getRequest )

    if( getRequest.status ){
        const mediaListEl = document.querySelector( '#mediaList' )
        mediaListEl.innerHTML = ''

        getRequest.mediaList.forEach( function( mediaUrl ){
            mediaListEl.innerHTML += `
            <img src='${mediaUrl}' class='img-thumbnail' width=100>
            `
        })
    }

}

// save the new form
async function uploadMedia( event ){
    event.preventDefault()

    //* because we are using the built-in browser form-builder, we need valid
    //! **name** attributes - for ease we give same values as the id's
    const uploadResponse = await apiCall( '/api/media', 'post', '#mediaForm' )
    // console.log( '[uploadResponse] ', uploadResponse )

    if( uploadResponse.status ){
        // clear the data
        document.querySelector('#imageUrl').value = ''
        document.querySelector('#imageFile').value = ''

        // refresh the list
        mediaList()
    }
}

async function mainApp(){
    await showAllCards()

    await showAllDecks()
}