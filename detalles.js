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


        /* Accediendo a los comics */
        characters.comics.items.forEach(comic => {
            //////////////////////////////////////
            const container__title__comic = document.querySelector('.container__title__comic')
            const title__comic = document.createElement('h3')
            const title__text__comic = document.createTextNode(comic.name)
            title__comic.appendChild(title__text__comic)
            container__title__comic.appendChild(title__comic)
            ///////////////////////////////////////
            urlcomic = comic.resourceURI + `?apikey=${apikey}` + `&ts=${ts}` + `&hash=${hash}`
            fetch(urlcomic)
                .then(response => response.json())
                .then(response => datocomic(response.data.results))
                .catch(error => console.log("Se ha producido un error: ", error))
            
            const datocomic = (comic) => {
                comic.forEach(datecomic => {
                    const linkcomic = document.createElement('a')
                    linkcomic.href = "https://www.youtube.com/watch?v=iiMM1LkyXlo&list=RDtQ43q3RKlOE&index=3"
                    const imgcomic = document.createElement('img')
                    imgcomic.src = datecomic.thumbnail.path + '.' + datecomic.thumbnail.extension
                    linkcomic.appendChild(imgcomic)
                    const container__content__comic = document.createElement('div')
                    container__content__comic.appendChild(linkcomic)
                    const container__comic = document.querySelector('container__comic')
                    container__comic.appendChild(container__content__comic)
                })
            }
        })
        

    });
}