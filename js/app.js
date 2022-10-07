function $(elem) {
    return document.querySelector(elem);
}

const $divCharacters = $('.characters')
const $firstPage = $('.firstPage')
const $previusPage = $('.previusPage')
const $nextPage = $('.nextPage')
const $lastPage = $('.lastPage')
const $filterAll = $('#filterAll')
const $filterMujeres = $('#filterMujeres')
const $filterHombres = $('#filterHombres')
const $filterGenderless = $('#filterGenderless')
const $filterUnknown = $('#filterUnknown')


let page = 1;
let totalCharacters; // cantidad de personajes de la api
let totalPages; 
let response ;
let infoAllCharacters; // información de los personajes


window.onload = async () => {
    load(page)
}

async function load (page) {

    if(page == 1 ) {
        $previusPage.classList.add('desactived')
        $firstPage.classList.add('desactived')
    } else {
        $previusPage.classList.remove('desactived')
        $firstPage.classList.remove('desactived')
    }

    if(page = 42) {
        $nextPage.classList.add('desactived')
        $lastPage.classList.add('desactived')
    } else {
        $nextPage.classList.remove('desactived')
        $lastPage.classList.remove('desactived')
    }

    try {
        let response = await fetch('https://rickandmortyapi.com/api/character')
        response = await response.json();
        totalCharacters = response.count;
        totalPages = 826 / 20
        infoAllCharacters = response.results; 
        paintCards(response.results)
    } catch (error) {
        console.log(error)
    }   
}


$firstPage.onclick = firstPage
$previusPage.onclick = previusPage
$lastPage.onclick = lastPage
$nextPage.onclick = nextPage
$filterAll.onclick = filterAll
$filterMujeres.onclick = filterMujeres
$filterHombres.onclick = filterHombres
$filterGenderless.onclick = filterGenderless
$filterUnknown.onclick = filterUnknown

function firstPage () {
    if(page !== 1) {
        page = 1; 
        load(page)
        }
}

function previusPage () {
    if(page < 1) {
        page -= 1; 
        load(page)
        }
}

function nextPage () {
    if(page < 42) {
        page += 1; 
        load(page)
        }
}

function lastPage () {
    page = 42
    load(page)
}


function filterAll () {
    let totalCharacters = []
    charactersFilters.push(totalCharacters)
    paintCards(charactersFilters)
}  

function filterMujeres () {
    let charactersFilters = []
    infoAllCharacters.forEach(character => {
    if(character.gender === 'Female') {
        charactersFilters.push(character)
        }
    })
    paintCards(charactersFilters)
}

function filterHombres () {
    let charactersFilters = []
    infoAllCharacters.forEach(character => {
    if(character.gender === 'Male') {
        charactersFilters.push(character)
        }
    })
    paintCards(charactersFilters)
}

function filterGenderless () {
    let charactersFilters = []
    infoAllCharacters.forEach(character => {
    if(character.gender === 'Genderless') {
        charactersFilters.push(character)
        }
    })
    paintCards(charactersFilters)
}

function filterUnknown () {
    let charactersFilters = []
    infoAllCharacters.forEach(character => {
    if(character.gender === 'Unknown') {
        charactersFilters.push(character)
        }
    })
    paintCards(charactersFilters)
}


function paintCards (characterToPaint) {
    $divCharacters.innerHTML = ""
    characterToPaint.forEach(character => {
        $divCharacters.innerHTML += `<div class='card'>
            <img src=${character.image} alt=${character.name} />
            <div class='character'>
                <h1 class="name">${character.name}</h1>
                <p class="specie">${'Especie: ' + character.species}</p>
                <p class="status">${'Estado: ' + character.status}</p>
                <p class="gender">${'Género: ' + character.gender}</p>
                <p class="origin">${'Origen: ' + character.origin.name}</p>
                <p class="location">${'Locación: ' + character.location.name}</p>
            </div>
        </div>`
    })
}
