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
    });
}