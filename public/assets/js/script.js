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

function previewMatch(id) {
    let previewId = id.slice(0,-5)+'Preview'
    console.log(previewId)
    let field = document.querySelector(`#${id}`).value;
    document.querySelector(`#${previewId}`).innerHTML = field
}

function userInputGenerator(){
    let attribute = `<label for='a'>Attribute name</label><input type='text' name='a' id='a' class='form-control' onInput='previewMatch(id)'>`
    let value = `<label for='b' >Value</label><input type='text' name='b' id='b' class='form-control' onInput='previewMatch(id)>'`
    return `<div class='form-row mb-2'><div class='col-md-3'>${attribute}</div><div class='col-md-9'>${value}</div></div>`
}

function addAttribute(){
    let attributesListEl = document.querySelector('#attributesInputList')
    attributesListEl.innerHTML += userInputGenerator()
}

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

    return result
}

function showCardForm(event){
    event.preventDefault()
    let cardFormEl = document.querySelector('#createCardBlock')
    cardFormEl.style.display = 'flex'
}

async function showAllCards(){
    return await apiCall('/cards')
}

async function getCard(){
    let id
    return await apiCall(`/cards/${id}`)
}

async function editCard(){
    let cardEl = document.querySelector('#')
    let id = cardEl.dataset.id
    return await apiCall(`/api/cards/${id}`, 'put', data)
}

async function createCard(event){
    event.preventDefault()
    let nameInputEl = document.querySelector('#cardNameInput')
    let imgInputEl = document.querySelector('#cardImgInput')
    let descInputEl = document.querySelector('#cardDescInput')

    let data = {
        name: nameInputEl.value,
        img: imgInputEl.value,
        description: descInputEl.value
    }

    return await apiCall('/api/cards', 'post', data)
}

async function deleteCard(){
    return await apiCall(`/api/cards/${id}`, 'delete')
}

async function mainApp(){
    return
}

mainApp()