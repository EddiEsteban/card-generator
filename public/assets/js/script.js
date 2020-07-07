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
    let field = document.querySelector(`#${id}`).value;
    document.querySelector(`#${previewId}`).innerHTML = field
}

let attrEnum = 0
function userInputGenerator(){
    let attr = `<label for='attr${attrEnum}Input'>Attribute name</label><input type='text' name='attr${attrEnum}Input' id='attr${attrEnum}Input' class='form-control' onInput='previewMatch(id)'>`
    let val = `<label for='val${attrEnum}Input'>Value</label><input type='text' name='val${attrEnum}Input' id='val${attrEnum}Input' class='form-control' onInput='previewMatch(id)'>`
    return `<div class='form-row mb-2'><div class='col-md-3'>${attr}</div><div class='col-md-9'>${val}</div></div>`
}


function addAttribute(){
    let attrListEl = document.querySelector('#cardAttrInputList')
    let previewAttrEl = document.querySelector('#cardAttrListPreview')
    attrListEl.innerHTML += userInputGenerator()
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

    return await apiCall('/api/cards', 'post', data)
}

async function deleteCard(){
    return await apiCall(`/api/cards/${id}`, 'delete')
}

async function mainApp(){
    return
}

mainApp()