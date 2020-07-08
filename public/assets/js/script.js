class Card {
    constructor(name, img, description, attributes){
        this.name = name,
        this.img = img,
        this.description = description,
        this.attributes = attributes
    }
    getName(){
        return this.name
    }
}

let attrEnum

function clearCardForm(){
    document.querySelector('#cardNameInput').value = ''
    document.querySelector('#cardDescInput').value = ''
    document.querySelector('#cardImgInput').value = ''
    document.querySelector('#cardAttrInputList').innerHTML = ''
}

function fillCardForm(card){
    document.querySelector('#cardNameInput').value = card.name
    document.querySelector('#cardDescInput').value = card.description
    // document.querySelector('#cardImgInput').value = card.img
    console.log(card)
    card.attributes.forEach(
        document.querySelector('#cardAttrInputList').innerHTML += userInputGenerator()
    )
    
}

function previewMatch(id) {
    let previewId = id.slice(0,-5)+'Preview'
    let field = document.querySelector(`#${id}`).value;
    document.querySelector(`#${previewId}`).innerHTML = field
}

function userInputGenerator(){
    let attr = `<label for='attr${attrEnum}Input'>Attribute name</label><input type='text' name='attr${attrEnum}Input' id='attr${attrEnum}Input' class='form-control' onInput='previewMatch(id)'>`
    let val = `<label for='val${attrEnum}Input'>Value</label><input type='text' name='val${attrEnum}Input' id='val${attrEnum}Input' class='form-control' onInput='previewMatch(id)'>`
    return `<div class='form-row mb-2'><div class='col-md-3'>${attr}</div><div class='col-md-9'>${val}</div></div>`
}


function addAttribute(){
    let attrListEl = document.querySelector('#cardAttrInputList')
    let previewAttrEl = document.querySelector('#cardAttrListPreview')
    attrListEl.innerHTML += userInputGenerator()
    console.log('attrListEl: ', attrListEl)
    previewAttrEl.innerHTML += `<li class='list-group-item'><div class='row'><div class='col' id='attr${attrEnum}Preview'></div><div class='col' id='val${attrEnum}Preview'></div></div></li>`
    attrEnum +=1
}

// api requests below

async function apiCall( url, method='get', data={} ){
    let settings = {
        method,
        headers: { 'Content-Type': 'application/json' }
    }
    // only attach the body for put/post
    if( method === 'post' || method === 'put' ) {
        settings.body = JSON.stringify( data )
    }

    const result = await fetch( url,settings ).then( res=>res.json() )
    console.log(result)
    return result
}

function showCardForm(event){
    attrEnum = 0
    event.preventDefault()
    let crudButton = document.querySelector('#crudButtons')
    console.log(event.target.id)
    if (event.target.id == 'createCardInit'){
        crudButton.innerHTML = `<button type='submit' class='btn btn-primary' onClick='createCard(event)'>Create card</button>`
    } else {
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
        `<button class='btn btn-secondary' onClick='getCard(event)'>Edit</button>`+
        `</div></div>`
}

async function showAllCards(){
    let cards = await apiCall('/api/cards')
    let cardListEl = document.querySelector('#cardListBlock')
    cards.forEach(card=>{
        cardListEl.innerHTML += cardThumbnail(card)
    })
}

async function getCard(event){
    event.preventDefault()
    console.log(event.target.parentNode.parentNode)
    let cardEl = event.target.parentNode.parentNode
    let id = cardEl.dataset.cardId
    let card = await apiCall(`/api/cards/${id}`)
    fillCardForm(card)
    showCardForm(event)
}

async function editCard(event){
    event.preventDefault()
    console.log(event.target.parentNode.parentNode)
    let cardEl = event.target.parentNode.parentNode
    let id = cardEl.dataset.cardId
    // return await apiCall(`/api/cards/${id}`, 'put', data)
}

async function createCard(event){
    event.preventDefault()
    let nameInputEl = document.querySelector('#cardNameInput')
    let imgInputEl = document.querySelector('#cardImgInput')
    let descInputEl = document.querySelector('#cardDescInput')
    let attrInputListEl = document.querySelector('#cardAttrInputList').children
    let attributes = []
    console.log(attrInputListEl)
    for (let i=0; i < attrInputListEl.length; i++){
        console.log(i)
        attributes.push(
            {
                attr: attrInputListEl[i].children[0].children[1].value,
                val: attrInputListEl[i].children[1].children[1].value
            }
        )
    }
    console.log(attrInputListEl[1].children[0].children[1].value)
    console.log(attributes)
    let data = {
        name: nameInputEl.value,
        img: imgInputEl.value,
        description: descInputEl.value,
        attributes
    }

    clearCardForm()

    return await apiCall('/api/cards', 'post', data)
}

async function deleteCard(){
    return await apiCall(`/api/cards/${id}`, 'delete')
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



function toggleMediaUpload( selectType='imageFile' ){
    console.log( '[toggleMediaUpload] this', selectType )

    if( selectType==='imageFile' ){
        document.querySelector('#imageUrl').classList.add('d-none');
        document.querySelector('#imageFile').classList.remove('d-none');
        document.querySelector('#imageSizeCol').classList.remove('d-none');
    } else {
        document.querySelector('#imageUrl').classList.remove('d-none');
        document.querySelector('#imageFile').classList.add('d-none');
        document.querySelector('#imageSizeCol').classList.add('d-none');
    }
}



function previewImg(event){
    let output = document.getElementById('cardImgPreview');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
    }
}


async function mainApp(){
    await showAllCards()
    toggleMediaUpload()
    await showAllDecks()
}

