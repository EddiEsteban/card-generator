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
    // document.querySelector('#cardImgInput').value = ''
    document.querySelector('#cardAttrInputList').innerHTML = ''
}

function fillCardForm(card){
    document.querySelector('#cardNameInput').value = card.name
    document.querySelector('#cardDescInput').value = card.description
    // document.querySelector('#cardImgInput').value = card.img
    console.log(card.attributes)
    card.attributes.forEach((attrval)=>{
        document.querySelector('#cardAttrInputList').innerHTML += userInputGenerator(attrval)
    })
}

function previewMatch(id) {
    let previewId = id.slice(0,-5)+'Preview'
    let field = document.querySelector(`#${id}`).value;
    document.querySelector(`#${previewId}`).innerHTML = field
}

function userInputGenerator(attrval={attr: '', val: ''}){
    let attrHTML = `<label for='attr${attrEnum}Input'>Attribute name</label><input type='text' name='attr${attrEnum}Input' id='attr${attrEnum}Input' class='form-control' onInput='previewMatch(id)' value=${attrval.attr}>`
    let valHTML = `<label for='val${attrEnum}Input'>Value</label><textarea name='val${attrEnum}Input' id='val${attrEnum}Input' class='form-control' onInput='previewMatch(id)'>${attrval.val}</textarea>`
    return `<div class='form-row mb-2' id='attrval${attrEnum}'><div class='col-md-6 col-lg-4'>${attrHTML}</div><div class='col-md-6 col-md-8'>${valHTML}</div></div>`
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
    console.log(event.target.id)
    if (event.target.id == 'createCardInit'){
        crudButton.innerHTML = `<button type='submit' class='btn btn-primary' onClick='createCard(event)'>Create card</button>`
    } else if (event.target.classList.contains('editBtn')){
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
        cardListEl.innerHTML += cardThumbnail(card)
    })
}

async function getCard(event){
    event.preventDefault()
    console.log(event.target.parentNode.parentNode)
    let cardEl = event.target.parentNode.parentNode
    let id = cardEl.dataset.cardId
    let card = await apiCall(`/api/cards/${id}`)
    showCardForm(event)
    fillCardForm(card)
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




function previewImg(event){
    let output = document.getElementById('cardImgPreview');
    output.src = URL.createObjectURL(event.target.files[0]);
    output.onload = function() {
        URL.revokeObjectURL(output.src) // free memory
    }
}


async function mainApp(){
    await showAllCards()

}

