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

function clearCreationForms(){
    document.querySelector('#cardNameInput').value = ''
    document.querySelector('#cardDescInput').value = ''
    document.querySelector('#cardImgInput').value = ''
    document.querySelector('#cardAttrInputList').innerHTML = ''
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
    console.log(result)
    return result
}

function showCardForm(event){
    event.preventDefault()
    let cardFormEl = document.querySelector('#createCardBlock')
    cardFormEl.classList.remove('d-none')
}


async function showAllCards(){
    return await apiCall('/api/cards')
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

    clearCreationForms()

    return await apiCall('/api/cards', 'post', data)
}

async function deleteCard(){
    return await apiCall(`/api/cards/${id}`, 'delete')
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
}

mainApp()

