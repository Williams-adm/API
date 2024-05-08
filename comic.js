/* obtener id */
const obtenerURL = new URLSearchParams(window.location.search)
const comicID = obtenerURL.get('id')
////////////////////////////////////////////////////
/* primera clave */
/* const apikey = 'a2398fdfbd317316277fe42c389550e7' */ /* key publica */
/* const ts = '04/05/2024, 02:04:03' */ /* timestamp -> new Date().toLocaleString('en-GB', {timeZone:'UTC})*/
/* const hash = 'a5c11dd0c74a5615241c3ee4eeaef49f' */ /* union de ts | private | public */

/* segunda clave public: 588d0a9beacf074ff511aac1c2f46fe4
segunda clave privada: a860c4f999c1df2bf63c0c7b028fb78363dda30a
*/
const apikey = '588d0a9beacf074ff511aac1c2f46fe4'
const ts = '07/05/2024, 02:04:03'
const hash = '5fa43858711de76566b62ff2dd4d1645'
const url = `https://gateway.marvel.com:443/v1/public/comics/${comicID}?apikey=${apikey}&ts=${ts}&hash=${hash}`
///////////////////////////////////////////////////
fetch(url)
    .then(response => response.json())
    .then(response => datos(response.data.results))
    .catch(error => console.log("Se ha producido un error: ", error))
/////////////////////////////////////////////////
const datos = (comics) => {
    comics.forEach(comic => {
        /* Crear el title del comic seleccionado */
        const container__title = document.querySelector('.container__title')
        const comic__title = document.createElement('h2')
        const comic__title__text = document.createTextNode(comic.title)
        comic__title.appendChild(comic__title__text)
        container__title.appendChild(comic__title)
        /* crear imagen comic */
        const container__content = document.querySelector('.container__content')
        const comic__img = document.createElement('img')
        const valide__img__comic = comic.thumbnail
        /* Validar imagen comic */
        if (valide__img__comic) {
            comic__img.src = comic.thumbnail.path + '.' + comic.thumbnail.extension
        }
        else {
            comic__img.src = "img/no comic.jpg"
        }
        container__content.appendChild(comic__img)
        /* Creando Descripción */
        let descrip = comic.description
        if (!descrip) {
            descrip = "I'm sorry, but this comic has not description"
        }
        const comic__description__content = document.createElement('div')
        const comic__title__description = document.createElement('h3')
        const comic__title__description__text = document.createTextNode('DESCRIPTION: ')
        const comic__description = document.createElement('p')
        const comic__description__text = document.createTextNode(descrip)
        comic__title__description.appendChild(comic__title__description__text)
        comic__description.appendChild(comic__description__text)
        comic__description__content.append(comic__title__description, comic__description)
        container__content.appendChild(comic__description__content)
        /* Creando el page count */
        if (comic.pageCount.length !== 0) {
            const comic__count__content = document.createElement('div')
            const comic__title__page = document.createElement('h3')
            const comic__title__page__text = document.createTextNode('PAGE COUNT: ')
            comic__title__page.appendChild(comic__title__page__text)
            const page__count = document.createElement('p')
            const page__count__text = document.createTextNode(comic.pageCount)
            page__count.appendChild(page__count__text)
            comic__count__content.append(comic__title__page, page__count)
            container__content.append(comic__count__content)
        }
        /* Creando el issue */
        if (comic.pageCount.length !== 0) {
            const comic__issue__content = document.createElement('div')
            const comic__title__issue = document.createElement('h3')
            const comic__title__issue__text = document.createTextNode('ISSUE NUMBER: ')
            comic__title__issue.appendChild(comic__title__issue__text)
            const issue = document.createElement('p')
            const issue__text = document.createTextNode(comic.issueNumber)
            issue.appendChild(issue__text)
            comic__issue__content.append(comic__title__issue, issue)
            container__content.append(comic__issue__content)
        }
        /* object */
        if (comic.textObjects.length !== 0) {
            comic.textObjects.forEach(object => {
                const comic__object__content = document.createElement('div')
                const object__type__title = document.createElement('h3')
                const object__type__title__text = document.createTextNode(object.type)
                object__type__title.appendChild(object__type__title__text)
                const object__language = document.createElement('h4')
                const object__language__text = document.createTextNode('LENGUAGE:')
                object__language.appendChild(object__language__text)
                const language = document.createElement('p')
                const language__text = document.createTextNode(object.language)
                language.appendChild(language__text)
                const object__synopsis = document.createElement('h4')
                const object__synopsis__text = document.createTextNode('SYNOPCIS:')
                object__synopsis.appendChild(object__synopsis__text)
                const synopsis = document.createElement('p')
                /* const synopsis__text = document.createTextNode(object.text) */
                synopsis.innerHTML = object.text
                /* synopsis.appendChild(synopsis__text) */
                comic__object__content.append(object__type__title, object__language, language, object__synopsis, synopsis)
                container__content.appendChild(comic__object__content)
            });
        }
        /* Precios */
        if (comic.prices.length !== 0) { 
            const prices__content = document.createElement('div')
            const prices__title = document.createElement('h3')
            const prices__title__text = document.createTextNode('PRICES:')
            prices__title.appendChild(prices__title__text)
            prices__content.appendChild(prices__title)
            comic.prices.forEach(precio => {
                const prices__type = document.createElement('h4')
                const prices__type__text = document.createTextNode(precio.type)
                prices__type.appendChild(prices__type__text)
                const prices = document.createElement('p')
                const number__prices = document.createTextNode('$.' + precio.price)
                prices.appendChild(number__prices)
                prices__content.append(prices__type, prices)
                container__content.append(prices__content)
            })
        }
        /* Creador */
        if (comic.creators.items.length !== 0) {
            ///////////////////////////////////////////////////
            /* Generando array para traer las imagenes y guradarlas */
            const creador__array = []
            const a__array = []
            /* Generando el url para traer mas detalles de creadores */
            const urlcreators = comic.creators.collectionURI + `?apikey=${apikey}` + `&ts=${ts}` + `&hash=${hash}`
            const fetchPromise = fetch(urlcreators)
            .then(response => response.json())
            .then(response => {
                creador(response.data.results, creador__array, a__array)
                })
            .catch(error => console.log("Se ha producido un error: ", error))
            const creador = (creators, creador__array, a__array) => {
                creators.forEach(creator => {
                    creator__valid__img = creator.thumbnail
                    /* Validar existencia de img */
                    let valor = 0
                    if (creator__valid__img) {
                        valor = creator.thumbnail.path + '.' + creator.thumbnail.extension
                    }
                    else {
                        valor = "img/no creator.png"
                    }
                    creador__array.push(valor)
                    console.log(creator.urls)
                    if (creators.urls) {
                        creators.urls.forEach(urls => {
                            const url__valid = urls.url
                            let valor__url = 0
                            if (url__valid) {
                                valor__url = urls.url
                            }
                            a__array.push(valor__url)
                        })
                    }
                })
            }
            
            ///////////////////////////////////////////////////////
            comic.creators.items.forEach((autor, index) => {
                const content__creator = document.createElement('div')
                const name__creator = document.createElement('h4')
                const name__creator__text = document.createTextNode(autor.name)
                name__creator.appendChild(name__creator__text)
                const rol__creator = document.createElement('h4')
                const rol__Creator__text = document.createTextNode('ROLE: ')
                rol__creator.appendChild(rol__Creator__text)
                const rol = document.createElement('p')
                const rol__text = document.createTextNode(autor.role)
                rol.appendChild(rol__text)
                const container__creators = document.querySelector('.container__creators')
                fetchPromise.then(() => {
                    /* Llmando el array creado de arriba */
                    const img__creator = document.createElement('img')
                    img__creator.src = creador__array[index]
                    content__creator.append(name__creator, rol__creator, rol, img__creator)
                    container__creators.append(content__creator)
                })
            })   
        }
    });
}