/* obtener id */
const obtenerURL = new URLSearchParams(window.location.search)
const personajeID = obtenerURL.get('id')
////////////////////////////////////////////////////
const apikey = 'a2398fdfbd317316277fe42c389550e7' /* key publica */
const ts = '04/05/2024, 02:04:03' /* timestamp -> new Date().toLocaleString('en-GB', {timeZone:'UTC})*/
const hash = 'a5c11dd0c74a5615241c3ee4eeaef49f' /* union de ts | private | public */
const url = `https://gateway.marvel.com:443/v1/public/characters/${personajeID}?apikey=${apikey}&ts=${ts}&hash=${hash}`
///////////////////////////////////////////////////
fetch(url)
    .then(response => response.json())
    .then(response => datos(response.data.results))
    .catch(error => console.log("Se ha producido un error: ", error))
/////////////////////////////////////////////////
const datos = (personajes) => {
    personajes.forEach(characters => {
        const container__title = document.querySelector('.container__title')
        const title = document.createElement('h2')
        const title__name = document.createTextNode(characters.name)
        title.appendChild(title__name)
        container__title.appendChild(title)
        //////////////////////////////////////
        const img = document.createElement('img')
        img.src = characters.thumbnail.path + '.' + characters.thumbnail.extension
        const container__content = document.querySelector('.container__content')
        container__content.appendChild(img)
        ////////////////////////////////////
        /* validación */
        let descrip = characters.description
        if (!descrip) {
            descrip = "I'm sorry, but this heroe has not description"
        }
        /////////////////////////////////////
        /* uso de la validación para la descripcion */
        const description = document.createElement('p')
        const description__text = document.createTextNode(descrip)
        description.appendChild(description__text)
        container__content.appendChild(description)
        /////////////////////////////////////
        /* Generando el url para traer mas detalles de comics */
        const urlcomic = characters.comics.collectionURI + `?apikey=${apikey}` + `&ts=${ts}` + `&hash=${hash}`
        //////////////////////////////////////
        fetch(urlcomic)
            .then(response => response.json())
            .then(response => datocomic(response.data.results))
            .catch(error => console.log("Se ha producido un error: ", error))
        /* Accediendo a los comics */
        const datocomic = (datecomic) => {
            datecomic.forEach(datecomics => {
                /* CREAR TITULO COMIC */
                const content__comic = document.createElement('div')
                const title__comic = document.createElement('h3')
                const title__comic__text = document.createTextNode(datecomics.title)
                const container__comic = document.querySelector('.container__comic')
                title__comic.appendChild(title__comic__text)
                content__comic.appendChild(title__comic)
                container__comic.appendChild(content__comic)
                /* crear imagen comic */
                const comic__img = document.createElement('img')
                comic__img.src = datecomics.thumbnail.path + '.' + datecomics.thumbnail.extension
                content__comic.appendChild(comic__img)

            })
        }
        /* Generando el url para traer mas detalles de series */
        const urlseries = characters.series.collectionURI + `?apikey=${apikey}` + `&ts=${ts}` + `&hash=${hash}`
        ///////////////////////////////////////////////////////////
        fetch(urlseries)
            .then(response => response.json())
            .then(response => datoseries(response.data.results))
            .catch(error => console.log("Se ha producido un error: ", error))
        /* Accediendo a las series */
        const datoseries = (dateseries) => {
            dateseries.forEach(dateserie => {
                /* Crear titulo series */
                const content__series = document.createElement('div')
                const title__series = document.createElement('h3')
                const title__series__text = document.createTextNode(dateserie.title)
                const container__series = document.querySelector('.container__series')
                title__series.appendChild(title__series__text)
                content__series.appendChild(title__series)
                container__series.appendChild(content__series)
                /* Crear imagen series */
                const serie__img = document.createElement('img')
                serie__img.src = dateserie.thumbnail.path + '.' + dateserie.thumbnail.extension
                content__series.appendChild(serie__img)
            })
        }
    })
}