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
    let cardFormEl = document.querySelector('#cardForm')
    cardFormEl.style.display = 'inline'
}

async function mainApp(){

    async function editCard(){
        let cardEl = document.querySelector('#')
        let id = cardEl.dataset.id
        return await apiCall(`/card/${id}`, 'put', data)
    }

    async function createCard(){
        event.preventDefault()
        let nameInputEl = document.querySelector('#cardNameInput')
        let imgInputEl = document.querySelector('#cardImgInput')
        let descInputEl = document.querySelector('#cardDescInput')

        let data = {
            name: nameInputEl.value,
            img: imgInputEl.value,
            description: descInputEl.value
        }

        return await apiCall('/', 'post', data)
    }

    async function deleteCard(){
        return await apiCall(`/card/${id}`, 'delete')
    }

    async function showAllCards(){
        return await apiCall('/')
    }

}
mainApp()